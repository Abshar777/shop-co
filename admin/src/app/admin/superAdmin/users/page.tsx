"use client";
import PageContainer from "@/components/layout/page-container";
import UsersList from "@/components/table/users/usersList";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SearchParams } from "nuqs/server";

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Page(props: pageProps) {
  return (
    <>
      <PageContainer scrollable={true}>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading title="Users 🫰" description="Data Listing And Actions " />
            <div className="flex  w-1/2 items-center justify-end gap-2">
              <div className="relative w-1/2"></div>
            </div>
          </div>
          <Separator />
          <UsersList />
        </div>
      </PageContainer>
    </>
  );
}
