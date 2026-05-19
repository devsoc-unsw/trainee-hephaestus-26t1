"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Page() {
  const { session } = useAuth();
  const params = useSearchParams();

  const callbackUrl = params.get("callbackUrl") ?? "/";

  // If user is logged in, redirect to dashboard page
  if (session !== null) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] font-sans text-zinc-100">
      {/* 1. NAV BAR */}
      <header className="flex items-center justify-between border-b border-white/10 bg-black/10 px-6 py-2 backdrop-blur-md">
        {/* a. [UPDATE LINK LOCATION] Left: Back Arrow */}
        <div className="flex w-full items-start justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* b. [UPDATE LINK LOCATION] Right - Action Buttons */}
        <div className="flex gap-3">
          <Button variant="secondary" asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      {/* 2. MAIN */}
      <main className="flex-1 px-6">
        {/* a. Top: Hero Section */}
        <section className="flex flex-col items-center justify-center gap-6 px-4 pt-32 pb-24 text-center">
          {/* Header Text */}
          <h1 className="text-4xl tracking-tight sm:text-6xl">Focus Timer.</h1>

          {/* Visual Timer */}
          <div>TIMER TIMER</div>

          {/* Action Buttons - Start/Pause & Reset */}
          <div className="flex gap-4">
            <Button>Start</Button>
            <Button variant="secondary">Reset</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
