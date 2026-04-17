import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import type { TourStop } from "@/data/tours";

interface StopManagerProps {
  stops: TourStop[];
  onAdd: (stop: TourStop) => void;
  onUpdate: (index: number, stop: TourStop) => void;
  onDelete: (index: number) => void;
}

export function StopManager({
  stops,
  onAdd,
  onUpdate,
  onDelete,
}: StopManagerProps) {
  const { t } = useTranslation();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<TourStop>>({
    order: stops.length + 1,
    id: "",
    title: "",
    description: "",
    images: [],
    lat: 63.111,
    lng: 7.729,
    locationHint: "",
  });

  const generateStopId = (title: string) => {
    return `stopp-${title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")}`;
  };

  const resetForm = () => {
    setFormData({
      order: stops.length + 1,
      id: "",
      title: "",
      description: "",
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: "",
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      alert("Tittel og beskrivelse er påkrevd");
      return;
    }

    const stop: TourStop = {
      id: generateStopId(formData.title),
      order: formData.order || stops.length + 1,
      title: formData.title,
      description: formData.description,
      images: formData.images || [],
      lat: formData.lat || 63.111,
      lng: formData.lng || 7.729,
      locationHint: formData.locationHint,
    };

    if (editingIndex !== null) {
      onUpdate(editingIndex, stop);
    } else {
      onAdd(stop);
    }
    resetForm();
  };

  const handleEditStop = (index: number) => {
    setFormData(stops[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Add Stop Button */}
      <div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="w-full"
          size="lg"
        >
          + Legg til stopp
        </Button>
      </div>

      {/* Stop List */}
      <AnimatePresence>
        <div className="space-y-3">
          {stops.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Ingen stopp lagt til ennå. Klikk på knappen ovenfor for å legge til det første stoppet.
            </div>
          ) : (
            stops.map((stop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Stopp {stop.order}
                    </p>
                    <h3 className="font-semibold mt-1 truncate">{stop.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {stop.description}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap text-xs text-muted-foreground">
                      <span>📍 {stop.lat}, {stop.lng}</span>
                      {stop.images.length > 0 && (
                        <span>🖼️ {stop.images.length} bilde(r)</span>
                      )}
                      {stop.audioUrl && <span>🎵 Audio</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEditStop(index)}
                      className="px-3 py-1 rounded text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      Rediger
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="px-3 py-1 rounded text-sm bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      Slett
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </AnimatePresence>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-end bg-black/50"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full bg-background rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6">
                <h2 className="font-display text-xl font-bold">
                  {editingIndex !== null ? "Rediger stopp" : "Legg til stopp"}
                </h2>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tittel *</label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Stopp-tittel"
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Beskrivelse *
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Beskrivelse av stoppet..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* Location Hint */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stedshint
                  </label>
                  <input
                    type="text"
                    value={formData.locationHint || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, locationHint: e.target.value })
                    }
                    placeholder="f.eks. Ved siden av rådhuset"
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Images (comma-separated URLs) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bilder (URL-er, atskilt med komma)
                  </label>
                  <textarea
                    value={formData.images?.join(",\n") || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        images: e.target.value
                          .split("\n")
                          .map((url) => url.trim())
                          .filter((url) => url),
                      })
                    }
                    placeholder="https://..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-xs"
                  />
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.lat || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lat: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.lng || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lng: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Audio URL (optional) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lyd-URL (valgfritt)
                  </label>
                  <input
                    type="url"
                    value={formData.audioUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, audioUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1"
                >
                  Avbryt
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  {editingIndex !== null ? "Oppdater" : "Legg til"} stopp
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
