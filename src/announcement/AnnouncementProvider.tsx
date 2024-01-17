import React, { useEffect, useReducer, useState } from "react";

import { AnnouncementProps } from "./AnnouncementProps";
import { getAnnouncements } from "./AnnouncementApi";
import { usePreferences } from "../utils/usePreferemces";
import {
  ActionProps,
  FETCHING_FAILED,
  FETCHING_STARTED,
  FETCHING_SUCCEEDED,
  ItemProviderProps,
  ItemState,
} from "../utils/provider";

//Interfata pentru starea specifica anunturilor
export interface AnnouncementState extends ItemState {
  announcements?: AnnouncementProps[];
}

//Starea initiala a contextului anunturilor
const initialState: AnnouncementState = {
  fetching: false,
};

//Reducer-ul care gestioneaza schimbariloe de stare pentru anunturi
const reducer: (
  state: AnnouncementState,
  action: ActionProps
) => AnnouncementState = (state, { type, payload }) => {
  switch (type) {
    case FETCHING_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCHING_SUCCEEDED:
      return {
        ...state,
        announcements: payload.announcements,
        fetching: false,
      };
    case FETCHING_FAILED:
      return { ...state, fetchingError: payload.error, fetching: false };
    default:
      return state;
  }
};

//Creerea contextului pentru starea anunturilor
export const AnnouncementItemContext =
  React.createContext<AnnouncementState>(initialState);

//Provider-ul care furnizeaza starea anunturilor si functionalitatile asociate
export const AnnouncementProvider: React.FC<ItemProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { announcements, fetching, fetchingError } = state;
  const { get } = usePreferences();
  const [token, setToken] = useState<string>("");

  // Efect secundar pentru a obține și seta token-ul la încărcarea componentei
  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  // Efect secundar pentru a efectua solicitarea de anunțuri atunci când token-ul se schimbă
  useEffect(getAnnouncementsEffect, [token]);

  const value = { announcements, fetching, fetchingError };

  return (
    // Furnizarea contextului pentru componente copii
    <AnnouncementItemContext.Provider value={value}>
      {children}
    </AnnouncementItemContext.Provider>
  );

  /**
   * Funcția de efect secundar pentru obținerea anunțurilor de la API
   */
  function getAnnouncementsEffect() {
    let canceled = false;

    if (token) {
      fetchAnnouncements();
    }

    return () => {
      canceled = true;
    };

    /**
     * Funcția asincronă pentru efectuarea solicitării de anunțuri
     */
    async function fetchAnnouncements() {
      try {
        dispatch({ type: FETCHING_STARTED });
        const announcements = await getAnnouncements(token);
        if (!canceled) {
          dispatch({ type: FETCHING_SUCCEEDED, payload: { announcements } });
        }
      } catch (error) {
        if (!canceled) {
          dispatch({ type: FETCHING_FAILED, payload: { error } });
        }
      }
    }
  }
};
