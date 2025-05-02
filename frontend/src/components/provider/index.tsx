"use client";
import { HeroUIProvider } from "@heroui/system";
import React from "react";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import ReactQueryProvider from "./react-query";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionProviderProps["session"];
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <ReactQueryProvider>
          <NextTopLoader
            height={2}
            shadow="0 0 10px white"
            color="white"
            showSpinner={false}
            zIndex={999999999999999}
          />
          <HeroUIProvider>
            <Toaster
              visibleToasts={1}
              position="bottom-center"
              richColors
              theme="light"
            />
            {children}
          </HeroUIProvider>
        </ReactQueryProvider>
      </SessionProvider>
    </>
  );
};

export default Provider;
