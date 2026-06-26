import {
  MegaphoneIcon,
  CalendarIcon,
  QrIcon,
  CalendarPlusIcon,
  HandCoinIcon,
  UserTieIcon,
  ClipboardCheckIcon,
  UsersIcon,
} from "@/components/icons"

type QuickAction = {
  key: string
  label: string
  Icon: (props: { className?: string }) => React.ReactElement
}

const QUICK_ACTIONS: QuickAction[] = [
  { key: "qr", label: "Imbas QR Kehadiran", Icon: QrIcon },
  { key: "cuti", label: "Mohon Cuti", Icon: CalendarPlusIcon },
  { key: "gaji", label: "Mohon Gaji Awal", Icon: HandCoinIcon },
  { key: "maklumat", label: "Maklumat Saya", Icon: UserTieIcon },
  { key: "status", label: "Status Permohonan", Icon: ClipboardCheckIcon },
  { key: "nilai", label: "Nilai Rakan Sekerja", Icon: UsersIcon },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-10 text-white shadow-sm">
        <h2 className="text-3xl font-bold">Selamat Datang, luqman!</h2>
        <p className="mt-2 max-w-md text-indigo-100">
          Bagaimana hari anda hari ini? Semoga baik-baik saja.
        </p>
        {/* Decorative coffee cup */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-1/2 hidden h-40 w-40 -translate-y-1/2 text-white/10 sm:block"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 8h12v5a6 6 0 0 1-12 0V8Zm12 1h2.5a2.5 2.5 0 0 1 0 5H16V9ZM4 20h12v1.5H4V20Z" />
        </svg>
      </section>

      {/* Latest announcement */}
      <section className="overflow-hidden rounded-xl border-l-4 border-orange-400 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
            <MegaphoneIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-500">
              Makluman Terkini
            </p>
            <h3 className="mt-1 text-lg font-bold text-zinc-800">eso</h3>
            <p className="mt-1 text-sm text-zinc-500">eso</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                <CalendarIcon className="h-4 w-4" />
                14/01/2026
              </span>
              <button
                type="button"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Baca Penuh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {QUICK_ACTIONS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <Icon className="h-9 w-9 text-indigo-600" />
            <span className="text-sm font-semibold text-zinc-700">{label}</span>
          </button>
        ))}
      </section>
    </div>
  )
}
