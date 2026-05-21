"use client";

import { ArrowLeft } from "lucide-react";
import { SignUpForm } from "@/components/forms/SignUpForm";
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
    <div className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] p-3 font-sans text-zinc-100 md:p-8">
      {/* Back Arrow */}
      <div className="absolute top-10 left-8 flex w-full items-start justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={20} />
          Back
        </Link>
      </div>
      {/* Signup Form */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          Termful
        </Link>
        <SignUpForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
