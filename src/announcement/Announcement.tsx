import { AnnouncementProps } from "./AnnouncementProps";
import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle, IonChip,
} from "@ionic/react";
import "../university/styles/main.css";
import "./styles/main.css";

const Announcement: React.FC<AnnouncementProps> = ({
  title,
  text,
  url,
}) => {
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
        <IonButton color="primary" shape="round" onClick={handleClick}>Go to website</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default Announcement;
