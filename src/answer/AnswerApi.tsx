import axios from "axios";

import { AnswerProps } from "./AnswerProps";
import { baseUrl, securityConfig } from "../utils/api";

export const getAllAnswers: (
    token: string
) => Promise<AnswerProps[]> = async (token: string) => {
    try {
        let res = await axios.get(`${baseUrl}/answers`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};