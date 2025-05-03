"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  GalleryVerticalEnd,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Icons } from "../global/icons";
import { useTheme } from "next-themes";

import { roleByNavItems } from "@/constants/navItems";
import { DialogTitle } from "../ui/dialog";
export const company = {
  name: "SHOP.CO",
  logo: GalleryVerticalEnd,
  plan: "Enterprise",
};

export default function AppSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { state, isMobile, setOpenMobile, openMobile } = useSidebar();
  const { theme } = useTheme();

 
  const navItems = roleByNavItems(session?.user?.role)

  return (
    <Sidebar collapsible="icon">
      
      <SidebarHeader>
       
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary   text-sidebar-primary-foreground">
            <company.logo color="white" className="size-4  e" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs">{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item: any) => {
              const Icon = item.icon
                ? Icons[item.icon as keyof typeof Icons]
                : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        <div className="inherit">
                          {item.icon && <Icon />}
                          <span>{item.title}</span>
                        </div>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem: any) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              onClick={() => {
                                console.log("clicked");
                                setOpenMobile(false);
                              }}
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link
                                onClick={() => {
                                  console.log("clicked");
                                  setOpenMobile(false);
                                }}
                                href={subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => {
                      console.log("clicked");
                      setOpenMobile(false);
                    }}
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent bg-sidebar-accent hover:bg-sidebar-accent/70 data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    
                    <AvatarFallback className="rounded-lg text-white">
                      {session?.user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-white text-left text-sm leading-tight">
                    <span className="truncate text-white font-semibold">
                      {session?.user?.name || ""}
                    </span>
                    <span className="truncate text-white text-xs">
                      {session?.user?.email || ""}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0  font-normal">
                  <div className="flex items-center  gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                     
                      <AvatarFallback className="rounded-lg text-white">
                        {session?.user?.name?.slice(0, 2)?.toUpperCase() ||
                          "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1  text-left text-sm leading-tight">
                      <span  className="truncate  font-semibold">
                        {session?.user?.name || ""}
                      </span>
                      <span  className="truncate  text-xs">
                        {" "}
                        {session?.user?.email || ""}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {/* <DropdownMenuItem disabled>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Bell />
                    Notifications
                  </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                className="hover:bg-sidebar-accent/50 cursor-pointer"
                  onClick={() => {
                    signOut({
                      callbackUrl:
                        `${window.location.origin}/auth/login` as string,
                    });
                    setOpenMobile(false);
                  }}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
