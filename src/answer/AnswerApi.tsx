import axios from "axios";

import { AnswerProps } from "./AnswerProps";
import { baseUrl, securityConfig } from "../utils/api";
import { AddAnswerProps } from "./AddAnswerProps";

/**
 * Funcția care obține toate răspunsurile existente.
 * @param token Tokenul de autentificare pentru a accesa API-ul.
 * @returns O promisiune care rezolvă într-un array de obiecte AnswerProps.
 */
export const getAllAnswers: (token: string) => Promise<AnswerProps[]> = async (
  token: string
) => {
  try {
    let res = await axios.get(`${baseUrl}/answers`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Funcția care adaugă un nou răspuns.
 * @param token Tokenul de autentificare pentru a accesa API-ul.
 * @param answerData Datele pentru noul răspuns sub forma unui obiect AddAnswerProps.
 * @returns O promisiune care rezolvă într-un obiect AnswerProps reprezentând noul răspuns adăugat.
 */

export const addAnswer: (
  token: string,
  answerData: AddAnswerProps
) => Promise<AnswerProps> = async (
  token: string,
  answerData: AddAnswerProps
) => {
  try {
    let res = await axios.post(
      `${baseUrl}/answers/addAnswer`,
      answerData,
      securityConfig(token)
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
