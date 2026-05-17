import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* 1. NAV BAR */}
      <header className="flex justify-between border border-dashed border-red-500">
        {/* a. Left: Logo */}
        <div>Logo</div>

        {/* b. Right - Action Buttons */}
        <div className="border border-dashed border-red-500 flex">
          <Button>Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </header>

      {/* 2. MAIN */}
      <main className="flex-1 bg-purple-300 ">
        {/* a. Top: Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-24 border border-dashed border-red-500">
          <h1 className="text-5xl">Focus Deeply. Log effortlessly</h1>
          <p className="text-xl max-w-xl">
            A sleek and lightweight study tracker than pairs deep focus timers
            with automated study logging to visualise your hours. Designed to
            help you build better habits and conquer the term, one session at a
            time.
          </p>
          <Button>Create an account now</Button>
        </section>

        {/* b. Bottom: Features Section */}
        <section className="border border-dashed border-red-500 max-w-6xl mx-auto">
          <h2 className="text-3xl">FEATURES FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* [FEAT 1]*/}
            <Card>
              <CardHeader>
                <CardTitle>⏱️ Customisable Trackers</CardTitle>
                <CardDescription>
                  Timer or stopwatch? Pick the right mode for the study session
                  so you can lock in.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* [FEAT 2]*/}
            <Card>
              <CardHeader>
                <CardTitle>📊 Automated Logging</CardTitle>
                <CardDescription>
                  Your focus sessions are instantly logged against your tasks,
                  subjects and terms
                </CardDescription>
              </CardHeader>
            </Card>

            {/* [FEAT 3]*/}
            <Card>
              <CardHeader>
                <CardTitle>📆 Visual Your Progress</CardTitle>
                <CardDescription>
                  See how much work you have put in, day by day, week by week,
                  term by term.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      {/* 3. FOOTER */}
      <footer className="flex bg-green-300">footer</footer>
    </div>
  );
}
