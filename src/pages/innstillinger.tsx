import React, { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TourSelector } from "@/components/TourSelector";
import { useTranslation } from "@/context/LanguageContext";
import { useTour } from "@/context/TourContext";
import { getAllTours } from "@/data/tours";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { getProgress, currentTour } = useTour();
  const [progressReset, setProgressReset] = useState(false);
  const [dataCleared, setDataCleared] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const tours = getAllTours();
  const totalStops = tours.reduce((acc, tour) => acc + tour.stops.length, 0);
  const progress = getProgress();

  const handleResetProgress = () => {
    localStorage.removeItem("kyststi-unlocked-stops");
    setProgressReset(true);
    setTimeout(() => window.location.reload(), 1200);
  };

  const handleClearAllData = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    Object.keys(localStorage)
      .filter(k => k.startsWith("kyststi"))
      .forEach(k => localStorage.removeItem(k));
    setDataCleared(true);
    setTimeout(() => window.location.reload(), 1200);
  };

  return (
    <PageTransition className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-display text-xl font-bold text-center">
          {t("settings.title")}
        </h1>
      </header>

      <div className="mx-auto max-w-lg p-4 space-y-6">
        {/* ── Tour Selection Section ──────────────────────────────── */}
        <Section
          icon={<MapIcon className="w-5 h-5 text-primary" />}
          title={t("settings.tourSelection")}
        >
          <div className="py-2">
            <TourSelector />
          </div>
        </Section>

        {/* ── Appearance & Language Settings ──────────────────────── */}
        <div className="grid grid-cols-1 gap-4">
          <Section
            icon={<PaletteIcon className="w-5 h-5 text-primary" />}
            title={t("settings.appearance")}
          >
            <SettingRow label={t("settings.theme")}>
              <ThemeToggle />
            </SettingRow>
          </Section>

          <Section
            icon={<GlobeIcon className="w-5 h-5 text-primary" />}
            title={t("settings.language")}
          >
            <SettingRow label={t("settings.appLanguage")}>
              <LanguageSwitcher />
            </SettingRow>
          </Section>
        </div>

        {/* ── About App Information ────────────────────────────── */}
        <Section
          icon={<InfoIcon className="w-5 h-5 text-primary" />}
          title={t("settings.about")}
        >
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-primary">{t('about.appName')}</h3>
              <p className="text-xs text-foreground/70 leading-relaxed italic">
                "{t('about.intro')}"
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="text-center p-2 rounded-xl bg-primary/5 border border-primary/10">
                <div className="font-display text-lg font-bold text-primary">{tours.length}</div>
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">{t('about.tours')}</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-primary/5 border border-primary/10">
                <div className="font-display text-lg font-bold text-primary">{totalStops}</div>
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">{t('about.stopsTotal')}</div>
              </div>
              <div className="text-center p-2 rounded-xl bg-primary/5 border border-primary/10">
                <div className="font-display text-lg font-bold text-primary">{t('about.free')}</div>
                <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">{t('about.toUse')}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('about.howToUse')}</h4>
              <div className="grid grid-cols-1 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold">
                      {i}
                    </div>
                    <p className="text-xs text-foreground/80 pt-0.5 font-medium">{t(`about.step${i}` as any)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/40 space-y-3">
            <AboutRow label={t("settings.version")} value="1.0.0" />
            <div className="flex items-center justify-between py-1 px-1">
              <span className="text-xs text-muted-foreground">{t("settings.sourceCode")}</span>
              <a
                href="https://github.com/TheFrostBunny/KystSti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
        </Section>

        {/* ── User Progress & Tour Stats ───────────────────────────── */}
        <Section
          icon={<TrophyIcon className="w-5 h-5 text-primary" />}
          title={t("settings.progress")}
        >
          {currentTour && (
            <div className="flex items-center justify-between py-2 px-1">
              <div className="min-w-0 flex-1 mr-4">
                <p className="text-sm font-medium truncate">
                  {typeof currentTour.title === "object"
                    ? currentTour.title?.no ?? currentTour.title?.en ?? "Tour"
                    : currentTour.title ?? "Tour"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {progress.unlocked} / {progress.total} {t("common.stops")} {t("common.completed")}
                </p>
              </div>
              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden shrink-0">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${progress.total > 0 ? Math.round((progress.unlocked / progress.total) * 100) : 0}%`,
                  }}
                />
              </div>
            </div>
          )}
          <SettingRow label={t("settings.resetProgress")} description={t("settings.resetProgressDesc")}>
            <ActionButton
              onClick={handleResetProgress}
              variant="warning"
              done={progressReset}
              doneLabel={t("settings.resetDone")}
            >
              {t("settings.reset")}
            </ActionButton>
          </SettingRow>
        </Section>

        {/* ── Data Management & Privacy ─────────────────────────────── */}
        <Section
          icon={<DatabaseIcon className="w-5 h-5 text-primary" />}
          title={t("settings.data")}
        >
          <SettingRow label={t("settings.clearData")} description={t("settings.clearDataDesc")}>
            <ActionButton
              onClick={handleClearAllData}
              variant="danger"
              done={dataCleared}
              doneLabel={t("settings.clearDone")}
            >
              {confirmClear ? t("settings.confirmClear") : t("settings.clear")}
            </ActionButton>
          </SettingRow>
          <AnimatePresence>
            {confirmClear && !dataCleared && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-destructive px-1 pb-1"
              >
                {t("settings.clearWarning")}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="mt-2 p-3 rounded-xl bg-muted/30 border border-dashed border-muted-foreground/20 text-center">
            <p className="text-[10px] font-medium text-foreground/70 leading-relaxed">
              {t('about.privacy')} {t('about.positionLocal')}
            </p>
          </div>
        </Section>

        <div className="pt-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest">
            ❤️ {t("settings.madeForCoast")}
          </span>
        </div>
      </div>
    </PageTransition>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card border shadow-sm"
    >
      <div className="flex items-center gap-2.5 px-5 py-3 border-b bg-muted/10 rounded-t-2xl">
        {icon}
        <h2 className="font-display text-[10px] font-bold uppercase tracking-wider text-foreground/60">
          {title}
        </h2>
      </div>
      <div className="px-5 py-3 space-y-1 rounded-b-2xl">{children}</div>
    </motion.div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-border/40 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{label}</p>
        {description && (
          <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function AboutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0 px-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold">{value}</span>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  variant,
  done,
  doneLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "warning" | "danger";
  done: boolean;
  doneLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={done}
      className={cn(
        "border-0 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
        done
          ? "bg-green-500/10 text-green-600 cursor-default"
          : variant === "danger"
          ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
          : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
      )}
    >
      {done ? doneLabel : children}
    </button>
  );
}

/* ── Icons ──────────────────────────────────────────────────── */

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" />
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

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
