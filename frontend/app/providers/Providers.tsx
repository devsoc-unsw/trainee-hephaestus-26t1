"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthWrapper from "@/app/providers/AuthWrapper";

export default function Providers({ children }: { children: ReactNode }) {
  // Create query client
  const queryClient = new QueryClient();

  // Return providers
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthWrapper>{children}</AuthWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
}
