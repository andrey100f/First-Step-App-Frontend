import React, { useEffect, useReducer, useState } from "react";

import { EventProps } from "./EventProps";
import { usePreferences } from "../utils/usePreferemces";
import { getAllEvents } from "./EventApi";
import {
  ActionProps,
  FETCHING_FAILED,
  FETCHING_STARTED,
  FETCHING_SUCCEEDED,
  ItemProviderProps,
  ItemState,
} from "../utils/provider";

/**
 * Interfața care descrie starea evenimentelor.
 */
export interface EventState extends ItemState {
  events?: EventProps[];
}

const initialState: EventState = {
  fetching: false,
};

/**
 * Reducerul care gestionează schimbarea stării în funcție de acțiuni.
 * @param state - Starea curentă a contextului.
 * @param action - Acțiunea care indică modificarea stării.
 * @returns Starea actualizată.
 */
const reducer: (state: EventState, action: ActionProps) => EventState = (
  state,
  { type, payload }
) => {
  switch (type) {
    case FETCHING_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCHING_SUCCEEDED:
      return { ...state, events: payload.events, fetching: false };
    case FETCHING_FAILED:
      return { ...state, fetchingError: payload.error, fetching: false };
    default:
      return state;
  }
};

/**
 * Contextul de evenimente pentru a furniza și gestiona starea evenimentelor în aplicație.
 */
export const EventContext = React.createContext<EventState>(initialState);

/**
 * Provider-ul de evenimente care utilizează reducer-ul și Axios pentru a gestiona starea evenimentelor.
 * @param param0 - Proprietățile furnizate de componente părinte.
 * @returns Componenta React care furnizează contextul de evenimente.
 */

export const EventProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { events, fetching, fetchingError } = state;
  const { get } = usePreferences();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  useEffect(getEventsEffect, [token]);

  const value = { events, fetching, fetchingError };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );

  function getEventsEffect() {
    let canceled = false;

    if (token) {
      fetchEvents();
    }

    return () => {
      canceled = true;
    };

    async function fetchEvents() {
      try {
        dispatch({ type: FETCHING_STARTED });

        const events = await getAllEvents(token);

        if (!canceled) {
          dispatch({ type: FETCHING_SUCCEEDED, payload: { events } });
        }
      } catch (error) {
        if (!canceled) {
          dispatch({ type: FETCHING_FAILED, payload: { error } });
        }
      }
    }
  }
};
