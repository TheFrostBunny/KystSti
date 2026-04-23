

import { BottomNav } from "@/components/BottomNav";
import { getAllTours } from "@/data/tours";
import { useTranslation } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useTranslation();
  const tours = getAllTours();
  const totalStops = tours.reduce((acc, tour) => acc + tour.stops.length, 0);

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="font-display text-xl font-bold">{t('about.title')}</h1>
      </header>
      <div className="mx-auto max-w-lg p-4 space-y-6">
        <div className="rounded-xl bg-card border p-6 space-y-4">
          <h2 className="font-display text-2xl font-bold">{t('about.appName')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.intro')}
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{tours.length}</div>
              <div className="text-xs text-muted-foreground">{t('about.tours')}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{totalStops}</div>
              <div className="text-xs text-muted-foreground">{t('about.stopsTotal')}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-primary">{t('about.free')}</div>
              <div className="text-xs text-muted-foreground">{t('about.toUse')}</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card border p-6 space-y-3">
          <h2 className="font-display text-lg font-bold">{t('about.howToUse')}</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>{t('about.step1')}</li>
            <li>{t('about.step2')}</li>
            <li>{t('about.step3')}</li>
            <li>{t('about.step4')}</li>
            <li>{t('about.step5')}</li>
            <li>{t('about.step6')}</li>
          </ol>
        </div>

        <div className="rounded-xl bg-card border p-6 space-y-3">
          <h2 className="font-display text-lg font-bold">{t('about.features')}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              {t('about.feature1')}
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              {t('about.feature2')}
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              {t('about.feature3')}
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              {t('about.feature4')}
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              {t('about.feature5')}
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
          <p>{t('about.privacy')}</p>
          <p className="mt-1">{t('about.positionLocal')}</p>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>
            {t('about.madeBy')} {" "}
            <a
              href="https://github.com/TheFrostBunny"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              GitHub
            </a>.
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
