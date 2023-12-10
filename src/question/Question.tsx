import React from "react";
import { QuestionProps } from "./QuestionProps";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
  IonText,
  IonChip,
} from "@ionic/react";

import {formatDate} from "../utils/utils";

import "../utils/styles/question.css";
import "../utils/styles/main.css";

export const Question: React.FC<QuestionProps> = ({ text, user, questionDate, category }) => {
  return (
    <IonCard color="light" className="ion-margin question-card">
      <IonCardHeader>
        <IonCardTitle>{user}</IonCardTitle>
        <IonCardSubtitle>{formatDate(questionDate)}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
          <IonChip>{category}</IonChip>
        <IonText className="question-text ion-margin">{text}</IonText>
        <IonButton className="button-color" shape="round">Reply</IonButton>
      </IonCardContent>
    </IonCard>
  );
};
