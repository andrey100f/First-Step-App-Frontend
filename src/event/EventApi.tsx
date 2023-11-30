import axios from "axios";

import { EventProps } from "./EventProps";
import { baseUrl, securityConfig } from "../utils/api";

export const getAllEvents: (token: string) => Promise<EventProps[]> = async (token: string) => {
    try {
        let res = await axios.get(`${baseUrl}/events`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
