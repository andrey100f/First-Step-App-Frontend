import React, { useEffect, useReducer, useState } from "react";

import { AnnouncementProps } from "./AnnouncementProps";
import { getAnnouncements } from "./AnnouncementApi";
import { usePreferences } from "../utils/usePreferemces";
import { ActionProps, FETCHING_FAILED, FETCHING_STARTED, FETCHING_SUCCEEDED, ItemProviderProps, ItemState } from "../utils/provider";

export interface AnnouncementState extends ItemState{
  announcements?: AnnouncementProps[];
}

const initialState: AnnouncementState = {
  fetching: false,
};

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

export const AnnouncementItemContext = React.createContext<AnnouncementState>(initialState);

export const AnnouncementProvider: React.FC<ItemProviderProps> = ({ children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { announcements, fetching, fetchingError } = state;
  const {get} = usePreferences();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  useEffect(getAnnouncementsEffect, [token]);

  const value = { announcements, fetching, fetchingError };

  return (
    <AnnouncementItemContext.Provider value={value}>
      {children}
    </AnnouncementItemContext.Provider>
  );

  function getAnnouncementsEffect() {
    let canceled = false;

    if(token) {
      fetchAnnouncements();
    }

    return () => {
      canceled = true;
    };

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
