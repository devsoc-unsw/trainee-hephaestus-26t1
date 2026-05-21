"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import React, { useState, useEffect } from "react";
import { getCourses, createSession } from "@/lib/api";

type TimerMode = "focus" | "shortBreak" | "longBreak";

// Dummy data for courses (should be fetched from backend)
const COURSES = [
  "COMP1511: Programming Fundamentals",
  "COMP6080: Web Front End Programming",
];

const TASKS = [
  { id: "t1", name: "Lecture" },
  { id: "t2", name: "Lab" },
  { id: "t3", name: "Assignment" },
  { id: "t4", name: "Other" },
];

// Helper to calculate current UNSW term based on today's date (e.g. "26T2")
const getCurrentTerm = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = date.getMonth() + 1; // 1-12

  let term = "T1";
  if (month >= 6 && month <= 8) term = "T2"; // June - Aug
  if (month >= 9) term = "T3";

  return `${year}${term}`;
};

export default function Page() {
  // 0. AUTH STATE
  const { session } = useAuth();

  // If user is not logged in, redirect to sign-in page
  if (session === null) {
    redirect("/signin");
  }

  // 1. TIMER + BUTTON STATE
  // Default duration constants (in secs)
  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK_TIME = 5 * 60;
  const LONG_BREAK_TIME = 15 * 60;
  const [initialTime, setInitialTime] = useState<number>(25 * 60);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  // Inline Editing
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [customFocusTime, setCustomFocusTime] = useState<number>(FOCUS_TIME);
  // Mode State: focus, break
  const [mode, setMode] = useState<TimerMode>("focus");
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);
  // Course & Tasks
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  // Fetching Course
  const [courses, setCourses] = useState<string[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  // Completion Animations
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch courses from backend when the page loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const currentTerm = getCurrentTerm();
        const fetchedCourses = await getCourses(currentTerm);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoadingCourses(false);
      }
    };
    if (session) {
      fetchCourses();
    }
  }, [session]);

  // 2. HELPERS:
  // Handler to move from setup (course + task selection) to timer
  const handleStartSession = (
    e: React.SyntheticEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    if (!selectedCourse) return;
    setIsSetupComplete(true);
  };

  // Onclicks for Start/Pause and Reset Buttons + Time formatter
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

  // When user clicks large timer, update state
  const handleTimerClick = (): void => {
    setIsActive(false);
    setIsEditing(true);
    setInputValue(formatTime(timeLeft)); // Prefill so user can edit current time left
  };

  // Update temp state as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // Parse user input and save when user hits enter or clicks away
  const handleInputSubmit = (): void => {
    setIsEditing(false);

    // Regex to split user input on any non-numeric char (so 25:30, 25-30, 25 30, 25.30 all valid)
    const parts = inputValue.split(/[^0-9]+/);
    let totalSeconds = 0;

    // If they typed MM:SS, MM-SS etc
    if (parts.length === 2) {
      const m = parseInt(parts[0], 10) || 0;
      const s = parseInt(parts[1], 10) || 0;
      totalSeconds = m * 60 + s;

      // If they type single number (e.g. '25') then assume minutes
    } else {
      const m = parseInt(parts[0], 10) || 0;
      totalSeconds = m * 60;
    }

    // Only update if valid time greater than 0 inputted
    if (totalSeconds > 0) {
      setInitialTime(totalSeconds);
      setTimeLeft(totalSeconds);
      if (mode === "focus") {
        setCustomFocusTime(totalSeconds);
      }
    }
  };

  // User can save inputted time by pressing enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  // Helpers for switch between focus and break modes
  const switchMode = (newMode: TimerMode): void => {
    setIsActive(false);
    setMode(newMode);

    let newTime = customFocusTime;
    if (newMode === "shortBreak") newTime = SHORT_BREAK_TIME;
    if (newMode === "longBreak") newTime = LONG_BREAK_TIME;

    setInitialTime(newTime);
    setTimeLeft(newTime);
  };

  // Handle timer hitting zero, log a session to the backend, update local state and go to break
  const handleSessionComplete = async (): Promise<void> => {
    // Trigger completion animation of header
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);

    // a. Fire completed session to the backend
    if (mode === "focus") {
      try {
        await createSession({
          course: selectedCourse,
          task: selectedTask || "Other", // If no task selected, fallback to 'Other'
          session_time: new Date().toISOString(),
          duration: customFocusTime,
        });
      } catch (error) {
        console.error("Failed to log session:", error);
      }

      // b. Update local state
      const newSessionCount = sessionsCompleted + 1;
      setSessionsCompleted(newSessionCount);

      // c. Trigger long break every 4th session
      if (newSessionCount % 4 === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else
      // d. If a break finishes, go back to focus mode
      switchMode("focus");
  };

  // 3. TIMER CLOCK LOGIC
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // a. If timer is active but has reached 0, turn off
    if (isActive && timeLeft === 0) {
      const timeoutId = setTimeout(() => {
        setIsActive(false);
        handleSessionComplete();
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
  }, [isActive, timeLeft, mode, sessionsCompleted]);

  // 4. CIRCLE UI
  // SVG Circle Calculations
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  // Cover edge case to prevent division by 0
  const progress = initialTime > 0 ? timeLeft / initialTime : 0;
  const strokeDashoffset = circumference - progress * circumference;

  // 5. MODE: Dynamic colours based on mode
  const isFocus = mode === "focus";
  const auraColor = isFocus ? "text-purple-500/70" : "text-emerald-500/70";
  const ringColor = isFocus ? "text-purple-300" : "text-emerald-300";

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] font-sans text-zinc-100">
      {/* 1. NAV BAR */}
      <header className="flex h-13 items-center justify-between border-b border-white/10 bg-black/10 px-6 py-2 backdrop-blur-md">
        {/* a. [UPDATE LINK LOCATION] Left: Back Arrow */}
        <div className="flex w-full items-start justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* b. [UPDATE/ADD?] Right - Action Buttons */}
        <div className="flex gap-3">
          {/* <Button variant="secondary" asChild>
            <Link href="/login">Log in</Link>
          </Button> */}
        </div>
      </header>

      {/* 2. MAIN */}
      <main className="flex flex-1 flex-col items-center justify-center">
        {isSetupComplete ? (
          <section className="flex flex-col items-center justify-center gap-5 text-center">
            {/* a. Header Text & Mode Selector: Dynamically change to focus or break time */}
            <div className="flex flex-col gap-2">
              <h1
                className={`text-3xl tracking-tight transition-all duration-700 ease-out sm:text-5xl ${isAnimating ? "scale-120 text-emerald-400" : "scale-100"}`}
              >
                {mode === "focus" ? "focus time." : "break time."}
              </h1>

              <h2
                className={`cursor-pointer text-lg tracking-tight sm:text-xl ${
                  isActive
                    ? "pointer-events-none opacity-0 select-none"
                    : "opacity-100"
                }`}
                onClick={() => {
                  setIsSetupComplete(false);
                  setIsActive(false);
                }}
                title="Change course & task"
              >
                {selectedCourse} ({selectedTask})
              </h2>
            </div>

            {/* Mode Selectors */}
            <div
              className={`flex gap-2 rounded-full border border-white/10 bg-zinc-900/50 p-1 transition-all duration-500 ${
                isActive
                  ? "pointer-events-none opacity-0 select-none"
                  : "opacity-100"
              }`}
            >
              <Button
                variant={mode === "focus" ? "default" : "ghost"}
                className="rounded-full"
                onClick={() => switchMode("focus")}
              >
                Focus
              </Button>
              <Button
                variant={mode === "shortBreak" ? "default" : "ghost"}
                className="rounded-full"
                onClick={() => switchMode("shortBreak")}
              >
                Short Break
              </Button>
              <Button
                variant={mode === "longBreak" ? "default" : "ghost"}
                className="rounded-full"
                onClick={() => switchMode("longBreak")}
              >
                Long Break
              </Button>
            </div>

            {/* b. Timer UI: Pops out when timer is on*/}
            <div
              className={`relative flex h-80 w-80 items-center justify-center transition-all duration-700 ease-in-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            >
              {/* i. Outer 'Breathing' Aura: Visible only when timer on*/}
              <svg
                className={`absolute h-full w-full overflow-visible transition-opacity duration-1000 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <circle
                  cx={radius + 20}
                  cy={radius + 20}
                  /* Adjust overlap with (ii) Main Countdown Ring */
                  r={radius + 15}
                  stroke="currentColor"
                  strokeWidth="24" /* Thicker stroke for a wider glow */
                  fill="transparent"
                  className={`${auraColor} blur-xl ${
                    isActive ? "animate-[pulse_5s_ease-in-out_infinite]" : ""
                  }`}
                />
              </svg>

              {/* ii. Inner Main Countdown Rings */}
              <svg className="absolute h-full w-full -rotate-90 transform overflow-visible">
                {/* [Optional] Faint Background Track */}
                {/* <circle
                cx={radius + 20}
                cy={radius + 20}
                r={radius}
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/5"
              /> */}
                {/* Active 'Draining' Ring */}
                <circle
                  cx={radius + 20}
                  cy={radius + 20}
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className={`${ringColor} transition-all duration-1000 ease-linear`}
                />
              </svg>

              {/* iii. Interactive Timer Text with Inline Editing  */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputSubmit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-64 bg-transparent text-center text-7xl font-light tracking-tight tabular-nums outline-none focus:ring-0"
                  />
                ) : (
                  <div
                    onClick={handleTimerClick}
                    className="cursor-pointer text-7xl font-light tracking-tight tabular-nums transition-all hover:text-zinc-300"
                    title="Click to edit time"
                  >
                    {formatTime(timeLeft)}
                  </div>
                )}
                {/* Session progress dots below timer*/}
                <div className="absolute -bottom-15 flex gap-3">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
                        step < sessionsCompleted % 4
                          ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                          : "bg-white/10"
                      }`}
                      title={`Session ${step + 1} of 4`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* c. Action Buttons */}
            {/* Start/Pause & Reset Buttons */}
            <div className="mt-4 flex gap-4">
              <Button size="lg" className="w-40 text-lg" onClick={toggleTimer}>
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-34 text-lg"
                onClick={resetTimer}
              >
                Reset
              </Button>
            </div>
          </section>
        ) : (
          /* SELECT COURSE + TASK FORM */
          <section className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/50 p-8 shadow-xl backdrop-blur-md">
            <h2 className="mb-6 text-center text-2xl font-semibold">
              What are you focusing on?
            </h2>

            <form onSubmit={handleStartSession} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-200">
                  Course (Required)
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-purple-100 p-3 text-zinc-950 transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
                >
                  <option value="" disabled>
                    {isLoadingCourses
                      ? "Loading courses..."
                      : "Select a course"}
                  </option>
                  {courses.map((courseName, index) => (
                    <option key={index} value={courseName}>
                      {courseName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-200">Task</label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-purple-100 p-3 text-zinc-950 transition-all focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                >
                  <option value="">No specific task</option>
                  {TASKS.map((task) => (
                    <option key={task.id} value={task.name}>
                      {task.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-2 w-full"
                disabled={!selectedCourse}
              >
                Enter Focus Mode
              </Button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
