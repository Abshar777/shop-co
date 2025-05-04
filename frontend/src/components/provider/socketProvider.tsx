"use client";
import React, { useEffect, useState } from "react";
import { getSocket } from "../../utils/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  console.log("updated socket 🌿");
  const router = useRouter();
  const client = useQueryClient();
  const [notificationSound, setNotificationSound] =
    useState<HTMLAudioElement | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio("/notification.mp3");
    setNotificationSound(audio);
  }, []);

  const handleUserInteraction = () => {
    if (notificationSound && !isSoundEnabled) {
      // Try playing silently to unlock autoplay permission
      notificationSound
        .play()
        .then(() => {
          notificationSound.pause();
          notificationSound.currentTime = 0;
          setIsSoundEnabled(true);
          console.log("🔓 Audio playback enabled");
        })
        .catch((err) => {
          console.warn("❌ Failed to unlock audio autoplay", err);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleUserInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [notificationSound]);

  useEffect(() => {
    if (!session) return;
    const socket = getSocket(session);

    socket.on("connect", () => {
      console.log("🟢 connected to socket");
    });

    socket.on("notification", async (data) => {
      if (notificationSound) {
        notificationSound.play().catch((err) => {
          console.error("🔊 Failed to play sound:", err);
        });
      }

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
      await client.invalidateQueries({ queryKey: ["orders"] });
      await client.invalidateQueries({ queryKey: ["order"] });
      await client.invalidateQueries({ queryKey: ["products"] });
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
