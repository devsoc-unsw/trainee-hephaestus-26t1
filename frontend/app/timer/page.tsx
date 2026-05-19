"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { useState, useEffect } from "react";

export default function Page() {
  // 0. AUTH STATE
  const { session } = useAuth();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  // If user is logged in, redirect to dashboard page
  if (session !== null) {
    redirect("/dashboard");
  }

  // 1. TIMER + BUTTON STATE
  const [initialTime, setInitialTime] = useState<number>(25 * 60);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);

  // 2. TIMER CLOCK LOGIC
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // a. If timer is active but has reached 0, turn off
    if (isActive && timeLeft === 0) {
      const timeoutId = setTimeout(() => {
        setIsActive(false);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    // b. If timer is active and time remains, countdown the time
    else if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    // c. Cleanup function
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // 3. HELPERS: Onclicks for Start/Pause and Reset Buttons + Time formatter
  const toggleTimer = (): void => setIsActive(!isActive);
  const resetTimer = (): void => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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

          {/* Timer UI */}
          <div className="text-7xl font-light tracking-tight tabular-nums">
            {formatTime(timeLeft)}
          </div>

          {/* Action Buttons - Start/Pause & Reset */}
          <div className="mt-4 flex gap-4">
            <Button size="lg" className="w-32 text-lg" onClick={toggleTimer}>
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button size="lg" variant="secondary" onClick={resetTimer}>
              Reset
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
