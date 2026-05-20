import { createContext, ReactNode, useContext, useMemo } from "react";
import { authClient, Session } from "@/lib/auth-client";
import { PartialUserProfile } from "@/lib/types";
import { SessionQueryParams } from "better-auth";

export type AuthContextType = {
  session: Session | null;
  isPending: boolean;
  refetch: (
    queryParams?:
      | {
          query?: SessionQueryParams;
        }
      | undefined,
  ) => Promise<void>;
  isRefetching: boolean;
  userProfile: PartialUserProfile | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Get user session
  const {
    data: session,
    isPending,
    refetch,
    isRefetching,
  } = authClient.useSession();

  // Create user profile object
  const userProfile: PartialUserProfile | null = useMemo(() => {
    // Return null if session has not been fetched
    if (!session) return null;

    // Otherwise, return derived user
    return {
      id: session.user.id,
      name: session.user.name,
      avatarUrl: session.user.image ?? null,
    };
  }, [session]);

  // Return auth provider
  return (
    <AuthContext.Provider
      value={{
        session,
        isPending,
        refetch,
        isRefetching,
        userProfile: userProfile ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // Get context, and ensure it isn't null
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider component.");
  }

  // Otherwise, return context
  return context;
}
