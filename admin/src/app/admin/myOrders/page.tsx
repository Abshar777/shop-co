"use client";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";
import { SearchParams } from "nuqs/server";
import { SheetReuse } from "@/components/global/sheet";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import AnimatedButton from "@/components/global/globalButton";
import OrdersList from "@/components/table/orders/ordersList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MyOrdersList from "@/components/table/myOrders/myOrdersList";
type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Page(props: pageProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [sheamId, setsheamId] = useState<string>("");

  return (
    <>
      <PageContainer scrollable={true}>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="My Orders 🌿"
              description="Data Listing And Actions "
            />
            <div className="flex  w-1/2 items-center justify-end gap-2">
              <div className="relative w-1/2"></div>
            </div>
          </div>
          <Separator />
          <ScrollArea className="md:w-[80vw] w-[92vw] ">
            <MyOrdersList />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </PageContainer>
    </>
  );
}
