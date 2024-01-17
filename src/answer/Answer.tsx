import React from "react";
import { AnswerProps } from "./AnswerProps";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonText,
} from "@ionic/react";

import { formatDate } from "../utils/utils";

import "../utils/styles/answer.css";
import "../utils/styles/main.css";

/**
 * Componenta React care afișează un răspuns.
 * @param param0 Atributele componentei raspuns
 * @returns Componenta care afișează un răspuns.
 */
export const Answer: React.FC<AnswerProps> = ({
  text,
  answerDate,
  question,
  user,
}) => {
  return (
    /** Gnereaza componenta IonCard care contine titlul raspunsului, un subtitlu care are
     * data la care acesta a fost publicat si textul propriu zis*/
    <IonCard color="light" className="ion-margin question-card">
      <IonCardHeader>
        <IonCardTitle>{user}</IonCardTitle>
        <IonCardSubtitle>{formatDate(answerDate)}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonText className="question-text ion-margin">{text}</IonText>
      </IonCardContent>
    </IonCard>
  );
};
