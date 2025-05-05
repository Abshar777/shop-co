"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const LiveSessionMonitor = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const protectedRoutes = [
    "/home/cart",
    "/home/cart/checkout",
    "/home/profile",
    "/home/profile/orders",
  ];

  useEffect(() => {
    if (
      !session?.user?.id &&
      (pathname.startsWith("/home/profile") ||
        protectedRoutes.includes(pathname))
    ) {
      signOut().then(() => {
        toast.error("Session expired, please login again");
      });
    }
  }, [session?.user]);
  return <>{children}</>;
};

export default LiveSessionMonitor;
