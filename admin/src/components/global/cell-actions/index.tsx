"use client";

import type React from "react";

import { AlertModal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookTemplate,
  Edit,
  BadgeIcon as IdCard,
  Info,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SheetReuse } from "../sheet";
import { Modal } from "@/components/ui/modal";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface props {
  id: string;
  updateForm?: React.ReactNode;
  deletFn?: Function;
  info?: React.ReactNode;
  dltLoading?: boolean;
  isSuccess?: boolean;
  updateFn?: Function;
  idCardForm?: React.ReactNode;
  template?: Function;
}

export const CellAction = ({
  id,
  updateForm,
  deletFn,
  info,
  dltLoading,
  isSuccess,
  updateFn,
  idCardForm,
  template,
}: props) => {
  const [loading, setLoading] = useState(dltLoading || false);
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sheetState = !!updateForm || !!updateFn;
  const closeSheet = () => setShowEdit(false);
  const openSheet = () => setShowEdit(true);
  const showInfoFN = () => setShowInfo(true);
  const closeInfoFN = () => setShowInfo(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const showIdCardFN = () => setShowIdCard(true);
  const closeIdCardFN = () => setShowIdCard(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSuccess) setOpen(false);
  }, [isSuccess]);

  // Common modals and sheets used by both mobile and desktop
  const actionModals = (
    <>
      {deletFn && (
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => deletFn && deletFn()}
          loading={loading}
        />
      )}
      {updateForm && (
        <SheetReuse
          title="Edit "
          description="this action it will remark the date also"
          open={showEdit}
          closeFn={closeSheet}
        >
          {updateForm}
        </SheetReuse>
      )}
      {!!idCardForm && (
        <SheetReuse
          title="ID Card "
          description="this action it will remark the date also"
          open={showIdCard}
          closeFn={closeIdCardFN}
        >
          {idCardForm}
        </SheetReuse>
      )}
      {info && (
        <Modal
          isOpen={showInfo}
          onClose={closeInfoFN}
          title="info"
          description="information of order details..."
        >
          {info}
        </Modal>
      )}
    </>
  );

  switch (isMobile) {
    case true:
      return (
        <>
          {actionModals}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="h-8 w-8  p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Actions</DrawerTitle>
                <DrawerDescription>
                  Select an action to perform
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-2 space-y-2">
                {info && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-zinc-900/40"
                    onClick={() => {
                      showInfoFN();
                      setDrawerOpen(false);
                    }}
                  >
                    <Info className="mr-2 h-4 w-4" /> Info
                  </Button>
                )}
                {sheetState && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-zinc-900/40"
                    onClick={() => {
                      openSheet();
                      updateFn && updateFn();
                      setDrawerOpen(false);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Update
                  </Button>
                )}
                {deletFn && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-zinc-900/40"
                    onClick={() => {
                      setOpen(true);
                      setDrawerOpen(false);
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                )}
                {!!idCardForm && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-zinc-900/40"
                    onClick={() => {
                      showIdCardFN();
                      setDrawerOpen(false);
                    }}
                  >
                    <IdCard className="mr-2 h-4 w-4" /> ID Card
                  </Button>
                )}
                {!!template && (
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-zinc-900/40"
                    onClick={() => {
                      template();
                      setDrawerOpen(false);
                    }}
                  >
                    <BookTemplate className="mr-2 h-4 w-4" /> Template
                  </Button>
                )}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="default">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      );
    default:
      return (
        <>
          {actionModals}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {info && (
                <DropdownMenuItem onClick={() => showInfoFN()}>
                  <Info className="mr-2 h-4 w-4" /> Info
                </DropdownMenuItem>
              )}
              {sheetState && (
                <DropdownMenuItem
                  onClick={() => {
                    openSheet();
                    updateFn && updateFn();
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
              )}
              {deletFn && (
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              )}
              {!!idCardForm && (
                <DropdownMenuItem onClick={() => showIdCardFN()}>
                  <IdCard className="mr-2 h-4 w-4" /> ID Card
                </DropdownMenuItem>
              )}
              {!!template && (
                <DropdownMenuItem onClick={() => template()}>
                  <BookTemplate className="mr-2 h-4 w-4" /> Template
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
  }
};
