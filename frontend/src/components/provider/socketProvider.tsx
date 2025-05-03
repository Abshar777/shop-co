"use client";
import React, { useEffect } from "react";
import { getSocket } from "../../utils/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const client = useQueryClient();
  useEffect(() => {
    if (!session) return;
    const socket = getSocket(session);
    socket.on("connect", () => {
      console.log("🟢 connected to socket");
    });

    socket.on("notification", async (data) => {
      console.log("🟢 notification", data);
      toast.info(data.message, {
        description: data.description,
        action: {
          label: "View",
          onClick: () => {
            if (data?.orderId) {
              router.push(`/home/profile/orders/${data.orderId}`);
            } else {
              console.warn("No orderId provided in notification data");
            }
          },
        },
      });
      await client.invalidateQueries({ queryKey: ["notifications"] });
      await client.refetchQueries({ queryKey: ["orders"] });
      await client.refetchQueries({ queryKey: ["products"] });
    });

    socket.on("disconnect", () => {
      console.log("🔴 disconnected from socket");
    });

    return () => {
      socket.off("connect");
      socket.off("notification");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [session]);
  return <>{children}</>;
};

export default SocketProvider;
