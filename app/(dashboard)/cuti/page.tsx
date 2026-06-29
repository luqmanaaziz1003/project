"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Info, Send, ArrowLeft, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const MONTHLY_LEAVE = 4

// Parse a yyyy-mm-dd string as a local date (avoids timezone shifting).
function parseDate(value: string): Date | null {
  if (!value) return null
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

// Count days in the range, excluding Fridays (not deducted from monthly leave).
function countDeductibleDays(startStr: string, endStr: string): number {
  const start = parseDate(startStr)
  const end = parseDate(endStr)
  if (!start || !end || end < start) return 0

  let count = 0
  const cursor = new Date(start)
  while (cursor <= end) {
    if (cursor.getDay() !== 5) count++ // 5 = Friday
    cursor.setDate(cursor.getDate() + 1)
  }
  return count
}

export default function MohonCutiPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [usedThisMonth, setUsedThisMonth] = useState(0)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function loadBalance(uid: string) {
    const now = new Date()
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    const toISO = (d: Date) => d.toISOString().slice(0, 10)

    const { data } = await supabase
      .from("leave_applications")
      .select("days, status")
      .eq("user_id", uid)
      .gte("start_date", toISO(firstOfMonth))
      .lte("start_date", toISO(lastOfMonth))
      .neq("status", "rejected")

    const used = (data ?? []).reduce((sum, row) => sum + (row.days ?? 0), 0)
    setUsedThisMonth(used)
  }

  useEffect(() => {
    let active = true
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!active) return
      if (!user) {
        router.replace("/")
        return
      }
      setUserId(user.id)
      await loadBalance(user.id)
    }
    init()
    return () => {
      active = false
    }
  }, [router])

  const requestedDays = useMemo(
    () => countDeductibleDays(startDate, endDate),
    [startDate, endDate]
  )
  const baki = Math.max(0, MONTHLY_LEAVE - usedThisMonth)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    const start = parseDate(startDate)
    const end = parseDate(endDate)
    if (!start || !end) {
      setError("Sila pilih tarikh mula dan tarikh akhir cuti.")
      return
    }
    if (end < start) {
      setError("Tarikh akhir mestilah selepas atau sama dengan tarikh mula.")
      return
    }
    if (requestedDays > baki) {
      setError(
        `Permohonan ${requestedDays} hari melebihi baki cuti anda (${baki} hari).`
      )
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from("leave_applications").insert({
      user_id: userId,
      start_date: startDate,
      end_date: endDate,
      reason: reason.trim() || null,
      days: requestedDays,
      status: "pending",
    })
    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
    setStartDate("")
    setEndDate("")
    setReason("")
    loadBalance(userId)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="p-0">
        <CardHeader className="border-b px-6 py-5">
          <CardTitle className="flex items-center gap-2 text-xl text-primary">
            <CalendarDays className="size-6" />
            Borang Mohon Cuti
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 px-6 py-6">
          {/* Leave balance */}
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700">
            Baki Cuti Bulan Ini: {baki} / {MONTHLY_LEAVE} Hari
          </div>

          {/* Note */}
          <div className="flex items-start gap-2 rounded-lg border-l-4 border-primary bg-primary/5 px-4 py-3 text-sm text-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>
              <span className="font-semibold">Nota:</span> Cuti pada hari Jumaat
              tidak ditolak daripada cuti bulanan.
            </p>
          </div>

          {/* Success state */}
          {success && (
            <div className="flex items-center gap-2 rounded-lg border-l-4 border-green-500 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <CheckCircle2 className="size-4 shrink-0" />
              Permohonan cuti anda telah dihantar dan menunggu kelulusan.
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="startDate">Tarikh Mula Cuti</Label>
              <Input
                id="startDate"
                type="date"
                required
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value)
                  setSuccess(false)
                }}
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="endDate">Tarikh Akhir Cuti</Label>
              <Input
                id="endDate"
                type="date"
                required
                min={startDate || undefined}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value)
                  setSuccess(false)
                }}
                className="h-11"
              />
            </div>

            {requestedDays > 0 && (
              <p className="text-sm text-muted-foreground">
                Jumlah hari dipohon (tidak termasuk Jumaat):{" "}
                <span className="font-semibold text-foreground">
                  {requestedDays} hari
                </span>
              </p>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="reason">Sebab / Alasan Cuti</Label>
              <Textarea
                id="reason"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nyatakan sebab permohonan cuti anda…"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="h-12 w-full gap-2 text-base font-semibold"
            >
              <Send className="size-5" />
              {submitting ? "Menghantar…" : "Hantar Permohonan"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="gap-2 text-muted-foreground"
            >
              <ArrowLeft className="size-4" />
              Kembali
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
