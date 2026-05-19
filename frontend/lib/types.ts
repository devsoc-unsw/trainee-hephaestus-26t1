// User types

/**
 * A type representing a user's profile.
 */
export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

/**
 * A type representing an API error.
 */
export type ApiError = {
  code: number;
  message: string;
};
