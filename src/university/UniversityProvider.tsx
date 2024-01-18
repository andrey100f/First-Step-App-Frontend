import React, { useEffect, useReducer, useState } from "react";

import { UniversityProps } from "./UniversityProps";
import { usePreferences } from "../utils/usePreferemces";
import { getUniversities } from "./UniversityApi";
import {
  ActionProps,
  FETCHING_FAILED,
  FETCHING_STARTED,
  FETCHING_SUCCEEDED,
  ItemProviderProps,
  ItemState,
} from "../utils/provider";

export interface UniversityState extends ItemState {
  universities?: UniversityProps[];
}

const initialState = {
  fetching: false,
};

/**
 * Functie de reducere pentru gestionarea starii contextului universitatilor
 * @param state starea actuala a contextului
 * @param param1 actiunea care modifica starea
 * @returns starea actualizata
 */
const reducer: (
  state: UniversityState,
  action: ActionProps
) => UniversityState = (state, { type, payload }) => {
  switch (type) {
    case FETCHING_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCHING_SUCCEEDED:
      return { ...state, universities: payload.universities, fetching: false };
    case FETCHING_FAILED:
      return { ...state, fetchingError: payload.error, fetching: false };
    default:
      return state;
  }
};

/**
 * Contextul care furnizează starea Universităților către componentele copil.
 */
export const UniversityContext =
  React.createContext<UniversityState>(initialState);

/**
 * Furnizorul de starea contextului Universităților.
 * @param param0 Proprietățile furnizorului.
 * @returns Componenta furnizorului pentru contextul Universităților.
 */
export const UniversityProvider: React.FC<ItemProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { universities, fetching, fetchingError } = state;
  const { get } = usePreferences();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  useEffect(getUniversitiesEffect, [token]);

  const value = { universities, fetching, fetchingError };

  return (
    <UniversityContext.Provider value={value}>
      {children}
    </UniversityContext.Provider>
  );

  function getUniversitiesEffect() {
    let canceled = false;

    if (token) {
      fetchUniversities();
    }

    return () => {
      canceled = true;
    };

    async function fetchUniversities() {
      try {
        dispatch({ type: FETCHING_STARTED });

        const universities = await getUniversities(token);

        if (!canceled) {
          dispatch({ type: FETCHING_SUCCEEDED, payload: { universities } });
        }
      } catch (error) {
        if (!canceled) {
          dispatch({ type: FETCHING_FAILED, payload: { error } });
        }
      }
    }
  }
};
