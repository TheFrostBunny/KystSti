// ============================================
// KYSTSTI — TURER OG STOPP
// Støtter flere turer med egne stopp
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

// --- ALLE TURER ---
export const tours: Tour[] = [
  {
    id: "kristiansund-byvandring",
    title: "Kristiansund Byvandring",
    subtitle: "Opplev byen mellom havene",
    description:
      "Utforsk Kristiansunds unike historie og arkitektur på denne guidede byvandringen. Skann QR-kodene du finner ved hvert stopp for å låse opp historier, bilder og mer.",
    howItWorks:
      "Finn QR-kodene ved hvert stopp rundt i Kristiansund. Skann dem med telefonen for å låse opp historier, bilder og mer!",
    estimatedTime: "1-1.5 timer",
    distance: "2.5 km",
    difficulty: "lett",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    mapCenter: { lat: 63.111, lng: 7.729 },
    mapZoom: 15,
    stops: [
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
        audioUrl: "/audio/kirkelandet-kirke.mp3",
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
        lat: 63.112,
        lng: 7.734,
        locationHint: "Ved det gamle verftet på Innlandet",
        audioUrl: "/audio/mellemvaerftet.mp3",
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
        lng: 7.731,
        locationHint: "Ved Sundbåtbrygga",
        audioUrl: "/audio/sundbaten.mp3",
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
        audioUrl: "/audio/woldbrygga.mp3",
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
        lng: 7.722,
        locationHint: "I den gamle trehusbebyggelsen på Innlandet",
        audioUrl: "/audio/innlandet.mp3",
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
        audioUrl: "/audio/festiviteten.mp3",
      },
    ],
  },
  {
    id: "kyststi-nordlandet",
    title: "Kyststi Nordlandet",
    subtitle: "Naturopplevelser ved havet",
    description:
      "En vakker kyststi langs Nordlandet med fantastisk utsikt over Nordmørskysten. Opplev dramatisk kystlandskap og lokal flora og fauna.",
    howItWorks:
      "Følg stien langs kysten og skann QR-kodene ved hvert utsiktspunkt for å lære mer om naturen og historien.",
    estimatedTime: "2-3 timer",
    distance: "5 km",
    difficulty: "moderat",
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    mapCenter: { lat: 63.125, lng: 7.71 },
    mapZoom: 14,
    stops: [
      {
        id: "nordlandet-start",
        order: 1,
        title: "Startpunkt Nordlandet",
        description:
          "Her starter kyststien. Du vil oppleve spektakulære utsikter og variert natur langs hele ruten.",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        ],
        lat: 63.12,
        lng: 7.72,
        locationHint: "Ved parkeringsplassen på Nordlandet",
        audioUrl: "/audio/nordlandet-start.mp3",
      },
      {
        id: "utsiktspunkt-vest",
        order: 2,
        title: "Utsiktspunkt Vest",
        description:
          "Herfra har du panoramautsikt over havet og de ytterste øyene. På klare dager kan du se helt til Smøla.",
        images: [
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
        ],
        lat: 63.125,
        lng: 7.705,
        locationHint: "På toppen av klippen mot vest",
        audioUrl: "/audio/utsiktspunkt-vest.mp3",
      },
      {
        id: "fuglereiret",
        order: 3,
        title: "Fuglereiret",
        description:
          "Et populært sted for fuglekikking. Her hekker flere sjøfuglarter, inkludert teist og tjeld.",
        images: [
          "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80",
        ],
        lat: 63.128,
        lng: 7.7,
        locationHint: "Ved fugletårnet langs stien",
        audioUrl: "/audio/fuglereiret.mp3",
      },
      {
        id: "gammel-fiskeplass",
        order: 4,
        title: "Gammel Fiskeplass",
        description:
          "Historisk fiskeplass hvor lokale fiskere tørket fisk i generasjoner. Ruiner av gamle naust kan fortsatt ses.",
        images: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        ],
        lat: 63.13,
        lng: 7.695,
        locationHint: "Ved den gamle naustvollen",
        audioUrl: "/audio/gammel-fiskeplass.mp3",
      },
    ],
  },
  {
    id: "atlanterhavsvegen",
    title: "Atlanterhavsvegen Oppdagelse",
    subtitle: "Verdens vakreste veistrekning",
    description:
      "Opplev den verdensberømte Atlanterhavsvegen med sine spektakulære broer og dramatiske kystlandskap. En unik reise over havet.",
    howItWorks:
      "Kjør eller sykle langs veien og stopp ved de merkede punktene. Skann QR-kodene for å få historier og fakta om hvert sted.",
    estimatedTime: "3-4 timer",
    distance: "8.3 km",
    difficulty: "lett",
    coverImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    mapCenter: { lat: 63.017, lng: 7.35 },
    mapZoom: 12,
    stops: [
      {
        id: "eldhusoya",
        order: 1,
        title: "Eldhusøya",
        description:
          "Rasteplass med fantastisk arkitektur og utsikt. Her kan du gå ut på de karakteristiske gangbroene over havet.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        ],
        lat: 63.017,
        lng: 7.35,
        locationHint: "Ved parkeringsplassen på Eldhusøya",
        audioUrl: "/audio/eldhusoya.mp3",
      },
      {
        id: "storseisundet-bro",
        order: 2,
        title: "Storseisundet bro",
        description:
          "Den mest ikoniske broen på Atlanterhavsvegen. Kjent som 'drukningsbroen' på grunn av sin optiske illusjon.",
        images: [
          "https://images.unsplash.com/photo-1510861320402-285a6c7639ea?w=800&q=80",
        ],
        lat: 63.02,
        lng: 7.36,
        locationHint: "Ved utsiktspunktet ved broen",
        audioUrl: "/audio/storseisundet-bro.mp3",
      },
      {
        id: "haholmen",
        order: 3,
        title: "Håholmen",
        description:
          "Et gammelt fiskeværmed rorbu-bebyggelse. Nå et populært hotell og restaurant med autentisk kystkultur.",
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
        ],
        lat: 63.025,
        lng: 7.34,
        locationHint: "Ta båten ut til Håholmen",
        audioUrl: "/audio/haholmen.mp3",
      },
    ],
  },
];

