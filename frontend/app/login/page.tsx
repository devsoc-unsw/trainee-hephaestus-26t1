import { ArrowLeft } from "lucide-react"
import { LoginForm } from "@/components/ui/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)]">
      <div className="w-full flex items-start justify-start text-zinc-400">
        <Link href='/' className="flex gap-2">
          <ArrowLeft></ArrowLeft>Back
        </Link>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium text-white">
          Termful
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
