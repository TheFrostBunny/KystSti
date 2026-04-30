export interface TourStop {
  id: string;
  order: number;
  title: {
    no: string;
    en: string;
  };
  description: {
    no: string;
    en: string;
  };
  images: string[];
  lat: number;
  lng: number;
  audioUrl?: string;
  locationHint?: {
    no: string;
    en: string;
  };
}

export interface Tour {
  id: string;
  title: {
    no: string;
    en: string;
  };
  subtitle: {
    no: string;
    en: string;
  };
  description: {
    no: string;
    en: string;
  };
  howItWorks: {
    no: string;
    en: string;
  };
  estimatedTime: {
    no: string;
    en: string;
  };
  distance: string;
  difficulty: "lett" | "moderat" | "krevende";
  coverImage: string;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  stops: TourStop[];
}
