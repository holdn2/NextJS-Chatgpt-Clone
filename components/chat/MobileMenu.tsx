import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

export function MobileMenu() {
  return (
    <div className="md:hidden">
      <Sheet>
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
