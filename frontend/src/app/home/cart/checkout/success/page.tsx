"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useRouter } from "nextjs-toploader/app";
import { useSession } from "next-auth/react";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function SuccessPage() {
  let animationInstance: any = null;
  const [count, setCount] = useState(10);
  const router = useRouter();
  const { data: session, update } = useSession();
  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      update({
        ...session,
        user: { ...session?.user, orderSuccesPageAccess: false },
      });
      router.push("/");
    }
  }, [count]);
  const makeShot = (particleRatio: any, opts: any) => {
    animationInstance &&
      animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  };

  const fire = () => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const getInstance = (instance: any) => {
    animationInstance = instance;
  };
  useEffect(() => {
    fire();
  }, []);
  return (
    <div className="relative  flex flex-col items-center justify-center overflow-hidden ">
      {/* Left side confetti cannon */}
      <ReactCanvasConfetti
        refConfetti={getInstance as unknown as any}
        style={canvasStyles as any}
      />
      <div className="z-10 text-center px-4 py-10 sm:px-6 lg:px-8 max-w-md mx-auto">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Success
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Your action has been completed successfully.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Redirecting to home page in {count} seconds
        </p>
        <div className="mt-10">
          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
