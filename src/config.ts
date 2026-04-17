// Global konfigurasjon for å slå av/på funksjoner i appen
// Endre verdiene til true/false for å aktivere/deaktivere funksjoner

export const appConfig = {
  enableMap: true, // Vis kart-siden
  enableStopList: true, // Vis stopp-liste
  enableProgress: true, // Lagre fremgang i localStorage
  enableDistance: false, // Vis avstand fra bruker
  enableAudio: false, // Aktiver lydavspilling på stopp
  enableMultiLang: false, // Aktiver støtte for flere språk
  activeTourId: "kristiansund-byvandring", // Sett ID-en til turen som skal være aktiv
  enableDebug: false, // Vis debug-informasjon i UI
  enableOnboarding: true, // Vis onboarding ved første besøk
  enableQrScanner: false, // Vis QR-skanner-knapp og -side
  enableTourBuilder: false, // Vis "Lag tur" siden
};
