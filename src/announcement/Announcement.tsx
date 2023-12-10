import React from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip} from "@ionic/react";

import { AnnouncementProps } from "./AnnouncementProps";

import "../utils/styles/main.css";

export const Announcement: React.FC<AnnouncementProps> = ({title, text, url,faculty}) => {
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
          <IonChip outline={true} color="dark">{faculty}</IonChip>
        <IonButton className="button-color" shape="round" onClick={handleClick}>Go to website</IonButton>
      </IonCardContent>
    </IonCard>
  );
};
