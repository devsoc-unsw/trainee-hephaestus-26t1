"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Timer, BarChart3, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] font-sans text-zinc-100">
      {/* 1. NAV BAR */}
      <header className="flex items-center justify-between border-b border-white/10 bg-black/10 px-6 py-2 backdrop-blur-md">
        {/* a. Left: Logo */}
        <div className="text-xl font-extrabold tracking-tight">termful.</div>

        {/* b. Right - Action Buttons */}
        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </header>

      {/* 2. MAIN */}
      <main className="flex-1 px-6">
        {/* a. Top: Hero Section */}
        <section className="flex flex-col items-center justify-center gap-6 px-4 pt-32 pb-24 text-center">
          <h1 className="text-4xl tracking-tight sm:text-6xl">
            focus deeply. log effortlessly.
          </h1>
          <p className="text-md mb-4 max-w-xl leading-relaxed sm:text-lg">
            A sleek and lightweight study tracker that pairs deep focus timers
            with automated study logging to visualise your hours. Designed to
            help you build better habits and conquer the term, one session at a
            time.
          </p>
          <Button size="lg" className="text-md h-12 px-8" asChild>
            <Link href={"/signup"}>Create an account</Link>
          </Button>
        </section>

        {/* b. Bottom: Feature Cards Section */}
        <section className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1: Timer*/}
            <Card className="border-white/10 bg-black/20 shadow-2xl shadow-purple-950/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-black/30">
              <CardHeader>
                {/* Icon */}
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">
                  <Timer className="h-5 w-5 text-purple-300" />
                </div>
                <CardTitle className="text-zinc-100">
                  Customisable Timers
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Pomodoro or something else? Pick the time length to suit your
                  session so you can lock in.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 2: Logging*/}
            <Card className="border-white/10 bg-black/20 shadow-2xl shadow-purple-950/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-black/30">
              <CardHeader>
                {/* Icon */}
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">
                  <BarChart3 className="h-5 w-5 text-purple-300" />
                </div>
                <CardTitle className="text-zinc-100">
                  Automated Logging
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Your focus sessions are instantly logged by course, type, week
                  and term
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 3: Visualise Progress*/}
            <Card className="border-white/10 bg-black/20 shadow-2xl shadow-purple-950/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-black/30">
              <CardHeader>
                {/* Icon */}
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">
                  <CalendarDays className="h-5 w-5 text-purple-300" />
                </div>
                <CardTitle className="text-zinc-100">
                  Visualise Your Progress
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  See how much work you have put in day by day, week by week,
                  term by term.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      {/* 3. FOOTER */}
      <footer className="flex"></footer>
    </div>
  );
}
