import { motion } from "framer-motion";

interface TourNavButtonsProps {
  activeTab: "tour" | "stops" | "export";
  setActiveTab: (tab: "tour" | "stops" | "export") => void;
  prevLabel?: string;
  nextLabel?: string;
}

export function TourNavButtons({ activeTab, setActiveTab, prevLabel = "Forrige", nextLabel = "Neste" }: TourNavButtonsProps) {
  return (
    <div className="flex justify-between pointer-events-auto">
      {activeTab !== "tour" && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setActiveTab(activeTab === "export" ? "stops" : "tour")}
          className="flex items-center gap-1.5 rounded-full bg-card border px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
          </svg>
          {prevLabel}
        </motion.button>
      )}
      <div />
      {activeTab !== "export" && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setActiveTab(activeTab === "tour" ? "stops" : "export")}
          className="flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          {nextLabel}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
