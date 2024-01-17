import axios from "axios";

import { config } from "../utils/api";

//url-ul de autentificare
const authUrl = "http://localhost:8080/api/auth";

//Interfata pentru obiectul de autentificare returnat
interface AuthProps {
  token: string;
}

/**
 * Functie pentru efectuarea autentificarii
 * @param email email-ul de autentificare
 * @param password prola pentru autentificare
 * @returns login-ul
 */
export const login: (
  email?: string,
  password?: string
) => Promise<AuthProps> = async (email, password) => {
  try {
    let res = await axios.post(
      `${authUrl}/authenticate`,
      { email, password },
      config
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Funcție pentru efectuarea înregistrării
 * @param name numele pt inregistrare
 * @param email email-ul pentru inregistrare
 * @param password parola pt inregistrare
 * @param university universitatea pt inregistrare
 * @param faculty facultatea pt inregistrare
 * @returns inregistrarea
 */
export const register: (
  name?: string,
  email?: string,
  password?: string,
  university?: string,
  faculty?: string
) => Promise<AuthProps> = async (
  name,
  email,
  password,
  university,
  faculty
) => {
  try {
    let res = await axios.post(
      `${authUrl}/register`,
      { name, email, password, university, faculty },
      config
    );
    console.log(res.data);
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
