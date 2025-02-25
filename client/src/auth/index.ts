import NextAuth from "next-auth";
import { authOption } from "./options";

export const { auth, handlers, signIn, signOut } = NextAuth(authOption);
