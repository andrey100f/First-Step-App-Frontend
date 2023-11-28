import {UniversityProps} from "./UniversityProps";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/universities"

export const getUniversities: (token: string) => Promise<UniversityProps[]> = async (token: string) => {
    try {
        let res = await axios.get(baseUrl, config(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

const config = (token?: string) => ({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
});