import { findUserByEmail, postNewUser } from "@/services/user";
import { NextAuthConfig } from "next-auth";
import KeyCloak from "next-auth/providers/keycloak";

export const authOption: NextAuthConfig = {
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
      let existingUser;
      existingUser = await findUserByEmail(profile.email);
      if (existingUser.data.length === 0) {
        existingUser = await postNewUser({
          email: profile.email,
          givenName: profile.given_name ?? "",
          familyName: profile.family_name ?? "",
        });
      }
      user.id = existingUser.data[0].id;

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
