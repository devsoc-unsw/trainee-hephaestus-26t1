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
 * A type representing a user's study session.
 */
export type Session = {
  id: string;
  course: string;
  task: string;
  term: string;
  week: number;
  session_time: string;
  duration: number;
};

/**
 * A type representing the body of a create session request.
 */
export type SessionCreate = {
  course: string;
  task: string;
  session_time: string;
  duration: number;
};

/**
 * A type representing the body of a patch session request.
 */
export type SessionPatch = {
  course?: string;
  task?: string;
  session_time?: string;
  duration?: number;
};

/**
 * A type representing an API error.
 */
export type ApiError = {
  code: number;
  message: string;
};
