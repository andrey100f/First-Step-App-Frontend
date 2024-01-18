import axios from "axios";

import { QuestionProps } from "./QuestionProps";
import { baseUrl, securityConfig } from "../utils/api";
import { AddQuestionProps } from "./AddQuestionProps";

/**
 * Funcție pentru obținerea tuturor întrebărilor.
 * @param token - Token-ul de autentificare al utilizatorului.
 * @returns Promise pentru un array de întrebări (QuestionProps[]).
 */
export const getAllQuestions: (
  token: string
) => Promise<QuestionProps[]> = async (token: string) => {
  try {
    let res = await axios.get(`${baseUrl}/questions`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Funcție pentru adăugarea unei noi întrebări.
 * @param token - Token-ul de autentificare al utilizatorului.
 * @param questionData - Datele noii întrebări (AddQuestionProps).
 * @returns Promise pentru întrebarea adăugată (QuestionProps).
 */
export const addQuestion: (
  token: string,
  questionData: AddQuestionProps
) => Promise<QuestionProps> = async (
  token: string,
  questionData: AddQuestionProps
) => {
  try {
    let res = await axios.post(
      `${baseUrl}/questions/addQuestion`,
      questionData,
      securityConfig(token)
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
