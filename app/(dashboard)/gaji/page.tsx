"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HandCoins, Info, Send, ArrowLeft, CheckCircle2 } from "lucide-react"
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

export default function MohonGajiAwalPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")

  const [amount, setAmount] = useState("")
  const [deductionMonth, setDeductionMonth] = useState("")
  const [reason, setReason] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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
    }
    init()
    return () => {
      active = false
    }
  }, [router])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    const value = Number(amount)
    if (!amount || Number.isNaN(value) || value <= 0) {
      setError("Sila masukkan jumlah pendahuluan yang sah.")
      return
    }
    if (!reason.trim()) {
      setError("Sila nyatakan sebab / tujuan permohonan.")
      return
    }

    setSubmitting(true)
    const { error } = await supabase
      .from("salary_advance_applications")
      .insert({
        user_id: userId,
        amount: value,
        reason: reason.trim(),
        deduction_month: deductionMonth ? `${deductionMonth}-01` : null,
        status: "pending",
      })
    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
    setAmount("")
    setDeductionMonth("")
    setReason("")
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="p-0">
        <CardHeader className="border-b px-6 py-5">
          <CardTitle className="flex items-center gap-2 text-xl text-primary">
            <HandCoins className="size-6" />
            Borang Mohon Gaji Awal
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 px-6 py-6">
          {/* Note */}
          <div className="flex items-start gap-2 rounded-lg border-l-4 border-primary bg-primary/5 px-4 py-3 text-sm text-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>
              <span className="font-semibold">Nota:</span> Pendahuluan gaji akan
              ditolak daripada gaji pada bulan potongan yang dipilih.
            </p>
          </div>

          {/* Success state */}
          {success && (
            <div className="flex items-center gap-2 rounded-lg border-l-4 border-green-500 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <CheckCircle2 className="size-4 shrink-0" />
              Permohonan anda telah dihantar dan menunggu kelulusan.
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
              <Label htmlFor="amount">Jumlah Dipohon</Label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  RM
                </span>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  inputMode="decimal"
                  required
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setSuccess(false)
                  }}
                  placeholder="0.00"
                  className="h-11 pl-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="deductionMonth">Bulan Potongan</Label>
              <Input
                id="deductionMonth"
                type="month"
                value={deductionMonth}
                onChange={(e) => {
                  setDeductionMonth(e.target.value)
                  setSuccess(false)
                }}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Bulan gaji yang akan ditolak untuk pendahuluan ini.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reason">Sebab / Tujuan Permohonan</Label>
              <Textarea
                id="reason"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nyatakan tujuan permohonan gaji awal anda…"
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
