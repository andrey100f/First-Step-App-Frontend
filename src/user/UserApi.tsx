import axios from "axios";

import { UserProps } from "./UserProps";
import { baseUrl, securityConfig } from "../utils/api";

export const getAllUsers: (token: string) => Promise<UserProps[]> = async (token: string) => {
    try {
        let res = await axios.get(`${baseUrl}/users`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
