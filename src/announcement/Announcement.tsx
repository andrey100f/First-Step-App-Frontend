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
import "./styles/main.css";
import {Link} from "react-router-dom";

const Announcement: React.FC<AnnouncementProps> = ({
  title,
  text,
  url,
}) => {
  const handleClick = () => {
    window.location.href = url;
  }

  return (
    <IonCard color="light" className="ion-margin card">
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
