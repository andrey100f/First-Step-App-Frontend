/**
 * Interfata pentru raspunsuri
 */
export interface AnswerProps {
  answerId: number;
  text: string;
  answerDate: Date;
  question: number;
  user: string;
}
