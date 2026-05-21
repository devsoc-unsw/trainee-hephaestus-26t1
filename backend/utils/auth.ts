import { betterAuth } from "better-auth";
import { database } from "./database.ts";
import generator from "./snowflake.ts";

export const auth = betterAuth({
  database,
  trustedOrigins: ["http://localhost:3000", "https://termful.up.railway.app"],
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [],
  account: {
    modelName: "accounts",
    accountLinking: {
      trustedProviders: ["google"],
    },
  },
  user: {
    modelName: "users",
  },
  session: {
    modelName: "sessions",
  },
  verification: {
    modelName: "verifications",
  },
  advanced: {
    database: {
      generateId: () => generator.generate().toString(),
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;
