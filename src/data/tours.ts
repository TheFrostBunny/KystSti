// ============================================
// KYSTSTI — TURER OG STOPP
// Re-eksporterer fra tours/-mappen for bakoverkompatibilitet
// ============================================

export {
  tours,
  getTourById,
  getStopById,
  getAllTours,
  uiText,
  mapColors,
} from "./tours";

export type { Tour, TourStop } from "./tours";
