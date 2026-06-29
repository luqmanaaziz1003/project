"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import {
  DashboardIcon,
  UserIcon,
  CalendarIcon,
  MoneyIcon,
  ListCheckIcon,
  StarIcon,
  SettingsIcon,
  LogoutIcon,
  MenuIcon,
  QrIcon,
  MedalIcon,
} from "@/components/icons"

type NavItem = {
  key: string
  label: string
  Icon: (props: { className?: string }) => React.ReactElement
}

const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Halaman Utama", Icon: DashboardIcon },
  { key: "pekerja", label: "Maklumat Pekerja", Icon: UserIcon },
  { key: "cuti", label: "Mohon Cuti", Icon: CalendarIcon },
  { key: "gaji", label: "Mohon Gaji Awal", Icon: MoneyIcon },
  { key: "semak", label: "Semak Permohonan", Icon: ListCheckIcon },
  { key: "nilai", label: "Nilai Rakan Sekerja", Icon: StarIcon },
  { key: "tetapan", label: "Tetapan", Icon: SettingsIcon },
]

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace("/")
  }
  // Visual-only active state; navigation is not wired up yet.
  const [active, setActive] = useState("home")

  const activeLabel =
    NAV_ITEMS.find((item) => item.key === active)?.label ?? "Halaman Utama"

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } shrink-0 overflow-hidden border-r border-zinc-200 bg-white transition-[width] duration-300`}
      >
        <div className="flex h-full w-64 flex-col">
          {/* Logo */}
          <div className="px-6 py-7">
            <span className="text-2xl font-semibold italic tracking-tight text-indigo-600">
              azuwa cafe
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3">
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ key, label, Icon }) => {
                const isActive = key === active
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setActive(key)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-zinc-100 px-3 py-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
            >
              <LogoutIcon className="h-5 w-5 shrink-0" />
              <span>Log Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label="Toggle menu"
              className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-zinc-800">{activeLabel}</h1>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Pencapaian"
              className="text-amber-400 transition-transform hover:scale-110"
            >
              <MedalIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Imbas QR"
              className="text-zinc-500 transition-colors hover:text-zinc-700"
            >
              <QrIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-zinc-700">luqman</span>
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 ring-2 ring-indigo-100">
                L
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
