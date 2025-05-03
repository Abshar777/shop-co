import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Lato } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { authConfig } from "@/lib/auth.config";
import { getServerSession } from "next-auth/next";

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="en" className={`${lato.className}`} suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className={"overflow-hidden"}>
        <NextTopLoader shadow="0 0 10px #5D32F5" color="#5D32F5" showSpinner={false} />
        <NuqsAdapter>
          <Providers session={session}>
            <Toaster theme="light" />
            {children}
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
