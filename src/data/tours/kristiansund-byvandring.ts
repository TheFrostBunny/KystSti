// ============================================
// TUR: Kristiansund Byvandring
// ============================================

import type { Tour } from "./types";

const tour: Tour = {
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
};

export default tour;
