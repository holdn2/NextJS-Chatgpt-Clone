"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { useSheetStore } from "@/store/sheet";

export function MobileMenu() {
  const open = useSheetStore((state) => state.open);
  const setOpen = useSheetStore((state) => state.setOpen);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="hidden">
            <SheetTitle>모바일 메뉴</SheetTitle>
          </div>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
