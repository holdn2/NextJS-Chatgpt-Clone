"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSheetStore } from "@/store/sheet";
import React from "react";

export function MobileMenu({ children }: { children: React.ReactNode }) {
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
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
