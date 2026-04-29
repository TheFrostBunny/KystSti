import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
