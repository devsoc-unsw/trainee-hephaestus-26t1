import { betterAuth } from "better-auth";
import { database } from "./database.ts";
import { username } from "better-auth/plugins";
import generator from "./snowflake.ts";

export const auth = betterAuth({
  database,
  trustedOrigins: ["http://localhost:3000", "https://termly.railway.app"],
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {},
  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 20,
    }),
  ],
  account: {
    modelName: "accounts",
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
