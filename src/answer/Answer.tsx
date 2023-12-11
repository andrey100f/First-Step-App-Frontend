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

import "../utils/styles/answer.css";
import "../utils/styles/main.css";

export const Answer: React.FC<AnswerProps> = ({ text,answerDate,question, user }) => {
    return (
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
