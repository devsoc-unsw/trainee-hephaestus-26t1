import { database } from "../utils/database.ts";

/**
 * Check if a user has a specific course in a given term.
 */
export async function userHasCourse(
  userId: string,
  term: string,
  courseName: string,
): Promise<boolean> {
  // Create query
  const query = `
    select exists (
      select 1
      from "user_courses"
      where "user_id" = $1 and "term" = $2 and "course_name" = $3
    ) as result
  `;

  // Run query
  const results = await database.query(query, [userId, term, courseName]);

  // Return result
  if (results.rows.length === 1) {
    return results.rows[0].result;
  } else {
    return false;
  }
}

/**
 * Get the user's courses for a specific term.
 */
export async function getUserCourses(
  userId: string,
  term: string,
): Promise<string[]> {
  // Create query
  const query = `
    select "course_name"
    from "user_courses"
    where "user_id" = $1 and "term" = $2
  `;
  const values = [userId, term];

  // Run query
  const results = await database.query(query, values);

  // Return query result
  return results.rows.map((row) => row.course_name) as string[];
}

/**
 * Add a new course for a user's specified term.
 *
 * Throws an error on a fail.
 */
export async function createCourse(
  userId: string,
  term: string,
  courseName: string,
): Promise<void> {
  // Create query
  let query = `
    insert into "user_courses" ("user_id", "term", "course_name") 
    values ($1, $2, $3)
    returning *
  `;

  const values = [userId, term, courseName];

  // Run query
  const results = await database.query(query, values);

  // Check if insertion was successful
  if (results.rows.length !== 1) {
    throw new Error("Could not add course to user.");
  }
}

/**
 * Delete a course from a user's specified term.
 *
 * Returns whether a deletion was performed.
 */
export async function deleteCourse(
  userId: string,
  term: string,
  courseName: string,
): Promise<boolean> {
  // Create query
  const query = `
    delete from "user_courses"
    where "user_id" = $1 and "term" = $2 and "course_name" = $3`;

  // Run query
  const results = await database.query(query, [userId, term, courseName]);

  // Return if anything was deleted
  return !!results.rowCount;
}
