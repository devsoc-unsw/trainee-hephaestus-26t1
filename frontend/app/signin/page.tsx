"use client";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/forms/SignInForm";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { redirect, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { session } = useAuth();
  const params = useSearchParams();

  // Get callback URL, or use default /
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";

  // If user is logged in, redirect to dashboard
  if (session !== null) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] p-6 md:p-10">
      <div className="absolute top-10 left-8 flex w-full items-start justify-start text-zinc-400">
        <Link href="/" className="flex gap-2">
          <ArrowLeft></ArrowLeft>Back
        </Link>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="/"
          className="flex items-center gap-2 self-center font-medium text-white"
        >
          Termful
        </a>
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
