import axios from "axios";

import { QuestionProps } from "./QuestionProps";
import { baseUrl, securityConfig } from "../utils/api";
import { AddQuestionProps } from "./AddQuestionProps";

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

export const addQuestion: (token: string, questionData: AddQuestionProps) => Promise<QuestionProps> = async (token: string, questionData: AddQuestionProps) => {
  try {
    let res = await axios.post(`${baseUrl}/questions/addQuestion`, questionData, securityConfig(token));
    return Promise.resolve(res.data);
  }
  catch (err) {
    return Promise.reject(err);
  }
};
