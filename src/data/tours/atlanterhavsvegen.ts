// ============================================
// TUR: Atlanterhavsvegen Oppdagelse
// ============================================

import type { Tour } from "./types";

const tour: Tour = {
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
};

export default tour;
