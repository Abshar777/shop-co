// admin/auth.config.ts
import { AuthOptions, DefaultSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        name: { label: "Password", type: "password" },
        id: { label: "Id", type: "id" },
        role: { label: "Role", type: "role" },
        token: { label: "Token", type: "token" },
        verified: { label: "Verified", type: "boolean" },
      },
      async authorize(credentials) {
        console.log("authorize", credentials)
        if (!credentials?.email || !credentials?.name || !credentials.id) {
          console.log("Email and name and id are required.");
          return null;
        }

        // Mock user for now, replace with actual DB call
        const user = {
          token: credentials?.token as string,
          id: credentials?.id,
          name: credentials.name,
          email: credentials.email as string,
          role: credentials.role as string,
          verified: credentials.verified as any
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/login" // Custom sign-in page
  },
  session: {
    strategy: "jwt"
  },
  cookies: {
    // Add custom cookie configuration
    sessionToken: {
      name: `admin-session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: `admin-callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `admin-csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.verified = user.verified;
      }
      return token;
    },
    redirect({ url, baseUrl }) {
      baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL as string;
      return url.startsWith(baseUrl) ? url : `${baseUrl}/`;
    },
    session({ session, token }) {
      session.user.token = token.token as string;
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.verified = token.verified as string;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "admin"
};

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      id: string;
      name: string;
      email: string;
      role: string;
      verified: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    id: string;
    name: string;
    email: string;
    role: string;
    verified: string;
  }
}

declare module "next-auth" {
  interface User {
    token: string;
    id: string;
    name: string;
    email: string;
    role: string;
    verified: string;
  }
}