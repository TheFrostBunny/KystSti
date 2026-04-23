import en from './languages/en.json';
import no from './languages/no.json';

export const translations = { en, no } as const;

export type Language = keyof typeof translations;