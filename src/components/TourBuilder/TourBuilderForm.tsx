import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { MapPreview } from "./MapPreview";
import { getUserPosition } from "@/utils/geolocation";

// Helper components
interface TourBuilderFormProps {
  tourData: any;
  onChange: (updates: any) => void;
}

function FormSection({
  title,
  description,
  children,
  icon,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-4 sm:p-6"
    >
      <div className="flex items-start gap-3 mb-4">
        {icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function InputField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}
export function TourBuilderForm({ tourData, onChange }: TourBuilderFormProps) {
  const { t } = useTranslation();
  const [latError, setLatError] = useState<string | null>(null);
  const [lngError, setLngError] = useState<string | null>(null);
  const mapRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("tourbuilder-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          onChange(parsed);
        }
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tourbuilder-data", JSON.stringify(tourData));
  }, [tourData]);

  const setUserLocation = () => {
    getUserPosition()
      .then((position) => {
        onChange({
          mapCenter: {
            lat: position.lat,
            lng: position.lng,
          },
        });
      })
      .catch((error) => {
        alert(`Feil ved henting av posisjon: ${error.message}`);
      });
  };
  const generateId = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };
  const handleTitleChange = (lang: "no" | "en", value: string) => {
    onChange({
      title: {
        no: tourData.title?.no || "",
        en: tourData.title?.en || "",
        [lang]: value,
      },
      id: generateId(value),
    });
  };
  const inputClasses =
    "w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow";
  const textareaClasses =
    "w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-shadow";

  return (
    <div className="space-y-4">
      {/* Tour ID Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-muted/50 border p-4 flex items-center gap-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-muted-foreground">
            <path fillRule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {t('tourBuilder.tourId')} ({t('tourBuilder.generatedAutomatically')})
          </p>
          <p className="font-mono text-sm font-medium truncate mt-0.5">
            {tourData.id || t('tourBuilder.yourTourId')}
          </p>
        </div>
      </motion.div>

      {/* Basic Info */}
      <FormSection
        title={t('tourBuilder.basicInfo')}
        description={t('tourBuilder.basicInfoDescription')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path d="M8 2a.75.75 0 0 1 .75.75v1.69l2.22-2.22a.75.75 0 0 1 1.06 1.06L9.81 5.5h1.69a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h1.69L2.22 3.28a.75.75 0 0 1 1.06-1.06l2.22 2.22V2.75A.75.75 0 0 1 8 2ZM2 9.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.25ZM2.75 12a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" />
          </svg>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label={t('tourBuilder.title') + ' (NO)'} required>
              <input
                type="text"
                value={tourData.title?.no || ""}
                onChange={(e) => handleTitleChange("no", e.target.value)}
                placeholder={t('tourBuilder.titlePlaceholder')}
                className={inputClasses}
              />
            </InputField>
            <InputField label={t('tourBuilder.title') + ' (EN)'} required>
              <input
                type="text"
                value={tourData.title?.en || ""}
                onChange={(e) => handleTitleChange("en", e.target.value)}
                placeholder={t('tourBuilder.titlePlaceholder')}
                className={inputClasses}
              />
            </InputField>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label={t('tourBuilder.subtitle') + ' (NO)'}>
              <input
                type="text"
                value={tourData.subtitle?.no || ""}
                onChange={(e) => onChange({ subtitle: { no: e.target.value, en: tourData.subtitle?.en || "" } })}
                placeholder={t('tourBuilder.subtitlePlaceholder')}
                className={inputClasses}
              />
            </InputField>
            <InputField label={t('tourBuilder.subtitle') + ' (EN)'}>
              <input
                type="text"
                value={tourData.subtitle?.en || ""}
                onChange={(e) => onChange({ subtitle: { no: tourData.subtitle?.no || "", en: e.target.value } })}
                placeholder={t('tourBuilder.subtitlePlaceholder')}
                className={inputClasses}
              />
            </InputField>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label={t('tourBuilder.description') + ' (NO)'}>
              <textarea
                value={tourData.description?.no || ""}
                onChange={(e) => onChange({ description: { no: e.target.value, en: tourData.description?.en || "" } })}
                placeholder={t('tourBuilder.descriptionPlaceholder')}
                rows={3}
                className={textareaClasses}
              />
            </InputField>
            <InputField label={t('tourBuilder.description') + ' (EN)'}>
              <textarea
                value={tourData.description?.en || ""}
                onChange={(e) => onChange({ description: { no: tourData.description?.no || "", en: e.target.value } })}
                placeholder={t('tourBuilder.descriptionPlaceholder')}
                rows={3}
                className={textareaClasses}
              />
            </InputField>
          </div>
        </div>
      </FormSection>

      {/* Instructions */}
      <FormSection
        title={t('tourBuilder.instructions')}
        description={t('tourBuilder.instructionsDescription')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
          </svg>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label={t('tourBuilder.howItWorks') + ' (NO)'}>
            <textarea
              value={tourData.howItWorks?.no || ""}
              onChange={(e) => onChange({ howItWorks: { no: e.target.value, en: tourData.howItWorks?.en || "" } })}
              placeholder={t('tourBuilder.howItWorksPlaceholder')}
              rows={2}
              className={textareaClasses}
            />
          </InputField>
          <InputField label={t('tourBuilder.howItWorks') + ' (EN)'}>
            <textarea
              value={tourData.howItWorks?.en || ""}
              onChange={(e) => onChange({ howItWorks: { no: tourData.howItWorks?.no || "", en: e.target.value } })}
              placeholder={t('tourBuilder.howItWorksPlaceholder')}
              rows={2}
              className={textareaClasses}
            />
          </InputField>
        </div>
      </FormSection>

      {/* Tour Details */}
      <FormSection
        title={t('tourBuilder.tourDetails')}
        description={t('tourBuilder.tourDetailsDescription')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568l.258 1.022c.118.47.478.83.948.948l1.022.258a.75.75 0 0 1 0 1.456l-1.022.258a1.25 1.25 0 0 0-.948.948l-.258 1.022a.75.75 0 0 1-1.456 0l-.258-1.022a1.25 1.25 0 0 0-.948-.948l-1.022-.258a.75.75 0 0 1 0-1.456l1.022-.258a1.25 1.25 0 0 0 .948-.948l.258-1.022A.75.75 0 0 1 10 11Z" clipRule="evenodd" />
          </svg>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label={t('tourBuilder.estimatedTime') + ' (NO)'}>
            <input
              type="text"
              value={tourData.estimatedTime?.no || ""}
              onChange={(e) => onChange({ estimatedTime: { no: e.target.value, en: tourData.estimatedTime?.en || "" } })}
              placeholder={t('tourBuilder.estimatedTimePlaceholder')}
              className={inputClasses}
            />
          </InputField>
          <InputField label={t('tourBuilder.estimatedTime') + ' (EN)'}>
            <input
              type="text"
              value={tourData.estimatedTime?.en || ""}
              onChange={(e) => onChange({ estimatedTime: { no: tourData.estimatedTime?.no || "", en: e.target.value } })}
              placeholder={t('tourBuilder.estimatedTimePlaceholder')}
              className={inputClasses}
            />
          </InputField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          <InputField label={t('tourBuilder.distance')}>
            <input
              type="text"
              value={tourData.distance || ""}
              onChange={(e) => onChange({ distance: e.target.value })}
              placeholder={t('tourBuilder.distancePlaceholder')}
              className={inputClasses}
            />
          </InputField>
          <InputField label={t('tourBuilder.difficulty')}>
            <div className="grid grid-cols-3 gap-2">
              {(["lett", "moderat", "krevende"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onChange({ difficulty: level })}
                  className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    tourData.difficulty === level
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    {level === "lett" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10.9 12.006c.11.542-.348.994-.9.994H2c-.553 0-1.01-.452-.902-.994a5.002 5.002 0 0 1 9.803 0ZM14.002 12h-1.59a2.556 2.556 0 0 0-.04-.29 6.476 6.476 0 0 0-1.167-2.603 3.002 3.002 0 0 1 3.633 1.911c.18.522-.283.982-.836.982ZM12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      </svg>
                    )}
                    {level === "moderat" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M8.074.945A4.993 4.993 0 0 0 6 5v.032c.004.6.114 1.176.311 1.709.16.428-.204.91-.61.7a5.023 5.023 0 0 1-1.868-1.677c-.202-.304-.648-.363-.848-.058a6 6 0 1 0 10.399-1.06c-.229-.29-.688-.26-.863.052a5.019 5.019 0 0 1-1.735 1.757c-.39.202-.751-.279-.588-.703.186-.483.3-.986.342-1.505a5.018 5.018 0 0 0-.073-1.146A4.993 4.993 0 0 0 8.074.945ZM8 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      </svg>
                    )}
                    {level === "krevende" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.134 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                      </svg>
                    )}
                    {t(`tourBuilder.difficultyLevels.${level}`)}
                  </span>
                </button>
              ))}
            </div>
          </InputField>
        </div>
      </FormSection>

      {/* Cover Image */}
      <FormSection
        title={t('tourBuilder.coverImage')}
        description={t('tourBuilder.coverImageDescription')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0L3.5 9.5V4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v5.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
          </svg>
        }
      >
        <InputField label={t('tourBuilder.coverImageUrl')} required hint={t('tourBuilder.coverImageHint')}>
          <input
            type="url"
            value={tourData.coverImage || ""}
            onChange={(e) => onChange({ coverImage: e.target.value })}
            placeholder={t('tourBuilder.coverImagePlaceholder')}
            className={inputClasses}
          />
        </InputField>
        {tourData.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 rounded-xl overflow-hidden border"
          >
            <img
              src={tourData.coverImage}
              alt="Cover preview"
              className="w-full h-40 object-cover"
              crossOrigin="anonymous"
            />
          </motion.div>
        )}
      </FormSection>

      {/* Map Settings */}
      <FormSection
        title={t('tourBuilder.mapSettings')}
        description={t('tourBuilder.mapSettingsDescription')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
          </svg>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label={t('tourBuilder.latitude')} required hint={t('tourBuilder.latitudeHint')}>
            <input
              type="number"
              step="0.0001"
              value={tourData.mapCenter?.lat || ""}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (isNaN(val) || val < -90 || val > 90) {
                  setLatError(t('tourBuilder.invalidLatitude'));
                } else {
                  setLatError(null);
                  onChange({
                    mapCenter: {
                      ...tourData.mapCenter!,
                      lat: val,
                    },
                  });
                }
              }}
              placeholder="63.111"
              className={inputClasses + (latError ? " border-destructive" : "")}
            />
            {latError && <div className="text-xs text-destructive mt-1">{latError}</div>}
          </InputField>
          <InputField label={t('tourBuilder.longitude')} required hint={t('tourBuilder.longitudeHint')}>
            <input
              type="number"
              step="0.0001"
              value={tourData.mapCenter?.lng || ""}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (isNaN(val) || val < -180 || val > 180) {
                  setLngError(t('tourBuilder.invalidLongitude'));
                } else {
                  setLngError(null);
                  onChange({
                    mapCenter: {
                      ...tourData.mapCenter!,
                      lng: val,
                    },
                  });
                }
              }}
              placeholder="7.729"
              className={inputClasses + (lngError ? " border-destructive" : "")}
            />
            {lngError && <div className="text-xs text-destructive mt-1">{lngError}</div>}
          </InputField>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="px-3 py-2 rounded-lg border bg-muted text-xs hover:bg-primary/10"
            onClick={setUserLocation}
          >
            Bruk min posisjon
          </button>
        </div>
        {/* Kartforhåndsvisning med interaktivt kart */}
        {tourData.mapCenter?.lat && tourData.mapCenter?.lng && (
          <div className="mt-4 border rounded-xl overflow-hidden shadow-sm">
            <MapPreview 
              lat={tourData.mapCenter.lat} 
              lng={tourData.mapCenter.lng} 
              zoom={tourData.mapZoom || 15}
              onSelectPosition={(lat, lng) => {
                onChange({
                  mapCenter: {
                    lat: parseFloat(lat.toFixed(5)),
                    lng: parseFloat(lng.toFixed(5)),
                  },
                });
              }}
              showAddress={true}
            />
            <div className="text-xs text-muted-foreground p-2 bg-muted/50 flex justify-between items-center">
              <span>Klikk på kartet for å flytte sentrum</span>
              <span className="font-mono text-xs">{tourData.mapCenter.lat.toFixed(5)}, {tourData.mapCenter.lng.toFixed(5)}</span>
            </div>
          </div>
        )}

        <div className="mt-4">
          <InputField label={t('tourBuilder.zoomLevel', { zoom: tourData.mapZoom || 15 })} hint={t('tourBuilder.zoomLevelHint')}>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">1</span>
              <input
                type="range"
                min="1"
                max="20"
                value={tourData.mapZoom || 15}
                onChange={(e) => onChange({ mapZoom: parseInt(e.target.value) })}
                className="flex-1 accent-primary"
              />
              <span className="text-xs text-muted-foreground">20</span>
            </div>
          </InputField>
        </div>
      </FormSection>
    </div>
  );
}