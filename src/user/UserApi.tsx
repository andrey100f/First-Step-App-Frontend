import axios from "axios";

import { UserProps } from "./UserProps";
import { baseUrl, securityConfig } from "../utils/api";
import { EditUserProps } from "./EditUserProps";

/**
 * Funcție care obține toți utilizatorii din sistem folosind un token de autentificare.
 * @param token - Tokenul de autentificare al utilizatorului.
 * @returns - Promisiune care se rezolvă cu un array de obiecte reprezentând utilizatorii.
 */
export const getAllUsers: (token: string) => Promise<UserProps[]> = async (
  token
) => {
  try {
    let res = await axios.get(`${baseUrl}/users`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Funcție care actualizează datele unui utilizator în sistem folosind un token de autentificare.
 * @param updateData - Datele de actualizare ale utilizatorului.
 * @param token - Tokenul de autentificare al utilizatorului.
 * @returns - Promisiune care se rezolvă cu obiectul reprezentând utilizatorul actualizat.
 */
export const updateUser: (
  updateData: EditUserProps,
  token: string
) => Promise<UserProps> = async (updateData, token) => {
  try {
    let res = await axios.put(
      `${baseUrl}/users/updateUser`,
      updateData,
      securityConfig(token)
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
