import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>> | undefined
      ) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await axios.post("http://localhost:8080/login", {
            email: credentials.email as string,
            password: credentials.password as string,
          });

          console.log("@@@@@@@@@@@", res);

          if (res.status !== 200 || !res.data.token)
            throw new Error("Invalid credentials");

          const { token, user_id, stores_id, name, email, image } = res.data;

          return {
            id: user_id.toString(),
            token,
            storesId: stores_id,
            name,
            email,
            image,
          };
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userId = user.id;
        token.storesId = user.storesId;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || "";
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.accessToken as string;
      session.user.id = token.userId as string;
      session.user.storesId = token.storesId as string[];
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
});
