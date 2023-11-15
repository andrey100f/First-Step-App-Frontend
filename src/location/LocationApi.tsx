import {LocationProps} from "./LocationProps";
import axios from "axios";

const baseUrl = `http://localhost:8080/api/locations`;

export const getLocations: () => Promise<LocationProps[]> = async () => {
    try {
        let res = await axios.get(baseUrl);
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}