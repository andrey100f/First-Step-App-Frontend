import { AnnouncementProps } from "./AnnouncementProps";
import React, {useEffect, useReducer, useState} from "react";
import PropTypes from "prop-types";
import { getAnnouncements } from "./AnnouncementApi";
import {usePreferences} from "../utils/usePreferemces";

export interface AnnouncementItemState {
  announcements?: AnnouncementProps[];
  fetching: boolean;
  fetchingError?: Error | null;
}

interface ActionProps {
  type: string;
  payload?: any;
}

const initialState: AnnouncementItemState = {
  fetching: false,
};

const FETCHING_STARTED = "FETCHING_STARTED";
const FETCHING_SUCCEEDED = "FETCHING_SUCCEEDED";
const FETCHING_FAILED = "FETCHING_FAILED";

const reducer: (
  state: AnnouncementItemState,
  action: ActionProps
) => AnnouncementItemState = (state, { type, payload }) => {
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

export const AnnouncementItemContext =
  React.createContext<AnnouncementItemState>(initialState);

interface AnnouncementProviderProps {
  children: PropTypes.ReactNodeLike;
}

export const AnnouncementProvider: React.FC<AnnouncementProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { announcements, fetching, fetchingError } = state;
  const {get, set} = usePreferences();
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
