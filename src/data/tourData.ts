// ============================================
// KRISTIANSUND BYVANDRING — ALL KONFIGURASJON
// Rediger denne filen for å tilpasse turen!
// ============================================

// --- STOPP ---
export interface TourStop {
  id: string;
  order: number;
  title: string;
  description: string;
  images: string[];
  lat: number;
  lng: number;
  audioUrl?: string;
  // Valgfri hint som vises for NESTE stopp (når dette stoppet er låst)
  locationHint?: string;
}

export const tourStops: TourStop[] = [
  {
    id: "kirkelandet-kirke",
    order: 1,
    title: "Kirkelandet kirke",
    description:
      "Den ikoniske kirken tegnet av Odd Østbye, innviet i 1964. Kjent for sin dramatiske modernistiske arkitektur og det massive glassmosaikkvindusverket.",
    images: [
      "https://images.unsplash.com/photo-1510861320402-285a6c7639ea?w=800&q=80",
      "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&q=80",
    ],
    lat: 63.1107,
    lng: 7.7278,
    locationHint: "Ved kirken på Kirkelandet",
  },
  {
    id: "mellemvaerftet",
    order: 2,
    title: "Mellemværftet",
    description:
      "Et historisk skipsverft som nå er kulturhus og museum. Her kan du oppleve Kristiansunds maritime arv og klippfiskhistorie.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    ],
    lat: 63.1120,
    lng: 7.7340,
    locationHint: "Ved det gamle verftet på Innlandet",
  },
  {
    id: "sundbaten",
    order: 3,
    title: "Sundbåten",
    description:
      "Verdens eldste offentlige transportmiddel i kontinuerlig drift siden 1876. Sundbåten frakter passasjerer mellom byens øyer.",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    ],
    lat: 63.1098,
    lng: 7.7310,
    locationHint: "Ved Sundbåtbrygga",
  },
  {
    id: "woldbrygga",
    order: 4,
    title: "Woldbrygga",
    description:
      "Den gamle klippfiskbrygga ved havnen. Et levende minne om tiden da Kristiansund var Norges klippfiskhovedstad og eksporterte til hele verden.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    lat: 63.1112,
    lng: 7.7265,
    locationHint: "Ved havnen, nær fiskebrygga",
  },
  {
    id: "innlandet",
    order: 5,
    title: "Innlandet",
    description:
      "Den eldste bydelen i Kristiansund med sjarmerende trehusbebyggelse. Mange av husene er restaurert etter ødeleggelsene i 1940.",
    images: [
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
    ],
    lat: 63.1135,
    lng: 7.7220,
    locationHint: "I den gamle trehusbebyggelsen på Innlandet",
  },
  {
    id: "festiviteten",
    order: 6,
    title: "Festiviteten",
    description:
      "Norges eldste operahus, bygget i jugendstil i 1914. Et kulturelt klenodium som fortsatt brukes til konserter, teater og opera.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
      "https://images.unsplash.com/photo-1577086664693-894d8a9e5c3d?w=800&q=80",
    ],
    lat: 63.1102,
    lng: 7.7295,
    locationHint: "Ved operahuset i sentrum",
  },
];

// --- FARGER FOR KARTET ---
export const mapColors = {
  unlockedPin: "#2d6a4f",
  lockedPin: "#9ca3af",
};

// --- TEKSTER (enkel å oversette) ---
export const uiText = {
  startButton: "Se alle stopp",
  mapButton: "Se kart",
  howItWorksLabel: "📱 Slik fungerer det:",
  stopUnlockedBanner: "✅ Stopp låst opp! Du har skannet QR-koden.",
  nextStopLabel: "Neste stopp:",
  findQrHint: "Finn QR-koden der for å låse opp!",
  lockedLabel: "🔒 Låst",
  scanToUnlock: "Skann QR-koden ved dette stoppet",
  showDistance: "📍 Vis avstand fra meg",
  fetchingLocation: "Henter posisjon…",
  openInMaps: "Åpne i Google Maps →",
  seeDetails: "Se detaljer →",
  backToList: "Tilbake til listen",
  stopNotFound: "Stopp ikke funnet",
  stopNotFoundDesc: "Denne QR-koden er ugyldig eller stoppet er fjernet.",
  unlockedCount: (n: number, total: number) => `${n} av ${total} stopp låst opp`,
  stopLabel: (n: number) => `Stopp ${n}`,
  stopOfTotal: (n: number, total: number) => `Stopp ${n} av ${total}`,
  distanceLabel: (km: number) =>
    km < 1 ? `📍 ${Math.round(km * 1000)} m` : `📍 ${km.toFixed(1)} km`,
};
