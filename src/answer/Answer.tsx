import React from "react";
import { AnswerProps } from "./AnswerProps";
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

export const Question: React.FC<AnswerProps> = ({ text,answerDate,question }) => {
    return (
        <IonCard color="light" className="ion-margin question-card">
            <IonCardHeader>
                <IonCardTitle>{user???}</IonCardTitle>
                <IonCardSubtitle>{formatDate(answerDate)}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonChip>{text}</IonChip>
                <IonText className="question-text ion-margin">{text}</IonText>
                <IonButton className="button-color" shape="round">Reply</IonButton>
            </IonCardContent>
        </IonCard>
    );
};
