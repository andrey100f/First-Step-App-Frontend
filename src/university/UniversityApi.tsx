import axios from "axios";

import { UniversityProps } from "./UniversityProps";
import { baseUrl, securityConfig } from "../utils/api";

/**
 * Funcția getUniversities este responsabilă pentru obținerea listei de universități.
 * @param token - Token-ul de autentificare necesar pentru a accesa resursa protejată.
 * @returns - Returnează o promisiune care se rezolvă cu un array de obiecte UniversityProps sau se rejectează cu o eroare.
 */
export const getUniversities: (
  token: string
) => Promise<UniversityProps[]> = async (token: string) => {
  try {
    let res = await axios.get(`${baseUrl}/universities`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
