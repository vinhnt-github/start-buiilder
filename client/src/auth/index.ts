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
});
