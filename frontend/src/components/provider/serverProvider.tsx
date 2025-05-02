import { authConfig } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

const ServerProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authConfig);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ServerProvider;
