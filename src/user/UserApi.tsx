import axios from "axios";

import { UserProps } from "./UserProps";
import { baseUrl, securityConfig } from "../utils/api";
import {EditUserProps} from "./EditUserProps";

export const getAllUsers: (token: string) => Promise<UserProps[]> = async (token) => {
    try {
        let res = await axios.get(`${baseUrl}/users`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateUser: (updateData: EditUserProps, token: string) => Promise<UserProps> = async (updateData, token) => {
    try {
        let res = await axios.put(`${baseUrl}/users/updateUser`, updateData, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
}
