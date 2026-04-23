import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Valley Express Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "driver_id" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // PRODUCTION LOGIC: Replace with valid DB lookup
        // Hardcoded for V1.0 Launch Demo
        if (credentials?.username === "driver_1" && credentials?.password === "valley_stat_2026") {
          return { id: "1", name: "Elias Rivera", email: "elias@valleyexpress.com" };
        }
        if (credentials?.username === "dispatch_master" && credentials?.password === "phoenix_zero_delays") {
          return { id: "2", name: "Dispatch Control", email: "hq@valleyexpress.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "temporary-secret-for-audit",
});

export { handler as GET, handler as POST };
