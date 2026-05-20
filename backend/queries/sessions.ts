import { database } from "../utils/database.ts";
import type { Session } from "../utils/types.ts";
import generator from "../utils/snowflake.ts";

/**
 * Check if a user has a session with the given ID.
 */
export async function sessionExists(
  userId: string,
  sessionId: bigint,
): Promise<boolean> {
  // Create query
  const query = `
    select exists (
      select 1
      from "user_sessions"
      where "user_id" = $1 and "id" = $2
    ) as result
  `;

  // Run query
  const results = await database.query(query, [userId, sessionId]);

  // Return result
  if (results.rows.length === 1) {
    return results.rows[0].result;
  } else {
    return false;
  }
}

/**
 * Get the user's sessions.
 */
export async function getSessions(userId: string): Promise<Session[]> {
  // Create query
  const query = `
    select "id", "course", "task", "term", "week", "session_time", "duration"
    from "user_sessions"
    where "user_id" = $1
  `;
  const values = [userId];

  // Run query
  const results = await database.query(query, values);

  // Return query result
  return results.rows.map((row) => ({
    ...row,
    session_time: (row.session_time as Date).toISOString(),
  })) as Session[];
}

/**
 * Get the user's sessions for a specific term.
 */
export async function getSessionsForTerm(
  userId: string,
  term: string,
): Promise<Session[]> {
  // Create query
  const query = `
    select "id", "course", "task", "term", "week", "session_time", "duration"
    from "user_sessions"
    where "user_id" = $1 and "term" = $2
  `;
  const values = [userId, term];

  // Run query
  const results = await database.query(query, values);

  // Return query result
  return results.rows.map((row) => ({
    ...row,
    session_time: (row.session_time as Date).toISOString(),
  })) as Session[];
}

/**
 * Create a new session for the user with the given ID.
 */
export async function createSession(
  userId: string,
  course: string,
  task: string,
  term: string,
  week: number,
  sessionTime: string,
  duration: number,
): Promise<void> {
  // Generate session ID
  const sessionId = generator.generate();

  // Create query
  let query = `
    insert into "user_sessions" ("id", "course", "task", "term", "week", "session_time", "duration", "user_id") 
    values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning "id", "course", "task", "term", "week", "session_time", "duration"
  `;

  const values = [
    sessionId,
    course,
    task,
    term,
    week,
    sessionTime,
    duration,
    userId,
  ];

  // Run query
  const results = await database.query(query, values);

  // Check if insertion was successful
  if (results.rows.length !== 1) {
    throw new Error("Could not create session.");
  }
}

/**
 * Delete a session with the given ID.
 *
 * Returns whether a deletion was performed.
 */
export async function deleteSession(sessionId: bigint): Promise<boolean> {
  // Create query
  const query = `
    delete from "user_sessions"
    where "id" = $1`;

  // Run query
  const results = await database.query(query, [sessionId]);

  // Return if anything was deleted
  return !!results.rowCount;
}
