// ============================================
// KYSTSTI — TUR TYPER
// Definisjoner for turer og stopp
// ============================================

export interface TourStop {
  id: string;
  order: number;
  title: string;
  description: string;
  images: string[];
  lat: number;
  lng: number;
  audioUrl?: string;
  locationHint?: string;
}

export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  howItWorks: string;
  estimatedTime: string;
  distance: string;
  difficulty: "lett" | "moderat" | "krevende";
  coverImage: string;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  stops: TourStop[];
}
