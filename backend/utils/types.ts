// User types

/**
 * A type representing a user's profile.
 */
export type UserProfile = {
  id: string;
  name: string;
  avatarUrl: string | null;
  year: number | null;
  major: string | null;
};

/**
 * A type representing the body of a patch user request.
 */
export type UserPatch = {
  name?: string;
  year?: number | null;
  major?: string | null;
};

/**
 * A type representing the body of a course create request.
 */
export type CourseCreate = {
  name: string;
};
