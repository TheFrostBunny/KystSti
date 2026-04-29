import { Outlet, useLocation } from "react-router-dom";
import { Onboarding } from "@/components/Onboarding";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background font-body antialiased">
      <Onboarding />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  );
}
