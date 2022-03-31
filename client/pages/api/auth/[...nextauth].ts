import nextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  theme: {
    colorScheme: "dark",
  },
  debug: true,
  session: {},
  jwt: {},
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { password: { label: "Password", type: "password" } },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/customOAuth`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        };
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.APPLICATION_ID,
      clientSecret: process.env.APPLICATION_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
};

export default nextAuth(options);
