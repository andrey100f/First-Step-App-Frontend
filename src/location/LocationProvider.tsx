import { LocationProps } from "./LocationProps";
import React, {useEffect, useReducer, useState} from "react";
import PropTypes from "prop-types";
import { getLocations } from "./LocationApi";
import {usePreferences} from "../utils/usePreferemces";

export interface LocationState {
  locations?: LocationProps[];
  fetching: boolean;
  fetchingError?: Error | null;
}

interface ActionProps {
  type: string;
  payload?: any;
}

const initialState: LocationState = {
  fetching: false,
};

const FETCHING_STARTED = "FETCHING_STARTED";
const FETCHING_SUCCEEDED = "FETCHING_SUCCEEDED";
const FETCHING_FAILED = "FETCHING_FAILED";

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

export const LocationContext = React.createContext<LocationState>(initialState);

interface AnnouncementProviderProps {
  children: PropTypes.ReactNodeLike;
}

export const LocationProvider: React.FC<AnnouncementProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { locations, fetching, fetchingError } = state;
  const {get, set} = usePreferences();
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

    if(token) {
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
