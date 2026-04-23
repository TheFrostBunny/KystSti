import type { Tour } from "./types";

const tour: Tour = {
  id: "hi",
  title: { no: "3r3", en: "hi" },
  subtitle: { no: "hei", en: "test" },
  description: { no: "test", en: "test" },
  howItWorks: { no: "", en: "" },
  estimatedTime: "2",
  distance: "2",
  difficulty: "lett",
  coverImage: "",
  mapCenter: { lat: 63.12196, lng: 7.73912 },
  mapZoom: 19,
  stops: [
    {
      id: "wqe",
      order: 1,
      title: { no: "wqe", en: "ewq" },
      description: { no: "", en: "" },
      images: [],
      lat: 63.111,
      lng: 7.729,
    }
  ],
};

export default tour;