// --- HJELPEFUNKSJONER ---
export function getTourById(tourId: string): Tour | undefined {
  return tours.find((tour) => tour.id === tourId);
}

export function getStopById(tourId: string, stopId: string): TourStop | undefined {
  const tour = getTourById(tourId);
  return tour?.stops.find((stop) => stop.id === stopId);
}

export function getAllTours(): Tour[] {
  return tours;
}

// --- UI TEKSTER ---
export const uiText = {
  startButton: "Start tur",
  mapButton: "Se kart",
  howItWorksLabel: "Slik fungerer det:",
  stopUnlockedBanner: "Stopp last opp! Du har skannet QR-koden.",
  nextStopLabel: "Neste stopp:",
  findQrHint: "Finn QR-koden der for a lase opp!",
  lockedLabel: "Last",
  scanToUnlock: "Skann QR-koden ved dette stoppet",
  showDistance: "Vis avstand fra meg",
  fetchingLocation: "Henter posisjon...",
  openInMaps: "Apne i Google Maps",
  seeDetails: "Se detaljer",
  backToList: "Tilbake til listen",
  stopNotFound: "Stopp ikke funnet",
  stopNotFoundDesc: "Denne QR-koden er ugyldig eller stoppet er fjernet.",
  unlockedCount: (n: number, total: number) => `${n} av ${total} stopp last opp`,
  stopLabel: (n: number) => `Stopp ${n}`,
  stopOfTotal: (n: number, total: number) => `Stopp ${n} av ${total}`,
  distanceLabel: (km: number) =>
    km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`,
  chooseTour: "Velg en tur",
  allTours: "Alle turer",
  difficulty: {
    lett: "Lett",
    moderat: "Moderat",
    krevende: "Krevende",
  },
  scanQr: "Skann QR",
  audioPlay: "Spill av",
  audioPause: "Pause",
  audioLoading: "Laster lyd...",
};

// --- KARTFARGER ---
export const mapColors = {
  unlockedPin: "#2d6a4f",
  lockedPin: "#9ca3af",
};
