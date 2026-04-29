import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTour } from "@/context/TourContext";
import { useTranslation } from "@/context/LanguageContext";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Sidebar() {
  const location = useLocation();
  const { currentTourId } = useTour();
  const { t } = useTranslation();

  const navItems = [
    { to: "/", label: t('nav.home'), icon: HomeIcon, exact: true },
    { 
      to: currentTourId ? `/tur/${currentTourId}/stopp` : '/turer', 
      label: t('nav.stops'), 
      icon: RouteIcon,
      matchPaths: ["/tur", "/stopp"]
    },
    { 
      to: currentTourId ? `/tur/${currentTourId}/kart` : '#', 
      label: t('nav.map'), 
      icon: MapIcon,
      disabled: !currentTourId
    },
    { to: "/skann", label: t('nav.scan'), icon: QrCodeIcon },
    { to: "/lage", label: t('nav.createTour'), icon: PlusIcon },
    { to: "/om", label: t('nav.about'), icon: InfoIcon },
  ].filter(item => {
    if (item.label === t('nav.map') && item.disabled) return false;
    if (item.label === t('nav.scan') && import.meta.env.VITE_ENABLE_QR_SCANNER !== "true") return false;
    if (item.label === t('nav.createTour') && import.meta.env.VITE_ENABLE_TOUR_BUILDER !== "true") return false;
    return true;
  });

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <MapIcon className="w-6 h-6" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">KystSti</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact
            ? location.pathname === item.to
            : item.matchPaths
              ? item.matchPaths.some(p => location.pathname === p || location.pathname.startsWith(p + "/"))
              : location.pathname.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                active
                  ? "text-primary bg-primary/5 shadow-sm border border-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                active ? "scale-110" : "group-hover:scale-110"
              )} />
              {item.label}
              {active && (
                <motion.div
                  layoutId="activeSidebarTab"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <ThemeToggle className="w-full justify-between" />
        <div className="rounded-2xl bg-muted/30 border border-dashed p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", currentTourId ? "bg-green-500" : "bg-amber-500")} />
            <span className="text-xs font-medium">
              {currentTourId ? "Tur aktiv" : "Velg en tur"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Icons (reuse from BottomNav if possible, but here for self-containment)
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function RouteIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function QrCodeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
