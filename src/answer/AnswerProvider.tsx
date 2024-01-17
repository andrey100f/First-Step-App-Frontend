import React, { useEffect, useReducer, useState } from "react";

import { AnswerProps } from "./AnswerProps";
import { getAllAnswers } from "./AnswerApi";
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
 * Definirea starii initiale pentru Answer
 */
export interface AnswerState extends ItemState {
  answers?: AnswerProps[];
}

const initialState: AnswerState = {
  fetching: false,
};

/**
 * Definirea reducer-ului care gestioneaza schimbarile de stare pentru contextul Answer
 * @param state raspuns
 * @param param1 actiune
 * @returns starea
 */
const reducer: (state: AnswerState, action: ActionProps) => AnswerState = (
  state,
  { type, payload }
) => {
  switch (type) {
    case FETCHING_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCHING_SUCCEEDED:
      return { ...state, answers: payload.answers, fetching: false };
    case FETCHING_FAILED:
      return { ...state, fetchingError: payload.error, fetching: false };
    default:
      return state;
  }
};

/**
 * Crearea contextului Answer
 */
export const AnswerContext = React.createContext<AnswerState>(initialState);

/**
 * Crearea providerului Answer
 */
export const AnswerProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { answers, fetching, fetchingError } = state;
  const { get } = usePreferences();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  useEffect(getAnswerEffect, [token]);

  const value = { answers, fetching, fetchingError };

  return (
    <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
  );

  function getAnswerEffect() {
    let canceled = false;

    if (token) {
      fetchAnswers();
    }

    return () => {
      canceled = true;
    };

    async function fetchAnswers() {
      try {
        dispatch({ type: FETCHING_STARTED });

        const answers = await getAllAnswers(token);

        if (!canceled) {
          dispatch({ type: FETCHING_SUCCEEDED, payload: { answers } });
        }
      } catch (error) {
        if (!canceled) {
          dispatch({ type: FETCHING_FAILED, payload: { error } });
        }
      }
    }
  }
};
