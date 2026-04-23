// ============================================
// TUR: Kristiansund Byvandring
// ============================================

import type { Tour } from "./types";

const tour: Tour = {
  id: "kristiansund-byvandring",
  title: {
    no: "Kristiansund Byvandring",
    en: "Kristiansund City Walk"
  },
  subtitle: {
    no: "Opplev byen mellom havene",
    en: "Experience the city between the seas"
  },
  description: {
    no: "Utforsk Kristiansunds unike historie og arkitektur på denne guidede byvandringen. Skann QR-kodene du finner ved hvert stopp for å låse opp historier, bilder og mer.",
    en: "Explore Kristiansund's unique history and architecture on this guided city walk. Scan the QR codes at each stop to unlock stories, images, and more."
  },
  howItWorks: {
    no: "Finn QR-kodene ved hvert stopp rundt i Kristiansund. Skann dem med telefonen for å låse opp historier, bilder og mer!",
    en: "Find the QR codes at each stop around Kristiansund. Scan them with your phone to unlock stories, images, and more!"
  },
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
      title: {
        no: "Kirkelandet kirke",
        en: "Kirkelandet Church"
      },
      description: {
        no: "Den ikoniske kirken tegnet av Odd Østbye, innviet i 1964. Kjent for sin dramatiske modernistiske arkitektur og det massive glassmosaikkvindusverket.",
        en: "The iconic church designed by Odd Østbye, consecrated in 1964. Known for its dramatic modernist architecture and massive glass mosaic windows."
      },
      images: [
        "https://images.unsplash.com/photo-1510861320402-285a6c7639ea?w=800&q=80",
        "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&q=80",
      ],
      lat: 63.1107,
      lng: 7.7278,
      locationHint: { no: "Ved kirken på Kirkelandet", en: "By the church on Kirkelandet" },
      audioUrl: "/audio/kirkelandet-kirke.mp3",
    },
    {
      id: "mellemvaerftet",
      order: 2,
      title: {
        no: "Mellemværftet",
        en: "Mellemværftet Shipyard"
      },
      description: {
        no: "Et historisk skipsverft som nå er kulturhus og museum. Her kan du oppleve Kristiansunds maritime arv og klippfiskhistorie.",
        en: "A historic shipyard now serving as a cultural center and museum. Experience Kristiansund's maritime heritage and clipfish history."
      },
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      ],
      lat: 63.112,
      lng: 7.734,
      locationHint: { no: "Ved det gamle verftet på Innlandet", en: "By the old shipyard on Innlandet" },
      audioUrl: "/audio/mellemvaerftet.mp3",
    },
    {
      id: "sundbaten",
      order: 3,
      title: {
        no: "Sundbåten",
        en: "Sundbåten Ferry"
      },
      description: {
        no: "Verdens eldste offentlige transportmiddel i kontinuerlig drift siden 1876. Sundbåten frakter passasjerer mellom byens øyer.",
        en: "The world's oldest public transport in continuous operation since 1876. The Sundbåten ferry carries passengers between the city's islands."
      },
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      ],
      lat: 63.1098,
      lng: 7.731,
      locationHint: { no: "Ved Sundbåtbrygga", en: "By the Sundbåten ferry dock" },
      audioUrl: "/audio/sundbaten.mp3",
    },
    {
      id: "woldbrygga",
      order: 4,
      title: {
        no: "Woldbrygga",
        en: "Woldbrygga Wharf"
      },
      description: {
        no: "Den gamle klippfiskbrygga ved havnen. Et levende minne om tiden da Kristiansund var Norges klippfiskhovedstad og eksporterte til hele verden.",
        en: "The old clipfish wharf by the harbor. A living memory of the time when Kristiansund was Norway's clipfish capital and exported worldwide."
      },
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      ],
      lat: 63.1112,
      lng: 7.7265,
      locationHint: { no: "Ved havnen, nær fiskebrygga", en: "By the harbor, near the fish wharf" },
      audioUrl: "/audio/woldbrygga.mp3",
    },
    {
      id: "innlandet",
      order: 5,
      title: {
        no: "Innlandet",
        en: "Innlandet Old Town"
      },
      description: {
        no: "Den eldste bydelen i Kristiansund med sjarmerende trehusbebyggelse. Mange av husene er restaurert etter ødeleggelsene i 1940.",
        en: "The oldest district in Kristiansund with charming wooden houses. Many have been restored after the destruction in 1940."
      },
      images: [
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
        "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
      ],
      lat: 63.1135,
      lng: 7.722,
      locationHint: { no: "I den gamle trehusbebyggelsen på Innlandet", en: "In the old wooden house district on Innlandet" },
      audioUrl: "/audio/innlandet.mp3",
    },
    {
      id: "festiviteten",
      order: 6,
      title: {
        no: "Festiviteten",
        en: "Festiviteten Opera House"
      },
      description: {
        no: "Norges eldste operahus, bygget i jugendstil i 1914. Et kulturelt klenodium som fortsatt brukes til konserter, teater og opera.",
        en: "Norway's oldest opera house, built in Art Nouveau style in 1914. A cultural gem still used for concerts, theater, and opera."
      },
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
        "https://images.unsplash.com/photo-1577086664693-894d8a9e5c3d?w=800&q=80",
      ],
      lat: 63.1102,
      lng: 7.7295,
      locationHint: { no: "Ved operahuset i sentrum", en: "By the opera house in the city center" },
      audioUrl: "/audio/festiviteten.mp3",
    },
  ],
};

export default tour;
