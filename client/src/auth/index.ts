import NextAuth from "next-auth"
import KeyCloak from "next-auth/providers/keycloak"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [KeyCloak],
})