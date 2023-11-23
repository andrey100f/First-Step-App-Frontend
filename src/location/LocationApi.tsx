import {LocationProps} from "./LocationProps";
import axios from "axios";

const baseUrl = `http://localhost:8080/api/locations`;

export const getLocations: (token: string) => Promise<LocationProps[]> = async (token: string) => {
    try {
        let res = await axios.get(baseUrl, authConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const authConfig = (token?: string) => ({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
});