import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { uiText } from "@/data/tourData";
import { tourInfo } from "@/data/Turinfo";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl text-balance">
            {tourInfo.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{tourInfo.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tourInfo.description}</p>

          <div className="mt-8 flex justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tourInfo.totalStops}</div>
              <div className="text-muted-foreground">stopp</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tourInfo.distance}</div>
              <div className="text-muted-foreground">distanse</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tourInfo.estimatedTime}</div>
              <div className="text-muted-foreground">tid</div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-muted/50 border p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{uiText.howItWorksLabel}</p>
            <p className="mt-1">{tourInfo.howItWorks}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="h-14 rounded-xl px-8 text-base font-semibold shadow-lg">
              <Link to="/stopp-liste">{uiText.startButton}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-xl px-8 text-base">
              <Link to="/kart">{uiText.mapButton}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
