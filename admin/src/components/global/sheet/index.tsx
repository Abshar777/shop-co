import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface props {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  closeFn: Function;
  className?: string;
}

export function SheetReuse({
  title,
  description,
  children,
  footer,
  closeFn,
  open,
  className
}: props) {
  return (
    <Sheet open={open} onOpenChange={(open) => !open && closeFn()}>
      <SheetContent className={cn("w-full", className)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>{footer}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
