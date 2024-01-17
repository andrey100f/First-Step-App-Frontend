import axios from "axios";
import { AnnouncementProps } from "./AnnouncementProps";
import { baseUrl, securityConfig } from "../utils/api";

/**
 * Funcția care obține anunțurile de la API folosind un token de autorizare
 * @param token token-ul de autentificare
 * @returns lista de anunturi din baza de date
 */
export const getAnnouncements: (
  token: string
) => Promise<AnnouncementProps[]> = async (token) => {
  try {
    let res = await axios.get(
      `${baseUrl}/announcements`,
      securityConfig(token)
    );
    return Promise.resolve(res.data);
  } catch (err) {
    // În cazul unei erori, afișează detaliile erorii în consolă și respinge promisiunea cu acea eroare
    console.log(err);
    return Promise.reject(err);
  }
};
