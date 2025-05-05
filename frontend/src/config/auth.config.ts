// client/auth.config.ts
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your@email.com" },
                name: { label: "Password", type: "password" },
                id: { label: "Id", type: "id" },
                token: { label: "Token", type: "token" },
            },
            authorize(credentials) {
                console.log("authorize", credentials)
                if (!credentials?.email || !credentials?.name || !credentials.id) {
                    console.log("Email and name and id are required.");
                    return null;
                }

                const user: User = {
                    id: credentials.id,
                    name: credentials.name,
                    email: credentials.email as string,
                    token: credentials.token as string,
                };

                return user;
            }
        }),
    ],
    session: {
        strategy: "jwt"
    },
    cookies: {
        // Add custom cookie configuration
        sessionToken: {
            name: `client-session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        callbackUrl: {
            name: `client-callback-url`,
            options: {
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        csrfToken: {
            name: `client-csrf-token`,
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
            }

            if (trigger === "update") {
                token.orderSuccesPageAccess = session?.user?.orderSuccesPageAccess as boolean;
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
            session.user.orderSuccesPageAccess = token.orderSuccesPageAccess as boolean;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "client"
};

declare module "next-auth" {
    interface Session {
        user: {
            token: string;
            id: string;
            name: string;
            email: string;
            orderSuccesPageAccess: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string;
        id: string;
        name: string;
        email: string;
        orderSuccesPageAccess: boolean;
    }
}

declare module "next-auth" {
    interface User {
        token: string;
        id: string;
        name: string;
        email: string;
    }
}