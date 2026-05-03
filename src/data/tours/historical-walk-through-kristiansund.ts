import type { Tour } from "./types";

const tour: Tour = {
  id: "historical-walk-through-kristiansund",
  title: { no: "Historisk vandring i Kristiansund", en: "Historical walk through Kristiansund" },
  subtitle: { no: "", en: "" },
  description: { no: "Historical walk through Kristiansund", en: "Historical walk through Kristiansund" },
  howItWorks: { no: "Historical walk through Kristiansund", en: "Historical walk through Kristiansund" },
  estimatedTime: { no: "3", en: "4" },
  distance: "",
  difficulty: "lett",
  coverImage: "",
  mapCenter: { lat: 63.111, lng: 7.729 },
  mapZoom: 15,
  stops: [
    {
      id: "historical-walk-through-kristiansund",
      order: 1,
      title: { no: "Historical walk through Kristiansund", en: "Historical walk through Kristiansund" },
      description: { no: "Historical walk through Kristiansund", en: "" },
      images: [],
      lat: 63.11154,
      lng: 7.73352,
      locationHint: { no: "", en: "" }
    },
    {
      id: "historical-walk-through-kristiansund-2",
      order: 2,
      title: { no: "Historical walk through Kristiansund 2", en: "Historical walk through Kristiansund 2" },
      description: { no: "", en: "" },
      images: [],
      lat: 63.11468,
      lng: 7.72871,
      locationHint: { no: "", en: "" }
    }
  ],
};

export default tour;
