import axios from "axios";

import { LocationProps } from "./LocationProps";
import { baseUrl, securityConfig } from "../utils/api";

export const getLocations: (token: string) => Promise<LocationProps[]> = async (token: string) => {
    try {
        let res = await axios.get(`${baseUrl}/locations`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
