"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "nextjs-toploader/app";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { useGetCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotification";

export const useNav = () => {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = React.useState(false);
    const closeDrawer = () => setIsOpen(false);
    const { data: session } = useSession();
    const router = useRouter();
    const { setIsAuthModalOpen } = useUIStore();
    useEffect(() => {
      if (isOpen) {
        setIsOpen(false);
      }
    }, [pathname]);
  
    const { data: response } = useGetCart();
    const [cartCount, setCartCount] = useState(0);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { data: notificationsResponse } = useNotifications();
    const notification = notificationsResponse?.notifications || [];
    useEffect(() => {
      console.log("response", response);
      if (response?.cart) {
        setCartCount(response.cart.items.length);
      }
    }, [response]);
    return {
        isOpen,
        setIsOpen,
        closeDrawer,
        cartCount,
        isNotificationsOpen,
        setIsNotificationsOpen,
        notification,
        pathname,
        isMobile,
        session,
        router,
        setIsAuthModalOpen,
        response,
    }
}

