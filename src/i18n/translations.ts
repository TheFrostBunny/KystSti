export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      stops: "Stops",
      map: "Map",
      scan: "Scan",
      about: "About",
    },
    // Home page
    home: {
      title: "KystSti",
      subtitle: "Experience the coast in a new way",
      description: "Explore beautiful coastal trails with interactive tours, QR codes and audio guides.",
      stops: "stops",
      estimatedTime: "min",
      yourProgress: "Your Progress",
      seeAllStops: "See all stops",
      howItWorks: "How it works",
      startTour: "Start Tour",
    },
    // Tour pages
    tour: {
      stopNotFound: "Stop not found",
      stopNotFoundDescription: "The stop you are looking for does not exist.",
      nextStop: "Next Stop",
      unlockedBanner: "is now unlocked!",
    },
    stop: {
      stopLabel: (order: number) => `Stop ${order}`,
      unlockedCount: (unlocked: number, total: number) => `${unlocked} of ${total} stops unlocked`,
      locationHint: "Location hint",
      distanceLabel: (distance: number) => `${distance.toFixed(1)} km away`,
      fetchingLocation: "Fetching location...",
      showDistance: "Show distance",
      openInMaps: "Open in Maps",
      stopOfTotal: (order: number, total: number) => `Stop ${order} of ${total}`,
    },
    // Scanner
    scanner: {
      title: "Scan QR Code",
      cameraPermission: "Camera permission denied",
      scanning: "Manual entry",
      scanInstructions: "Hold your phone over the QR code at each stop to unlock content.",
    },
    // About page
    about: {
      title: "About KystSti",
      description: "Explore beautiful coastal trails and city walks with interactive tours. Scan QR codes at each stop to unlock stories, images and audio guides.",
      stats: {
        toursLabel: "tours",
        stopsLabel: "stops",
        freeLabel: "Free",
        freeToUse: "to use",
      },
      howToUse: "How to use the app",
      steps: [
        "Choose a tour from the tour list",
        "Go to the starting point of the tour",
        "Find the QR code placed at the stop",
        "Scan the QR code with the camera - the content is unlocked!",
        "Listen to the audio guide and read the story",
        "Follow the path to the next stop",
      ],
      features: "Features",
      featuresList: [
        "Multiple tours to choose from",
        "QR scanning to unlock stops",
        "Audio guide at each stop",
        "Interactive map with route",
        "Progress indicator",
      ],
      privacy: "This app does not collect personal information.",
      privacyLocation: "Your position is only used locally to show distance.",
      builtBy: "Built by David. See the source code on",
      github: "GitHub",
    },
    // Onboarding
    onboarding: {
      exploreTours: "Explore Tours",
      exploreTourDesc: "Choose from multiple tours in the Kristiansund area. Each tour has unique stops with stories and information.",
      scanQr: "Scan QR Codes",
      scanQrDesc: "At each stop you will find a QR code. Scan it to unlock content and register your progress.",
      listenStories: "Listen to Stories",
      listenStoriesDesc: "Many stops have audio guides that tell you more about the place. Just press play and listen as you explore.",
      skip: "Skip",
      next: "Next",
      getStarted: "Get Started",
    },
    // Common
    common: {
      back: "Back",
    },
  },
  no: {
    // Navigation
    nav: {
      home: "Hjem",
      stops: "Stopp",
      map: "Kart",
      scan: "Skann",
      about: "Om",
    },
    // Home page
    home: {
      title: "KystSti",
      subtitle: "Opplev kysten på en ny måte",
      description: "Utforsk vakre kyststier med interaktive turer, QR-koder og lydguider.",
      stops: "stopp",
      estimatedTime: "min",
      yourProgress: "Din fremgang",
      seeAllStops: "Se alle stopp",
      howItWorks: "Slik virker det",
      startTour: "Start turen",
    },
    // Tour pages
    tour: {
      stopNotFound: "Stopp ikke funnet",
      stopNotFoundDescription: "Stoppet du leter etter finnes ikke.",
      nextStop: "Neste stopp",
      unlockedBanner: "er nå låst opp!",
    },
    stop: {
      stopLabel: (order: number) => `Stopp ${order}`,
      unlockedCount: (unlocked: number, total: number) => `${unlocked} av ${total} stopp låst opp`,
      locationHint: "Lokasjonshint",
      distanceLabel: (distance: number) => `${distance.toFixed(1)} km unna`,
      fetchingLocation: "Henter plassering...",
      showDistance: "Vis avstand",
      openInMaps: "Åpne i Kart",
      stopOfTotal: (order: number, total: number) => `Stopp ${order} av ${total}`,
    },
    // Scanner
    scanner: {
      title: "Skann QR-kode",
      cameraPermission: "Kameratilgang nektet",
      scanning: "Manuell innmatting",
      scanInstructions: "Hold telefonen din over QR-koden ved hvert stopp for å låse opp innhold.",
    },
    // About page
    about: {
      title: "Om KystSti",
      description: "Utforsk vakre kyststier og byvandringer med interaktive turer. Skann QR-koder ved hvert stopp for å låse opp historier, bilder og lydguider.",
      stats: {
        toursLabel: "turer",
        stopsLabel: "stopp totalt",
        freeLabel: "Gratis",
        freeToUse: "å bruke",
      },
      howToUse: "Slik bruker du appen",
      steps: [
        "Velg en tur fra turlisten",
        "Gå til startpunktet for turen",
        "Finn QR-koden som er plassert ved stoppet",
        "Skann QR-koden med kameraet - innholdet låses opp!",
        "Hør på lydguiden og les historien",
        "Følg veien til neste stopp",
      ],
      features: "Funksjoner",
      featuresList: [
        "Flere turer å velge mellom",
        "QR-skanning for å låse opp stopp",
        "Lydguide på hvert stopp",
        "Interaktivt kart med rute",
        "Fremgangsindikator",
      ],
      privacy: "Denne appen samler ikke inn personlig informasjon.",
      privacyLocation: "Posisjonen din brukes kun lokalt for å vise avstand.",
      builtBy: "Laget av David. Se kildekoden på",
      github: "GitHub",
    },
    // Onboarding
    onboarding: {
      exploreTours: "Utforsk turer",
      exploreTourDesc: "Velg mellom flere turer i Kristiansund-området. Hver tur har unike stopp med historier og informasjon.",
      scanQr: "Skann QR-koder",
      scanQrDesc: "Ved hvert stopp finner du en QR-kode. Skann den for å låse opp innhold og registrere fremgangen din.",
      listenStories: "Lytt til historiene",
      listenStoriesDesc: "Mange stopp har lydguider som forteller deg mer om stedet. Bare trykk play og lytt mens du utforsker.",
      skip: "Hopp over",
      next: "Neste",
      getStarted: "Kom i gang",
    },
    // Common
    common: {
      back: "Tilbake",
    },
  },
} as const;

export type Language = keyof typeof translations;
