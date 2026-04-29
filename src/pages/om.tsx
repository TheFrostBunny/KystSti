

import { BottomNav } from "@/components/BottomNav";
import { getAllTours } from "@/data/tours";
import { useTranslation } from "@/context/LanguageContext";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { t } = useTranslation();
  const tours = getAllTours();
  const totalStops = tours.reduce((acc, tour) => acc + tour.stops.length, 0);

  return (
    <PageTransition className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-display text-xl font-bold text-center">{t('about.title')}</h1>
      </header>
      <div className="mx-auto max-w-lg p-4 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border shadow-sm p-6 space-y-6"
        >
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold text-primary">{t('about.appName')}</h2>
            <p className="text-foreground/80 leading-relaxed italic">
              "{t('about.intro')}"
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="font-display text-2xl font-bold text-primary">{tours.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('about.tours')}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="font-display text-2xl font-bold text-primary">{totalStops}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('about.stopsTotal')}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="font-display text-2xl font-bold text-primary">{t('about.free')}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('about.toUse')}</div>
            </div>
          </div>
        </motion.div>

        <div className="rounded-2xl bg-card border shadow-sm p-6 space-y-6">
          <h2 className="font-display text-xl font-bold border-b pb-2">{t('about.howToUse')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
                  {i}
                </div>
                <p className="text-sm text-foreground/80 pt-1 font-medium">{t(`about.step${i}` as any)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border shadow-sm p-6 space-y-4">
          <h2 className="font-display text-xl font-bold">{t('about.features')}</h2>
          <div className="grid grid-cols-1 gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all"
              >
                <div className="bg-primary rounded-full p-1 shadow-sm shadow-primary/20">
                  <CheckIcon className="h-3 w-3 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{t(`about.feature${i}` as any)}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-muted/30 border border-dashed border-muted-foreground/20 p-6 text-center space-y-2">
          <div className="flex justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground/80">{t('about.privacy')}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{t('about.positionLocal')}</p>
        </div>

        <footer className="text-center pt-4 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold text-primary uppercase tracking-widest">
            ❤️ Laget for kysten
          </div>
          <p className="text-xs text-muted-foreground">
            {t('about.madeBy')} {" "}
            <a
              href="https://github.com/TheFrostBunny"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4 decoration-primary/30 hover:text-primary hover:decoration-primary transition-all"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
      <BottomNav />
    </PageTransition>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
