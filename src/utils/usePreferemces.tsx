import { Preferences } from "@capacitor/preferences";
import { useCallback } from "react";

/**
 * Hook personalizat pentru gestionarea preferințelor utilizatorului.
 * Utilizează Capacitor Preferences API pentru a salva și recupera date într-o manieră persistentă.
 * @returns O pereche de funcții - `get` și `set` - pentru a citi și scrie preferințe.
 */
export const usePreferences = () => {
  const get = useCallback<(key: string) => Promise<string | null>>(
    (key) => Preferences.get({ key }).then((result) => result.value),
    []
  );

  const set = useCallback<(key: string, value: string) => Promise<void>>(
    (key, value) => Preferences.set({ key, value }),
    []
  );

  return { get, set };
};
