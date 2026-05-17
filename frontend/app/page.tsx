import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Timer, BarChart3, CalendarDays } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-zinc-100 bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,_oklch(0.55_0.15_240_/_0.35),_transparent_70%),radial-gradient(circle_at_50%_30%,_oklch(0.50_0.25_300_/_0.4),_transparent_80%),radial-gradient(circle_at_80%_20%,_oklch(0.40_0.12_260_/_0.25),_transparent_70%)]">
      {/* 1. NAV BAR */}
      <header className="flex justify-between items-center px-6 py-2 bg-black/10 border-b border-white/10  backdrop-blur-md">
        {/* a. Left: Logo */}
        <div className="text-xl font-extrabold tracking-tight">Termful.</div>

        {/* b. Right - Action Buttons */}
        <div className="flex gap-3">
          <Button variant="ghost">Sign up</Button>
          <Button variant="secondary">Log in</Button>
        </div>
      </header>

      {/* 2. MAIN */}
      <main className="flex-1 px-6">
        {/* a. Top: Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-24 gap-6">
          <h1 className="text-4xl sm:text-6xl tracking-tight">
            Focus Deeply. Log effortlessly.
          </h1>
          <p className="text-md max-w-xl sm:text-lg leading-relaxed mb-4">
            A sleek and lightweight study tracker that pairs deep focus timers
            with automated study logging to visualise your hours. Designed to
            help you build better habits and conquer the term, one session at a
            time.
          </p>
          <Button size="lg" className="h-12 px-8 text-md">
            Create an account
          </Button>
        </section>

        {/* b. Bottom: Feature Cards Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl mb-3">Work Mindfully.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Timer*/}
            <Card className="bg-black/20 border-white/10 backdrop-blur-md shadow-2xl shadow-purple-950/10 transition-all duration-300 hover:border-purple-500/30 hover:bg-black/30 hover:-translate-y-1">
              <CardHeader>
                {/* Icon */}
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2">
                  <Timer className="w-5 h-5 text-purple-300" />
                </div>
                <CardTitle className="text-zinc-100">
                  Customisable Timers
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Timer or stopwatch? Pick the right mode for the study session
                  so you can lock in.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 2: Logging*/}
            <Card className="bg-black/20 border-white/10 backdrop-blur-md shadow-2xl shadow-purple-950/10 transition-all duration-300 hover:border-purple-500/30 hover:bg-black/30 hover:-translate-y-1">
              <CardHeader>
                {/* Icon */}
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-300" />
                </div>
                <CardTitle className="text-zinc-100">
                  Automated Logging
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Your focus sessions are instantly logged by type, subject,
                  week and term
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 3: Visualise Progress*/}
            <Card className="bg-black/20 border-white/10 backdrop-blur-md shadow-2xl shadow-purple-950/10 transition-all duration-300 hover:border-purple-500/30 hover:bg-black/30 hover:-translate-y-1">
              <CardHeader>
                {/* Icon */}
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2">
                  <CalendarDays className="w-5 h-5 text-purple-300" />
                </div>
                <CardTitle className="text-zinc-100">
                  Visual Your Progress
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
