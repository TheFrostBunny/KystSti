// ============================================
// TUR: Kyststi Nordlandet
// ============================================

import type { Tour } from "./types";

const tour: Tour = {
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
};

export default tour;
