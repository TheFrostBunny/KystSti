import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "@/context/LanguageContext";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goBack = () => {
    // Prøver å gå tilbake til forrige side, hvis mulig
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Ellers, gå til forsiden
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t('tour.stopNotFound')}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('tour.stopNotFoundDescription')}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={goBack}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('common.back')}
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            {t('home.title')}
          </Link>
        </div>
      </div>
    </div>
  );
}
