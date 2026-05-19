import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
import { QueryClient } from "@tanstack/react-query";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [usernameClient()],
  sessionOptions: {
    refetchOnWindowFocus: false,
    refetchInterval: 3 * 60 * 1000,
  },
});

export function signOutAndClear(queryClient: QueryClient) {
  // Clear cache
  queryClient.clear();

  // Sign out
  authClient.signOut();
}

export type Session = typeof authClient.$Infer.Session;
