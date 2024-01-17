import axios from "axios";

import { EventProps } from "./EventProps";
import { baseUrl, securityConfig } from "../utils/api";

/**
 * Funcția `getAllEvents` primește un token și returnează o promisiune care se rezolvă cu un array de obiecte de tipul `EventProps`.
 * @param  token - Token-ul de autentificare pentru a accesa resursele protejate.
 * @returns - O promisiune care se rezolvă cu un array de obiecte `EventProps`.
 */
export const getAllEvents: (token: string) => Promise<EventProps[]> = async (
  token: string
) => {
  try {
    let res = await axios.get(`${baseUrl}/events`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
