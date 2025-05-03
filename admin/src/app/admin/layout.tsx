import KBar from "@/components/global/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "SHOP.CO",
  description: "SHOP.CO",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
      {/* page main content */}

      {/* page main content ends */}
    </KBar>
  );
}
