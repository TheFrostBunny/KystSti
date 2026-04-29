import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Button from "@/components/ui/button";
import type { TourStop } from "@/data/tours";
import { useTranslation } from "@/context/LanguageContext";
import { MapPreview } from "./MapPreview";
import { getUserPosition } from "@/utils/geolocation";

import QRCode from "react-qr-code";

function StopQRCode({ stopId, index, url }: { stopId: string, index: number, url: string }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <div id={`qr-container-${stopId}`} style={{ background: '#fff', padding: 4, borderRadius: 8 }}>
        <QRCode value={url} size={64} />
      </div>
      <Button
        type="button"
        size="icon"
        variant="outline"
        title="Last ned QR-kode"
        onClick={() => {
          const svg = document.querySelector(`#qr-container-${stopId} svg`);
          if (!svg) return;
          const xml = new XMLSerializer().serializeToString(svg);
          const svg64 = btoa(unescape(encodeURIComponent(xml)));
          const image64 = `data:image/svg+xml;base64,${svg64}`;
          const img = new window.Image();
          img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#fff';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
              const pngUrl = canvas.toDataURL('image/png');
              const a = document.createElement('a');
              a.href = pngUrl;
              a.download = `qr-${stopId || index}.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          };
          img.src = image64;
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3m6 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
        </svg>
      </Button>
    </div>
  );
}

interface StopManagerProps {
  stops: TourStop[];
  tourId: string;
  onAdd: (stop: TourStop) => void;
  onUpdate: (index: number, stop: TourStop) => void;
  onDelete: (index: number) => void;
}

interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

function AddressSearch({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(searchQuery)}`,
        { headers: { "User-Agent": "TourApp/1.0" } }
      );
      const data: NominatimResult[] = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 2) {
              handleSearch(e.target.value);
            }
          }}
          placeholder={t("tourBuilder.form.searchLocationPlaceholder")}
          className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button type="button" size="sm" variant="secondary" onClick={() => handleSearch(query)} disabled={loading}>
          {loading ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          )}
        </Button>
      </div>
      {results.length > 0 && (
        <ul className="bg-card border rounded-lg overflow-hidden shadow-lg">
          {results.map((r) => (
            <li
              key={r.place_id}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors border-b last:border-b-0"
              onClick={() => {
                onSelect(parseFloat(r.lat), parseFloat(r.lon));
                setResults([]);
                setQuery(r.display_name.split(",")[0]);
              }}
            >
              <span className="font-medium">{r.display_name.split(",")[0]}</span>
              <span className="text-muted-foreground text-xs block truncate">{r.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StopForm({
  stop,
  index,
  onSave,
  onCancel,
}: {
  stop?: TourStop;
  index: number;
  onSave: (stop: TourStop) => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<TourStop>>(
    stop || {
      id: "",
      order: index + 1,
      title: { no: "", en: "" },
      description: { no: "", en: "" },
      images: [],
      lat: 63.111,
      lng: 7.729,
      locationHint: { no: "", en: "" },
      audioUrl: "",
    }
  );
  const [imageInput, setImageInput] = useState("");

  const generateId = (title: string) =>
    title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const handleSubmit = () => {
    if (!formData.title?.no || !formData.title?.en) return;
    onSave({
      ...formData,
      id: formData.id || generateId(formData.title.no),
      order: formData.order || index + 1,
      images: formData.images || [],
      locationHint: {
        no: typeof formData.locationHint === 'object' ? formData.locationHint.no : formData.locationHint || "",
        en: typeof formData.locationHint === 'object' ? formData.locationHint.en : "",
      },
    } as TourStop);
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const removeImage = (i: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, idx) => idx !== i) || [],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-xl border bg-card overflow-hidden"
    >
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
            {index + 1}
          </div>
          <h3 className="font-display text-lg font-semibold">
            {stop ? t("tourBuilder.modalEditTitle") : t("tourBuilder.modalTitle")}
          </h3>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">{t("tourBuilder.form.titleLabel")} (NO) *</label>
            <input
              type="text"
              value={formData.title?.no || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: {
                    no: e.target.value,
                    en: typeof prev.title?.en === 'string' ? prev.title.en : "",
                  },
                  id: generateId(e.target.value),
                }))
              }
              placeholder="f.eks. Kirkelandet kirke"
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <label className="block text-sm font-medium mb-1.5 mt-2">{t("tourBuilder.form.titleLabel")} (EN) *</label>
            <input
              type="text"
              value={formData.title?.en || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: {
                    no: typeof prev.title?.no === 'string' ? prev.title.no : "",
                    en: e.target.value,
                  },
                }))
              }
              placeholder="e.g. Kirkelandet Church"
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("tourBuilder.form.descriptionLabel")} (NO) *</label>
            <textarea
              value={formData.description?.no || ""}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                description: {
                  no: e.target.value,
                  en: typeof prev.description?.en === 'string' ? prev.description.en : "",
                },
              }))}
              placeholder={t("tourBuilder.form.descriptionPlaceholder")}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <label className="block text-sm font-medium mb-1.5 mt-2">{t("tourBuilder.form.descriptionLabel")} (EN) *</label>
            <textarea
              value={formData.description?.en || ""}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                description: {
                  no: typeof prev.description?.no === 'string' ? prev.description.no : "",
                  en: e.target.value,
                },
              }))}
              placeholder={t("tourBuilder.form.descriptionPlaceholder")}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("tourBuilder.form.locationHintLabel")} (NO)</label>
            <input
              type="text"
              value={typeof formData.locationHint === 'object' ? formData.locationHint.no : formData.locationHint || ""}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                locationHint: {
                  no: e.target.value,
                  en: typeof prev.locationHint === 'object' ? prev.locationHint.en : "",
                },
              }))}
              placeholder={t("tourBuilder.form.locationHintPlaceholder")}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <label className="block text-sm font-medium mb-1.5 mt-2">{t("tourBuilder.form.locationHintLabel")} (EN)</label>
            <input
              type="text"
              value={typeof formData.locationHint === 'object' ? formData.locationHint.en : ""}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                locationHint: {
                  no: typeof prev.locationHint === 'object' ? prev.locationHint.no : prev.locationHint || "",
                  en: e.target.value,
                },
              }))}
              placeholder={t("tourBuilder.form.locationHintPlaceholder")}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("tourBuilder.form.positionLabel")}</label>
            <AddressSearch
              onSelect={(lat, lng) => setFormData((prev) => ({ ...prev, lat, lng }))}
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{t("tourBuilder.form.mapLatLabel")}:</span>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lat || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lat: parseFloat(e.target.value) }))}
                  className="flex-1 px-2 py-1.5 rounded border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{t("tourBuilder.form.mapLngLabel")}:</span>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lng || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lng: parseFloat(e.target.value) }))}
                  className="flex-1 px-2 py-1.5 rounded border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            {/* Kartforhåndsvisning for valgt posisjon */}
            {formData.lat && formData.lng && (
              <div className="mt-3 rounded-xl overflow-hidden border shadow-sm">
                <MapPreview 
                  lat={formData.lat} 
                  lng={formData.lng} 
                  zoom={16} 
                  onSelectPosition={(lat, lng) => setFormData((prev) => ({ ...prev, lat: parseFloat(lat.toFixed(5)), lng: parseFloat(lng.toFixed(5)) }))}
                  showAddress={true}
                />
                <div className="text-xs text-muted-foreground p-2 bg-muted/50 flex justify-between items-center">
                  <span>Klikk på kartet for å flytte stoppet</span>
                  <span className="font-mono text-xs">{formData.lat.toFixed(5)}, {formData.lng.toFixed(5)}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("tourBuilder.form.imagesLabel")}</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              />
              <Button type="button" size="sm" variant="secondary" onClick={addImage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </Button>
            </div>
            {formData.images && formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt="" className="h-16 w-16 rounded-lg object-cover border" crossOrigin="anonymous" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">{t("tourBuilder.form.audioUrlLabel")}</label>
            <input
              type="url"
              value={formData.audioUrl || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, audioUrl: e.target.value }))}
              placeholder={t("tourBuilder.form.audioUrlPlaceholder")}
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSubmit} disabled={!formData.title} className="flex-1">
            {stop ? t("common.saveChanges") : t("common.addStop")}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function StopManager({ stops, tourId, onAdd, onUpdate, onDelete }: StopManagerProps) {
  const { t } = useTranslation();
  if (!tourId) {
    return (
      <div className="p-4 border rounded-xl bg-card text-center text-destructive">
        <div className="font-semibold mb-2">{t("tourBuilder.missingTitle")}</div>
        <div className="text-sm text-muted-foreground">{t("tourBuilder.goToTourDetails")}</div>
      </div>
    );
  }
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem("tourbuilder-stops", JSON.stringify(stops));
  }, [stops]);

  useEffect(() => {
    if ((!stops || stops.length === 0) && typeof window !== "undefined") {
      const saved = localStorage.getItem("tourbuilder-stops");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            parsed.forEach((stop: TourStop) => onAdd(stop));
          }
        } catch {}
      }
    }
  }, []);

  const handleAdd = (stop: TourStop) => {
    onAdd(stop);
    setIsAdding(false);
  };

  const handleUpdate = (index: number, stop: TourStop) => {
    onUpdate(index, stop);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold">Stopp</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {stops.length === 0
              ? t("tourBuilder.addFirstStopHelper")
              : `${stops.length} ${t("tourBuilder.stops")} i turen`}
          </p>
        </div>
        {!isAdding && editingIndex === null && (
          <Button onClick={() => setIsAdding(true)} size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1.5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            {t("tourBuilder.addStop")}
          </Button>
        )}
      </div>

      {/* Empty state */}
      {stops.length === 0 && !isAdding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border-2 border-dashed p-8 text-center"
        >
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <h3 className="font-medium">{t("tourBuilder.noStopsYet")}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t("tourBuilder.addFirstStopHelper")}
          </p>
          <Button onClick={() => setIsAdding(true)} size="sm" className="mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1.5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            {t("tourBuilder.addFirstStop")}
          </Button>
        </motion.div>
      )}

      {/* Stop list */}
      <AnimatePresence mode="popLayout">
        {stops.map((stop, index) => (
          <motion.div
            key={stop.id || index}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {editingIndex === index ? (
              <StopForm
                stop={stop}
                index={index}
                onSave={(s) => handleUpdate(index, s)}
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <div className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow group">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{typeof stop.title === 'object' ? stop.title.no : stop.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                      {typeof stop.description === 'object' ? stop.description.no : stop.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                          <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                        </svg>
                        {stop.lat.toFixed(3)}, {stop.lng.toFixed(3)}
                      </span>
                      {stop.images.length > 0 && (
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                            <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0L3.5 9.5V4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v5.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                          </svg>
                          {stop.images.length} bilder
                        </span>
                      )}
                      {stop.audioUrl && (
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                            <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                          </svg>
                          Audio
                        </span>
                      )}
                    </div>
                    {(stop.id || tourId) && (
                      <StopQRCode
                        stopId={stop.id || tourId}
                        index={index}
                        url={window.location.origin + "/tur/" + tourId + "/stopp/" + (stop.id || tourId)}
                      />
                    )}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingIndex(index)}
                      className="h-8 w-8 p-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                        <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                        <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(index)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add form */}
      <AnimatePresence>
        {isAdding && (
          <StopForm
            index={stops.length}
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        )}
      </AnimatePresence>

      {stops.length > 0 && !isAdding && editingIndex === null && (
        <Button
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full border-dashed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1.5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Legg til flere stopp
        </Button>
      )}
    </div>
  );
}