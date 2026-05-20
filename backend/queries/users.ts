import type { UserProfile } from "../utils/types.ts";
import { database } from "../utils/database.ts";

/**
 * Get a user's profile, given their ID.
 */
export async function getUser(userId: string): Promise<UserProfile | null> {
  // Create query
  const query = `
    select "id", "name", "image" as "avatarUrl", "year", "major" 
    from "users" 
    where id = $1
  `;
  const values = [userId];

  // Run query
  const results = await database.query(query, values);

  // Check if user was found
  if (results.rows.length === 1) {
    return results.rows[0] as UserProfile;
  } else {
    return null;
  }
}

/**
 * Update a user's profile.
 *
 * Returns whether an update was performed.
 */
export async function updateUser(
  userId: string,
  name?: string,
  year?: number | null,
  major?: string | null,
): Promise<boolean> {
  // Get fields to update
  const fields = [];
  const values = [];
  let nextPlaceholder = 1;

  if (name !== undefined) {
    fields.push(`"name" = $${nextPlaceholder++}`);
    values.push(name);
  }

  if (year !== undefined) {
    fields.push(`"year" = $${nextPlaceholder++}`);
    values.push(year);
  }

  if (major !== undefined) {
    fields.push(`"major" = $${nextPlaceholder++}`);
    values.push(major);
  }

  // Add user ID to values
  values.push(userId);

  // Create query
  const query = `
    update "users"
    set ${fields.join(", ")}
    where "users".id = $${nextPlaceholder}`;

  // Run query
  const results = await database.query(query, values);

  // Return if anything was updated
  return !!results.rowCount;
}
