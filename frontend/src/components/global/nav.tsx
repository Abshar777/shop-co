"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navItems } from "@/constants";
import { Input } from "../ui/input";
import { IoCloseCircle, IoSearch } from "react-icons/io5";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Button } from "@heroui/button";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "nextjs-toploader/app";
import AuthModal from "../page-sections/auth/authModal";
import { useSession } from "next-auth/react";
import { useUIStore } from "@/store/uiStore";
import { Badge } from "../ui/badge";
import { useGetCart } from "@/hooks/useCart";
const MobileNavSheetContent = ({ closeDrawer }: { closeDrawer: Function }) => {
  const pathname = usePathname();
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed z-50 inset-0 bg-black/10 backdrop-blur-sm" />
      <Drawer.Content
        className="left-1 top-2 bottom-2 fixed z-50 outline-none w-[310px] flex"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <div className="bg-gray-200 h-full w-full grow px-3 py-1 flex flex-col rounded-[16px]">
          <Drawer.Title className="font-medium px-0  border-b border-dashed border-zinc-900/20 justify-between flex items-center mb-2 text-white">
            <div className="top-0 -translate-x-3 scale-[.8] left-0">
              <h1 className="text-2xl text-black font-bold">SHOP.CO</h1>
            </div>
            <Button
              onPress={() => closeDrawer()}
              size="sm"
              isIconOnly
              variant="ghost"
              className="text-xl active:scale-100 border-0 px-0 text-primary bg-transparent"
            >
              <IoCloseCircle />
            </Button>
          </Drawer.Title>
          <Drawer.Description className="mb-2 flex flex-col gap-4">
            {navItems.map((e, i) => (
              <Link
                className={cn(
                  "w-full flex items-center justify-between",
                  pathname == e.href && "text-primary"
                )}
                key={e.href + "mobile" + i}
                href={e.href}
              >
                <span className="">{e.label}</span>
                <IoIosArrowDroprightCircle
                  className={cn(
                    "text-primary text-lg",
                    pathname != e.href && "opacity-50"
                  )}
                />
              </Link>
            ))}
          </Drawer.Description>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};
const Nav = () => {
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
  useEffect(() => {
    console.log("response", response);
    if (response?.cart) {
      setCartCount(response.cart.items.length);
    }
  }, [response]);
  return (
    <>
      <div className="w-full bg-gray-200 px-7 py-2 flex justify-between items-center">
        <Drawer.Root
          shouldScaleBackground
          open={isOpen}
          onOpenChange={setIsOpen}
          direction="left"
        >
          <Drawer.Trigger className="md:hidden  block">
            <FaBars />
          </Drawer.Trigger>
          <MobileNavSheetContent closeDrawer={closeDrawer} />
        </Drawer.Root>
        <div className="flex  items-center gap-4">
          <Link href="/">
            <h1 className="text-2xl font-bold">SHOP.CO</h1>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {navItems.map((item, index) => (
            <Link
              className={cn("md:block hidden")}
              href={item.href}
              key={index}
            >
              <>
                <p className="group relative text-sm inline-block overflow-hidden">
                  <span className="inline-block transition-all duration-300 opacity-100 group-hover:-translate-y-6">
                    {item.label}
                  </span>
                  <span className="absolute left-0 inline-block translate-y-5 transition-all duration-300 group-hover:scale-[.9]  group-hover:translate-y-0">
                    {item.label}
                  </span>
                </p>
                {pathname == item.href && (
                  <div className="w-full h-[1px] bg-primary rounded-full"></div>
                )}
              </>
            </Link>
          ))}
          <div className="relative md:flex  ml-2 hidden items-center rounded-full bg-muted-foreground/10 px-5">
            <div className="absolute -translate-x-3">
              <IoSearch className="text-gray-500" />
            </div>
            <Input
              className="w-60  focus-visible:ring-0  bg-transparent border-none ring-transparent"
              type="text"
              placeholder="Search"
            />
          </div>

          {session?.user?.id ? (
            <>
              <div className="relative">
                <Button
                  onPress={() => router.push("/home/cart")}
                  isIconOnly
                  size="sm"
                  className="rounded-full p-1 cursor-pointer"
                >
                  <FaCartShopping className="" />
                </Button>
                <Badge className="absolute top-0 -right-2 bg-blue-100 text-blue-800  text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </Badge>
              </div>
              <Button
                onPress={() => router.push("/home/profile")}
                isIconOnly
                size="sm"
                className="rounded-full p-1 cursor-pointer"
              >
                <CgProfile className="" />
              </Button>
            </>
          ) : (
            <Button
              onPress={() => setIsAuthModalOpen(true)}
              size="sm"
              className="rounded-sm font-semibold cursor-pointer border-primary border text-sm  bg-primary/90 active:scale-95 transition-all duration-300 text-white"
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <AuthModal nowProp={"login"} />
    </>
  );
};

export default Nav;
