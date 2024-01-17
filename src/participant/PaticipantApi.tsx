import axios from "axios";
import { baseUrl, securityConfig } from "../utils/api";
import { AddParticipantProps } from "./AddParticipantProps";
import { ParticipantProps } from "./ParticipantProps";
import { AddParticipantToEventProps } from "./AddParticipantToEventProps";
import { EventProps } from "../event/EventProps";

/**
 * Adaugă un participant utilizând un token de autentificare și datele participantului.
 * @param token - Token-ul de autentificare.
 * @param participantData - Datele participantului care urmează să fie adăugat.
 * @returns - Promisiunea pentru participantul adăugat.
 */
export const addParticipant: (
  token: string,
  participantData: AddParticipantProps
) => Promise<ParticipantProps> = async (
  token: string,
  participantData: AddParticipantProps
) => {
  try {
    let res = await axios.post(
      `${baseUrl}/participants/addParticipant`,
      participantData,
      securityConfig(token)
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Adaugă un participant la un eveniment utilizând un token de autentificare și datele participării.
 * @param token - Token-ul de autentificare.
 * @param participantData - Datele pentru participarea la eveniment.
 * @returns - Promisiunea pentru evenimentul actualizat.
 */
export const addParticipantToEvent: (
  token: string,
  participantData: AddParticipantToEventProps
) => Promise<EventProps> = async (
  token: string,
  participantData: AddParticipantToEventProps
) => {
  try {
    let res = await axios.patch(
      `${baseUrl}/events/addParticipant`,
      participantData,
      securityConfig(token)
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Obține toți participanții utilizând un token de autentificare.
 * @param token - Token-ul de autentificare.
 * @returns - Promisiunea pentru o listă de participanți.
 */
export const getAllParticipants: (
  token: string
) => Promise<ParticipantProps[]> = async (token: string) => {
  try {
    let res = await axios.get(`${baseUrl}/participants`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
