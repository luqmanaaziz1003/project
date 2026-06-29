import {
  Megaphone,
  Calendar,
  QrCode,
  CalendarPlus,
  HandCoins,
  IdCard,
  ClipboardCheck,
  Users,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type QuickAction = {
  key: string
  label: string
  Icon: React.ComponentType<{ className?: string }>
}

const QUICK_ACTIONS: QuickAction[] = [
  { key: "qr", label: "Imbas QR Kehadiran", Icon: QrCode },
  { key: "cuti", label: "Mohon Cuti", Icon: CalendarPlus },
  { key: "gaji", label: "Mohon Gaji Awal", Icon: HandCoins },
  { key: "maklumat", label: "Maklumat Saya", Icon: IdCard },
  { key: "status", label: "Status Permohonan", Icon: ClipboardCheck },
  { key: "nilai", label: "Nilai Rakan Sekerja", Icon: Users },
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
          className="pointer-events-none absolute top-1/2 -right-2 hidden size-40 -translate-y-1/2 text-white/10 sm:block"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 8h12v5a6 6 0 0 1-12 0V8Zm12 1h2.5a2.5 2.5 0 0 1 0 5H16V9ZM4 20h12v1.5H4V20Z" />
        </svg>
      </section>

      {/* Latest announcement */}
      <Card className="border-l-4 border-l-orange-400 p-0">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
            <Megaphone className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-wide text-orange-500 uppercase">
              Makluman Terkini
            </p>
            <h3 className="mt-1 text-lg font-bold">eso</h3>
            <p className="mt-1 text-sm text-muted-foreground">eso</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                14/01/2026
              </span>
              <Button variant="link" className="h-auto p-0 text-primary">
                Baca Penuh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {QUICK_ACTIONS.map(({ key, label, Icon }) => (
          <button key={key} type="button" className="text-left outline-none">
            <Card className="items-center justify-center p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Icon className="size-9 text-primary" />
              <span className="text-sm font-semibold">{label}</span>
            </Card>
          </button>
        ))}
      </section>
    </div>
  )
}
