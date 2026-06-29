"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, MapPin, CalendarDays, Camera, Pencil } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ROLE_LABELS: Record<string, string> = {
  pekerja: "Pekerja",
  pengurus: "Pengurus",
  admin: "Admin",
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [icNo, setIcNo] = useState("")
  const [phone, setPhone] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("Azuwa Cafe")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [role, setRole] = useState("")
  const [joined, setJoined] = useState("")

  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<
    { type: "success" | "error"; message: string } | null
  >(null)

  useEffect(() => {
    let active = true

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!active) return
      if (!user) {
        router.replace("/")
        return
      }

      setUserId(user.id)
      setEmail(user.email ?? "")
      if (user.created_at) {
        setJoined(
          new Date(user.created_at).toLocaleDateString("ms-MY", {
            month: "long",
            year: "numeric",
          })
        )
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role, ic_no, phone, job_title, company, bio, location")
        .eq("id", user.id)
        .maybeSingle()

      if (!active) return

      const fullName =
        profile?.full_name ??
        (typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : "")
      const [first, ...rest] = fullName.trim().split(/\s+/)
      setFirstName(first ?? "")
      setLastName(rest.join(" "))

      if (profile?.role) {
        setRole(profile.role)
      }
      setIcNo(profile?.ic_no ?? "")
      setPhone(profile?.phone ?? "")
      setJobTitle(
        profile?.job_title ??
          (profile?.role ? ROLE_LABELS[profile.role] ?? profile.role : "")
      )
      if (profile?.company) setCompany(profile.company)
      setBio(profile?.bio ?? "")
      setLocation(profile?.location ?? "")

      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [router])

  async function handleSave() {
    if (!userId) return

    setFeedback(null)
    setSaving(true)
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: `${firstName} ${lastName}`.trim(),
        ic_no: icNo.trim() || null,
        phone: phone.trim() || null,
        job_title: jobTitle.trim() || null,
        company: company.trim() || null,
        bio: bio.trim() || null,
        location: location.trim() || null,
      })
      .eq("id", userId)

    setSaving(false)
    setFeedback(
      error
        ? { type: "error", message: error.message }
        : { type: "success", message: "Profil berjaya dikemas kini." }
    )
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Memuatkan…</p>
      </div>
    )
  }

  const fullName = `${firstName} ${lastName}`.trim() || "Pengguna"
  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?"

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Profile header */}
      <Card className="p-0">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarFallback className="bg-muted text-lg font-medium text-muted-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                aria-label="Tukar gambar"
                className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
              >
                <Camera className="size-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold">{fullName}</h2>
                {role && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {ROLE_LABELS[role] ?? role}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                {jobTitle || "Pekerja Azuwa Cafe"}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm text-muted-foreground">
                {email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-4" />
                    {email}
                  </span>
                )}
                {location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {location}
                  </span>
                )}
                {joined && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4" />
                    Menyertai {joined}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button className="gap-2">
            <Pencil className="size-4" />
            Sunting Profil
          </Button>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="gap-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="personal">Peribadi</TabsTrigger>
          <TabsTrigger value="account">Akaun</TabsTrigger>
          <TabsTrigger value="security">Keselamatan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
        </TabsList>

        {/* Personal */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maklumat Peribadi</CardTitle>
              <CardDescription>
                Kemas kini butiran peribadi dan maklumat profil anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">Nama Pertama</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Nama Akhir</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Emel</Label>
                  <Input id="email" type="email" value={email} readOnly />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+60 12-345 6789"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="jobTitle">Jawatan</Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Syarikat</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="icNo">No. Kad Pengenalan (IC)</Label>
                <Input
                  id="icNo"
                  value={icNo}
                  onChange={(e) => setIcNo(e.target.value)}
                  placeholder="Cth: 010203-04-0506"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ceritakan sedikit tentang diri anda…"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Cth: Kuala Lumpur"
                />
              </div>

              {feedback && (
                <p
                  className={
                    feedback.type === "success"
                      ? "rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
                      : "rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  }
                >
                  {feedback.message}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  disabled={saving}
                >
                  Batal
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Menyimpan…" : "Simpan Perubahan"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder tabs */}
        {[
          { value: "account", title: "Akaun" },
          { value: "security", title: "Keselamatan" },
          { value: "notifications", title: "Notifikasi" },
        ].map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{tab.title}</CardTitle>
                <CardDescription>Akan datang.</CardDescription>
              </CardHeader>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Bahagian ini belum tersedia.
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
