import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface MobileDrawerProps {
  triggerText: string;
  title: string;
  children: React.ReactNode;
  desktopContent?: React.ReactNode; // Optional content to display on desktop if different from children
  className?: string; // Class for the desktop wrapper
  sheetContentClassName?: string; // Class for the sheet content
}

export function MobileDrawer({
  triggerText,
  title,
  children,
  desktopContent,
  className,
  sheetContentClassName,
}: MobileDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)"); // md breakpoint
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <div className={className}>
        {desktopContent || children}
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          {triggerText}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className={sheetContentClassName}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 text-sm text-muted-foreground overflow-y-auto pb-8">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
