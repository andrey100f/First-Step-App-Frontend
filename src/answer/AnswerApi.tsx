import axios from "axios";

import { AnswerProps } from "./AnswerProps";
import { baseUrl, securityConfig } from "../utils/api";
import {AddAnswerProps} from "./AddAnswerProps";

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

export const addAnswer: (token: string, answerData: AddAnswerProps) => Promise<AnswerProps> = async (token: string, answerData: AddAnswerProps) => {
    try {
        let res = await axios.post(`${baseUrl}/answers/addAnswer`, answerData, securityConfig(token));
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
};
