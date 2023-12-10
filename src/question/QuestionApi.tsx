import axios from "axios";

import { QuestionProps } from "./QuestionProps";
import { baseUrl, securityConfig } from "../utils/api";

export const getAllQuestions: (
  token: string
) => Promise<QuestionProps[]> = async (token: string) => {
  try {
    let res = await axios.get(`${baseUrl}/questions`, securityConfig(token));
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
