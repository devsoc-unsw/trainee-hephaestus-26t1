"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Check, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useAuth } from "../providers/AuthProvider";
import { redirect } from "next/navigation";
import { getUser, getSessions, updateUser } from "@/lib/api";

type Profile = {
  name: string;
  year: string;
  major: string;
  hours: string;
};

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
  const { session } = useAuth();

  // If user is not logged in, redirect to sign-in page
  if (session === null) {
    redirect("/signin");
  }
  const userId = session.user.id;
  const [profile, setProfile] = useState<Profile>({
    name: "",
    year: "",
    major: "",
    hours: "",
  });

  // Fetch user detail from backend when the page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // User Details
        const userDetail = await getUser(userId);
        // Sessions
        const sessions = await getSessions(getCurrentTerm());
        // Total Hours
        const totalSeconds = sessions.reduce((total, session) => {
          return total + session.duration;
        }, 0);
        const totalHours = (totalSeconds / 3600).toFixed(1);
        const data = {
          name: userDetail.name,
          year:
            userDetail.year !== null && userDetail.year !== undefined
              ? String(userDetail.year)
              : "",
          major: userDetail.major || "",
          hours: totalHours,
        };
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    if (session) {
      fetchProfile();
    }
  }, [session]);

  const [editing, setEditing] = useState(false);
  const defaultYear = "Not Set";
  const defaultMajor = "Not Set";

  const updateDetails = async (): Promise<void> => {
    setEditing(!editing);
    await updateUser(userId, {
      name: profile.name,
      year: Number(profile.year),
      major: profile.major,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] font-sans text-zinc-100">
      {/* 1. NAV BAR */}
      <header className="flex h-13 items-center justify-between border-b border-white/10 bg-black/10 px-6 py-2 backdrop-blur-md">
        {/* a. [UPDATE LINK LOCATION] Left: Back Arrow */}
        <div className="flex w-full items-start justify-start">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>
      </header>

      <Card className="m-auto flex w-175 border-white/10 bg-black/20 shadow-2xl shadow-purple-950/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-black/30">
        {/* Edit button */}
        <button
          onClick={updateDetails}
          className="absolute top-3 right-3 rounded-full border border-purple-500/20 bg-purple-500/10 p-2 transition-transform duration-200 hover:scale-110"
        >
          {editing ? (
            <Check className="h-5 w-5 text-purple-300" />
          ) : (
            <Pencil className="h-5 w-5 text-purple-300" />
          )}
        </button>

        <CardContent className="flex items-center gap-3 p-6">
          {/* User Profile icon */}
          <div className="flex p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="148"
              height="148"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-300 opacity-90"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
          </div>
          {/* User Details */}
          <div className="space-y-2 p-6 text-xl font-medium text-zinc-100">
            <div className="flex gap-3">
              Name:
              {editing ? (
                <Input
                  className="bg-purple-500/20"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              ) : (
                <div>{profile.name}</div>
              )}
            </div>
            <div className="flex gap-6">
              Year:
              {editing ? (
                <Input
                  className="bg-purple-500/20"
                  value={profile.year}
                  onChange={(e) =>
                    setProfile({ ...profile, year: e.target.value })
                  }
                />
              ) : (
                <div>{profile.year ? profile.year : defaultYear}</div>
              )}
            </div>
            <div className="flex gap-3">
              Major:
              {editing ? (
                <Input
                  className="bg-purple-500/20"
                  value={profile.major}
                  onChange={(e) =>
                    setProfile({ ...profile, major: e.target.value })
                  }
                />
              ) : (
                <div>{profile.major ? profile.major : defaultMajor}</div>
              )}
            </div>
            <div className="flex gap-3">Total Hours: {profile.hours}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
