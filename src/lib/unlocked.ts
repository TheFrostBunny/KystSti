const STORAGE_KEY = "kristiansund-tour-unlocked";

export function getUnlockedStops(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function unlockStop(stopId: string): void {
  const unlocked = getUnlockedStops();
  unlocked.add(stopId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked]));
}

export function isStopUnlocked(stopId: string): boolean {
  return getUnlockedStops().has(stopId);
}

export function resetUnlockedStops(): void {
  localStorage.removeItem(STORAGE_KEY);
}
