import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";

interface StartTourButtonProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

export function StartTourButton({ to, children = "Start Turen", className = "" }: StartTourButtonProps) {
  return (
    <Button asChild size="lg" className={`h-12 sm:h-14 rounded-xl px-6 sm:px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      <Link to={to}>{children}</Link>
    </Button>
  );
}
