const termStarts = {
  "25T1": new Date("2025-02-17"),
  "25T2": new Date("2025-06-02"),
  "25T3": new Date("2025-09-15"),
  "26T1": new Date("2026-02-16"),
  "26T2": new Date("2026-06-01"),
  "26T3": new Date("2026-09-14"),
};

export type ValidTerm = "25T1" | "25T2" | "25T3" | "26T1" | "26T2" | "26T3";

/**
 * Get the academic week of a given date.
 * @param date The date to get the week for.
 */
export function getTermWeek(date: Date): number {
  // Get start of term
  const termStart = termStarts[getTerm(date)];

  // Get week of term
  const timeElapsed =
    new Date(date.toDateString()).getTime() - termStart.getTime();
  return Math.floor(timeElapsed / (7 * 24 * 60 * 60 * 1000) + 1);
}

/**
 * Get the term for a given date. The date MUST be in 2026.
 * @param date The date to get the term for.
 */
export function getTerm(date: Date): ValidTerm {
  // Get date
  let dateComponent = new Date(date.toDateString());

  // Check what year the date lies in
  if (date.getFullYear() === 2026) {
    // Check what term the date lies in
    if (date >= termStarts["26T2"]) {
      if (date >= termStarts["26T3"]) {
        return "26T3";
      } else {
        return "26T2";
      }
    } else {
      return "26T1";
    }
  } else {
    // Check what term the date lies in
    if (date >= termStarts["25T2"]) {
      if (date >= termStarts["25T3"]) {
        return "25T3";
      } else {
        return "25T2";
      }
    } else {
      return "25T1";
    }
  }
}
