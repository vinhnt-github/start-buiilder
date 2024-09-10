import { findUserByEmail, postNewUser } from "@/services/user";
import NextAuth from "next-auth";
import KeyCloak from "next-auth/providers/keycloak";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    KeyCloak({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!profile || !profile.email) return false;
      const existingUser = await findUserByEmail(profile.email);
      if (!existingUser.data.length) {
        await postNewUser({
          email: profile.email,
          givenName: profile.given_name ?? "",
          familyName: profile.family_name ?? "",
        });
      }
      return true;
    },
  },
});
