// Lightweight inline SVG icons (no external dependency).
// All use `currentColor` so they inherit text color, and accept className.

type IconProps = {
  className?: string
}

const base = (className?: string) => ({
  className,
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
})

export function DashboardIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 12 8.5 8.5" />
      <path d="M12 12h9" />
    </svg>
  )
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  )
}

export function CalendarPlusIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4M12 13v4M10 15h4" />
    </svg>
  )
}

export function MoneyIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M3 18c2.5-1 4.5-1 6 0s3.5 1 6 0 4.5-1 6 0" />
      <circle cx="12" cy="9" r="3" />
      <path d="M12 6V5M12 13v-1" />
    </svg>
  )
}

export function ListCheckIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M11 6h9M11 12h9M11 18h9" />
      <path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />
    </svg>
  )
}

export function ClipboardCheckIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9V4Z" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  )
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
    </svg>
  )
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17 14a6 6 0 0 1 4 6" />
    </svg>
  )
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 2.9-1.2V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 17 4.7l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  )
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  )
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

export function QrIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M21 14v.01M14 21h.01M21 17v4M17 21h1" />
    </svg>
  )
}

export function MedalIcon({ className }: IconProps) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 2h2.5l1.5 6L13.5 8 15 2h2L14.8 9.2A6 6 0 1 1 9.2 9.2L8 2Zm4 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    </svg>
  )
}

export function MegaphoneIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M15 8a4 4 0 0 1 0 8M14 5l5-2v18l-5-2" />
    </svg>
  )
}

export function HandCoinIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="15" cy="7" r="3.5" />
      <path d="M3 14c1.5-1 3-1 4.5 0l3 .5a2 2 0 0 1 0 4l-4 .5" />
      <path d="M3 13v8M11 18l6-1.5a2 2 0 0 1 2.5 1.3c.2.7-.2 1.5-.9 1.8L12 22l-5-1" />
    </svg>
  )
}

export function UserTieIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M9 11l3 3 3-3" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  )
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export function LoginIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5M15 12H3" />
    </svg>
  )
}

export function UsersGearIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="8" cy="8" r="3.2" />
      <path d="M2 20a6 6 0 0 1 11 0" />
      <circle cx="18" cy="16" r="2.2" />
      <path d="M18 12.8v1M18 18.2v1M21 16h-1M16 16h-1M20.1 13.9l-.7.7M16.6 17.4l-.7.7M20.1 18.1l-.7-.7M16.6 14.6l-.7-.7" />
    </svg>
  )
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IdCardIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16a3 3 0 0 1 6 0M15 10h3M15 13h3" />
    </svg>
  )
}

export function CakeIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" />
      <path d="M4 16c1.5 0 1.5 1.2 3 1.2S8.5 16 10 16s1.5 1.2 3 1.2S15.5 16 17 16s1.5 1.2 3 1.2" />
      <path d="M12 8V5M12 5c0-.8-1-1.2-1-2 .5.3 1.5.3 2 0 0 .8-1 1.2-1 2Z" />
    </svg>
  )
}

export function UserPlusIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 21a6 6 0 0 1 12 0" />
      <path d="M18 8v6M21 11h-6" />
    </svg>
  )
}

// Official multi-color Google "G" mark (fixed fills, ignores currentColor).
export function GoogleIcon({ className }: IconProps) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}
