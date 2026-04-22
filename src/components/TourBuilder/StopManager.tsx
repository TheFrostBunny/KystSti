// Adresse-søk komponent på toppnivå
import React from "react";
import { Button } from "@/components/ui/button";

interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export function AddressSearch({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<NominatimResult[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            "User-Agent": "TourApp/1.0 (your@email.com)",
          },
        }
      );

      const data: NominatimResult[] = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
    setLoading(false);
  };

  // Debounce (autosøk etter typing)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        handleSearch(query);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="mb-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Skriv inn adresse eller sted..."
          className="flex-1 px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(query);
            }
          }}
        />
        <Button
          type="button"
          onClick={() => handleSearch(query)}
          disabled={loading || !query}
        >
          {loading ? "Søker..." : "Søk"}
        </Button>
      </div>

      {results.length > 0 && (
        <ul className="bg-muted border rounded-lg mt-1 max-h-48 overflow-y-auto text-xs shadow">
          {results.map((r) => (
            <li
              key={r.place_id}
              className="px-3 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => {
                onSelect(parseFloat(r.lat), parseFloat(r.lon));
                setResults([]);
                setQuery(r.display_name);
              }}
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}

      {loading && results.length === 0 && (
        <div className="text-xs text-muted-foreground mt-1">
          Søker etter adresse...
        </div>
      )}
    </div>
  );
}