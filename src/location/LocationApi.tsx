import axios from "axios";

import { LocationProps } from "./LocationProps";
import { baseUrl, securityConfig } from "../utils/api";

/**
 * Funcția care efectuează o cerere GET către server pentru a obține informații despre locații.
 * @param token - Tokenul de autentificare pentru a autoriza cererea către server.
 * @returns - Promisiune rezolvată cu un array de obiecte reprezentând locațiile.
 */
export const getLocations: (token: string) => Promise<LocationProps[]> = async (
  token: string
) => {
  try {
    let res = await axios.get(`${baseUrl}/locations`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
