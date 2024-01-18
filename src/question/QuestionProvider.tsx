import React, { useEffect, useReducer, useState } from "react";

import { QuestionProps } from "./QuestionProps";
import { getAllQuestions } from "./QuestionApi";
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
 * Interfață care definește starea pentru întrebări.
 */
export interface QuestionState extends ItemState {
  questions?: QuestionProps[];
}

const initialState: QuestionState = {
  fetching: false,
};

/**
 * Reducer-ul care gestionează schimbările de stare ale contextului.
 * @param state Starea curentă a contextului
 * @param param0 Acțiunea care indică tipul și, opțional, datele asociate
 * @returns Starea actualizată a contextului
 */

const reducer: (state: QuestionState, action: ActionProps) => QuestionState = (
  state,
  { type, payload }
) => {
  switch (type) {
    case FETCHING_STARTED:
      return { ...state, fetching: true, fetchingError: null };
    case FETCHING_SUCCEEDED:
      return { ...state, questions: payload.questions, fetching: false };
    case FETCHING_FAILED:
      return { ...state, fetchingError: payload.error, fetching: false };
    default:
      return state;
  }
};

/**
 * Contextul creat pentru gestionarea stării întrebărilor.
 */
export const QuestionContext = React.createContext<QuestionState>(initialState);

/**
 * Provider-ul care furnizează contextul întregii aplicații.
 * @param param0 Props-urile provider-ului
 * @returns Componenta React care furnizează contextul întrebărilor.
 */
export const QuestionProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, fetching, fetchingError } = state;
  const { get } = usePreferences();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  useEffect(getQuestionEffect, [token]);

  const value = { questions, fetching, fetchingError };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );

  /**
   * Efect care se activează atunci când token-ul se schimbă și obține întrebările asociate acestuia.
   * @returns Funcția care va fi apelată la demontarea componentei
   */
  function getQuestionEffect() {
    let canceled = false;

    if (token) {
      fetchQuestions();
    }

    return () => {
      canceled = true;
    };

    async function fetchQuestions() {
      try {
        dispatch({ type: FETCHING_STARTED });

        const questions = await getAllQuestions(token);

        if (!canceled) {
          dispatch({ type: FETCHING_SUCCEEDED, payload: { questions } });
        }
      } catch (error) {
        if (!canceled) {
          dispatch({ type: FETCHING_FAILED, payload: { error } });
        }
      }
    }
  }
};
