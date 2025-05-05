"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const LiveSessionMonitor = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.user?.id && !pathname.startsWith("/auth")) {
      signOut().then(() => {
        toast.error("Session expired, please login again");
      });
    }
  }, [session?.user]);
  return <>{children}</>;
};



export default LiveSessionMonitor;
