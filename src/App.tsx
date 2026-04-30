import { Outlet, useLocation } from "react-router-dom";
import { Onboarding } from "@/components/Onboarding";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation(); // Keep for potential future use
  
  return (
    <div className="h-screen bg-background font-body antialiased flex flex-col md:flex-row">
      <Onboarding />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
