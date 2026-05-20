"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [editing, setEditing] = useState(false);
  const defaultYear = "Not Set";
  const defaultMajor = "Not Set";

  /* Example user details */
  const [profile, setProfile] = useState({
    name: "Khai",
    year: "2",
    major: "Computer Science",
    hours: "120",
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 bg-[radial-gradient(circle_at_20%_80%,oklch(0.55_0.15_240/0.35),transparent_70%),radial-gradient(circle_at_50%_30%,oklch(0.50_0.25_300/0.4),transparent_80%),radial-gradient(circle_at_80%_20%,oklch(0.40_0.12_260/0.25),transparent_70%)] font-sans text-zinc-100">
      <Card className="relative w-175 border-white/10 bg-black/20 shadow-2xl shadow-purple-950/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-black/30">
        {/* Edit button */}
        <button
          onClick={() => setEditing(!editing)}
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
