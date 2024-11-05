// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    userId: string;
    sesionToken: string;
    expires: string;
    user: User;
    // Add any other properties you want to include in the session
  }

  interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    emailVerified: string;
    image: string;
    accounts: Account;
    sessions: Session;
    // Add any other properties you want to include in the user object
  }

  interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string;
    access_token: string;
    expires_at: number;
    token_type: string;
    scope: string;
    id_token: string;
    session_state: string;
    user: User;
  }
}
