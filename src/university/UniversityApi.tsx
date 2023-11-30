import axios from "axios";

import { UniversityProps } from "./UniversityProps";
import { baseUrl, securityConfig } from "../utils/api";

export const getUniversities: (token: string) => Promise<UniversityProps[]> = async (token: string) => {
    try {
        let res = await axios.get(`${baseUrl}/universities`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
