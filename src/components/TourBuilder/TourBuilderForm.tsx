import { useTranslation } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/data/tours";

interface TourBuilderFormProps {
  tourData: Partial<Tour>;
  onChange: (updates: Partial<Tour>) => void;
}

export function TourBuilderForm({ tourData, onChange }: TourBuilderFormProps) {
  const { t } = useTranslation();

  const generateId = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const handleTitleChange = (title: string) => {
    onChange({
      title,
      id: generateId(title),
    });
  };

  return (
    <div className="space-y-6">
      {/* Tour ID Preview */}
      <div className="rounded-lg bg-muted/50 border p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Tour ID (Auto-generert)
        </p>
        <p className="mt-2 font-mono text-sm font-medium break-all">
          {tourData.id || "din-tur-id"}
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Tittel *</label>
        <input
          type="text"
          value={tourData.title || ""}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="f.eks. Kristiansund Byvandring"
          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium mb-2">Undertittel *</label>
        <input
          type="text"
          value={tourData.subtitle || ""}
          onChange={(e) =>
            onChange({ subtitle: e.target.value })
          }
          placeholder="f.eks. Opplev byen mellom havene"
          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Beskrivelse *</label>
        <textarea
          value={tourData.description || ""}
          onChange={(e) =>
            onChange({ description: e.target.value })
          }
          placeholder="Detaljert beskrivelse av turen..."
          rows={4}
          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* How It Works */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Hvordan fungerer det? *
        </label>
        <textarea
          value={tourData.howItWorks || ""}
          onChange={(e) =>
            onChange({ howItWorks: e.target.value })
          }
          placeholder="Instruksjoner for hvordan brukere skal bruke turen..."
          rows={3}
          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* Estimated Time */}
      <div>
        <label className="block text-sm font-medium mb-2">Estimert tid *</label>
        <input
          type="text"
          value={tourData.estimatedTime || ""}
          onChange={(e) =>
            onChange({ estimatedTime: e.target.value })
          }
          placeholder="f.eks. 1-1.5 timer"
          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Distance */}
      <div>
        <label className="block text-sm font-medium mb-2">Avstand *</label>
        <input
          type="text"
          value={tourData.distance || ""}
          onChange={(e) =>
            onChange({ distance: e.target.value })
          }
          placeholder="f.eks. 2.5 km"
          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium mb-2">Vanskelighetsgrad *</label>
        <div className="grid grid-cols-3 gap-2">
          {(["lett", "moderat", "krevende"] as const).map((level) => (
            <button
              key={level}
              onClick={() => onChange({ difficulty: level })}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                tourData.difficulty === level
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium mb-2">Cover image URL *</label>
        <input
          type="url"
          value={tourData.coverImage || ""}
          onChange={(e) =>
            onChange({ coverImage: e.target.value })
          }
          placeholder="https://..."
          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {tourData.coverImage && (
          <div className="mt-3 rounded-lg overflow-hidden h-32">
            <img
              src={tourData.coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        )}
      </div>

      {/* Map Center */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Map Latitude *</label>
          <input
            type="number"
            step="0.0001"
            value={tourData.mapCenter?.lat || ""}
            onChange={(e) =>
              onChange({
                mapCenter: {
                  ...tourData.mapCenter!,
                  lat: parseFloat(e.target.value),
                },
              })
            }
            placeholder="63.111"
            className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Map Longitude *</label>
          <input
            type="number"
            step="0.0001"
            value={tourData.mapCenter?.lng || ""}
            onChange={(e) =>
              onChange({
                mapCenter: {
                  ...tourData.mapCenter!,
                  lng: parseFloat(e.target.value),
                },
              })
            }
            placeholder="7.729"
            className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Map Zoom */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Map Zoom Level ({tourData.mapZoom || 15})
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={tourData.mapZoom || 15}
          onChange={(e) =>
            onChange({ mapZoom: parseInt(e.target.value) })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
