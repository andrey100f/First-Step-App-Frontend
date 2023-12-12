import axios from "axios";
import { baseUrl, securityConfig } from "../utils/api";
import { AddParticipantProps } from "./AddParticipantProps";
import { ParticipantProps } from "./ParticipantProps";
import { AddParticipantToEventProps } from "./AddParticipantToEventProps";
import { EventProps } from "../event/EventProps";

export const addParticipant: (token: string, participantData: AddParticipantProps) => Promise<ParticipantProps> = async (token: string, participantData: AddParticipantProps) => {
    try {
        let res = await axios.post(`${baseUrl}/participants/addParticipant`, participantData, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
};

export const addParticipantToEvent: (token: string, participantData: AddParticipantToEventProps) => Promise<EventProps> = async (token: string, participantData: AddParticipantToEventProps) => {
    try {
        let res = await axios.patch(`${baseUrl}/events/addParticipant`, participantData, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
};

export const getAllParticipants: (token: string) => Promise<ParticipantProps[]> = async (token: string) => {
    try {
        let res = await axios.get(`${baseUrl}/participants`, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
};
