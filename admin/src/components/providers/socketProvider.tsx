"use client";
import React, { useEffect, useRef, useState } from "react";
import { getSocket } from "../../utils/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const client = useQueryClient();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
  }, []);

  const handleUserInteraction = () => {
    const audio = audioRef.current;
    if (audio && !isSoundEnabled) {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
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
  }, [isSoundEnabled]);

  useEffect(() => {
    if (!session?.user) return;
    const socket = getSocket(session);

    socket.on("connect", () => {
      console.log("🟢 connected to socket");
    });

    socket.on("order_placed", async (data) => {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch((err) => {
          console.error("🔊 Failed to play sound:", err);
        });
      }

      console.log("🟢 order_placed", data);
      toast.info(data);
      await client.invalidateQueries({ queryKey: ["orders"] });
    });

    socket.on("disconnect", () => {
      console.log("🔴 disconnected from socket");
    });
  }, [session?.user]);

  return <>{children}</>;
};

export default SocketProvider;
