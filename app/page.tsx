"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { GoogleIcon, StarIcon } from "@/components/icons"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Runs when a session exists — either it already did, or we just returned
  // from the Google redirect. The gmail/account is recorded in users on every
  // login; whether they still need to register is decided by their profile.
  useEffect(() => {
    let handled = false

    async function routeAfterAuth(user: User) {
      if (handled) return
      handled = true

      // Record the gmail + refresh last_login on every login.
      await supabase.from("users").upsert(
        {
          id: user.id,
          email: user.email,
          last_login: new Date().toISOString(),
        },
        { onConflict: "id" }
      )

      // A profile row means they've completed registration.
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle()

      if (error) {
        console.error("Failed to look up profile:", error.message)
        handled = false
        return
      }

      // Returning user → dashboard; new gmail → collect their details first.
      router.replace(data ? "/dashboard" : "/register")
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) routeAfterAuth(session.user)
    })

    return () => subscription.unsubscribe()
  }, [router])

  async function handleGoogleSignIn() {
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
    // On success the browser is redirected to Google, so no further work here.
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Top accent bar */}
        <div className="h-2 bg-indigo-600" />

        <div className="px-8 py-10">
          {/* Branding */}
          <h1 className="text-center text-4xl font-bold italic tracking-tight text-indigo-600">
            azuwa cafe
          </h1>
          <p className="mt-3 text-center text-sm text-zinc-400">
            Log masuk dengan akaun Google anda untuk meneruskan.
          </p>

          {error && (
            <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-300 bg-white px-4 py-3.5 font-semibold text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleIcon className="h-5 w-5" />
            {loading ? "Menyambung…" : "Log Masuk dengan Google"}
          </button>

          <hr className="my-6 border-zinc-100" />

          {/* Customer rating */}
          <p className="text-center text-sm text-zinc-500">Anda pelanggan kami?</p>
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-500 px-4 py-3 font-bold text-green-600 transition-colors hover:bg-green-50"
          >
            <StarIcon className="h-5 w-5" />
            Penilaian Pekerja
          </button>
        </div>
      </div>
    </main>
  )
}
