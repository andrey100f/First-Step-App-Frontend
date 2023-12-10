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

export interface QuestionState extends ItemState {
  questions?: QuestionProps[];
}

const initialState: QuestionState = {
  fetching: false,
};

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

export const QuestionContext = React.createContext<QuestionState>(initialState);

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
        console.log(questions);

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
