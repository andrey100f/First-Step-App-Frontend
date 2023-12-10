import React from "react";
import { useState } from "react";
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
  IonTextarea,
  IonItem,
} from "@ionic/react";

export const Question: React.FC<QuestionProps> = ({
  text,
  userDto,
  date,
  category,
}) => {
  return (
    <IonCard color="light" className="ion-margin">
      <IonCardHeader>
        <IonCardTitle>{userDto.name}</IonCardTitle>
        <IonCardSubtitle>{date}</IonCardSubtitle>
        <IonChip>{category}</IonChip>
      </IonCardHeader>

      <IonCardContent>
        <IonText>{text}</IonText>
        <IonButton shape="round">Reply</IonButton>
      </IonCardContent>

      <IonItem>
        <IonTextarea
          label="Floating label"
          labelPlacement="floating"
          placeholder="Enter text"
        ></IonTextarea>
      </IonItem>
    </IonCard>
  );
};
