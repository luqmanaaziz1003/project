"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import {
  IdCardIcon,
  UserIcon,
  CakeIcon,
  UsersGearIcon,
  ChevronDownIcon,
  UserPlusIcon,
} from "@/components/icons"

export default function RegisterPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [age, setAge] = useState("")
  const [role, setRole] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Registration requires a Google session. Bounce to login if there's none,
  // and skip the form entirely if this account is already registered.
  useEffect(() => {
    let active = true

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!active) return
      if (!session) {
        router.replace("/")
        return
      }

      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", session.user.id)
        .maybeSingle()

      if (!active) return
      if (existing) {
        router.replace("/dashboard")
        return
      }

      setUser(session.user)
      // Prefill the name from the Google profile when available.
      const googleName = session.user.user_metadata?.full_name
      if (typeof googleName === "string") setFullName(googleName)
    }

    init()
    return () => {
      active = false
    }
  }, [router])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!user) return

    setError(null)
    setSaving(true)
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: fullName.trim(),
      username: username.trim(),
      age: age ? Number(age) : null,
      role,
    })

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.replace("/dashboard")
  }

  // Avoid flashing the form before the session check resolves.
  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-zinc-100 p-4">
        <p className="text-sm text-zinc-400">Memuatkan…</p>
      </main>
    )
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Top accent bar */}
        <div className="h-2 bg-indigo-600" />

        <div className="px-8 py-10">
          {/* Heading */}
          <h1 className="text-center text-3xl font-bold text-indigo-600">
            Daftar Akaun
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Selamat Datang pekerja baru Azuwa Cafe.
          </p>

          {/* Google account this profile is tied to */}
          <p className="mt-6 rounded-lg bg-zinc-50 px-4 py-2.5 text-center text-sm text-zinc-500">
            Akaun Google:{" "}
            <span className="font-semibold text-zinc-700">{user.email}</span>
          </p>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Nama Penuh */}
            <label className="flex items-center gap-3 rounded-xl border border-zinc-300 px-4 py-3.5 focus-within:ring-2 focus-within:ring-indigo-400">
              <IdCardIcon className="h-5 w-5 shrink-0 text-indigo-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama Penuh"
                className="w-full bg-transparent text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
              />
            </label>

            {/* Nama Pengguna */}
            <label className="flex items-center gap-3 rounded-xl border border-zinc-300 px-4 py-3.5 focus-within:ring-2 focus-within:ring-indigo-400">
              <UserIcon className="h-5 w-5 shrink-0 text-indigo-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nama Pengguna"
                className="w-full bg-transparent text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
              />
            </label>

            {/* Umur */}
            <label className="flex items-center gap-3 rounded-xl border border-zinc-300 px-4 py-3.5 focus-within:ring-2 focus-within:ring-indigo-400">
              <CakeIcon className="h-5 w-5 shrink-0 text-indigo-500" />
              <input
                type="number"
                required
                min={1}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Umur"
                className="w-full bg-transparent text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
              />
            </label>

            {/* Peranan */}
            <div className="relative flex items-center rounded-xl ring-1 ring-indigo-400">
              <UsersGearIcon className="pointer-events-none absolute left-4 h-5 w-5 text-indigo-500" />
              <select
                required
                aria-label="Peranan"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none rounded-xl bg-white py-3.5 pl-12 pr-10 text-zinc-700 focus:outline-none"
              >
                <option value="">-- Pilih Peranan --</option>
                <option value="pekerja">Pekerja</option>
                <option value="pengurus">Pengurus</option>
                <option value="admin">Admin</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-4 h-5 w-5 text-indigo-500" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlusIcon className="h-5 w-5" />
              {saving ? "Menyimpan…" : "Daftar Akaun"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
