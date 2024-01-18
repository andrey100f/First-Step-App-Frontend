/**
 * Adresa de baza a API-ului
 */
export const baseUrl = "http://localhost:8080/api";

/**
 * Configuratia implicita pentru cererile de tip json
 */
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Functie care returneaza o configuratie de securitate pentrucererile care necesita un token de autorizare
 * @param token token-ul de autorizare
 * @returns obiectul de configuratie care include antelele necesare pentru autorizare
 */
export const securityConfig = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
