import React, { useEffect, useReducer, useState } from "react";

import { LocationProps } from "./LocationProps";
import { getLocations } from "./LocationApi";
import { usePreferences } from "../utils/usePreferemces";
import {
  ActionProps,
  FETCHING_FAILED,
  FETCHING_STARTED,
  FETCHING_SUCCEEDED,
  ItemProviderProps,
  ItemState,
} from "../utils/provider";

/**
 * Starea inițială pentru contextul locațiilor.
 */
export interface LocationState extends ItemState {
  locations?: LocationProps[];
}

const initialState: LocationState = {
  fetching: false,
};

/**
 * Reducer-ul pentru gestionarea stării locațiilor.
 * @param state - Starea curentă.
 * @param param1 - Acțiunea care specifică cum se modifică starea.
 * @returns - Starea actualizată.
 */
const reducer: (state: LocationState, action: ActionProps) => LocationState = (
  state,
  { type, payload }
) => {
  switch (type) {
    case FETCHING_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCHING_SUCCEEDED:
      return { ...state, locations: payload.locations, fetching: false };
    case FETCHING_FAILED:
      return { ...state, fetchingError: payload.error, fetching: false };
    default:
      return state;
  }
};

/**
 *
 */
export const LocationContext = React.createContext<LocationState>(initialState);

/**
 * Provider-ul pentru locații, folosit pentru a gestiona starea și acțiunile asociate.
 * @param param0 - Proprietățile componentei, inclusiv copiii.
 * @returns - Componenta React.
 */
export const LocationProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { locations, fetching, fetchingError } = state;
  const { get } = usePreferences();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  useEffect(getLocationsEffect, [token]);

  const value = { locations, fetching, fetchingError };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );

  function getLocationsEffect() {
    let canceled = false;

    if (token) {
      fetchLocations();
    }

    return () => {
      canceled = true;
    };

    async function fetchLocations() {
      try {
        dispatch({ type: FETCHING_STARTED });

        const locations = await getLocations(token);

        if (!canceled) {
          dispatch({ type: FETCHING_SUCCEEDED, payload: { locations } });
        }
      } catch (error) {
        if (!canceled) {
          dispatch({ type: FETCHING_FAILED, payload: { error } });
        }
      }
    }
  }
};
