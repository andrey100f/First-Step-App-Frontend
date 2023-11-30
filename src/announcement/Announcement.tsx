import React from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";

import { AnnouncementProps } from "./AnnouncementProps";

import "../utils/styles/main.css";

export const Announcement: React.FC<AnnouncementProps> = ({title, text, url,}) => {
  const handleClick = () => {
    window.location.href = url;
  }

  return (
    <IonCard color="light" className="ion-margin announcement-card">
      <IonCardHeader>
        <IonCardTitle className="title">{title}</IonCardTitle>
        <IonCardSubtitle>{text}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButton className="button-color" shape="round" onClick={handleClick}>Go to website</IonButton>
      </IonCardContent>
    </IonCard>
  );
};
