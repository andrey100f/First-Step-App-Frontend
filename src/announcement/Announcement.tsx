import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
} from "@ionic/react";
import { AnnouncementProps } from "./AnnouncementProps";
import "../utils/styles/main.css";

/**
 * Definirea si exportul componentei React
 * @param param0 atributele unui anunt
 * @returns componenta de tipul Announcement
 */
export const Announcement: React.FC<AnnouncementProps> = ({
  title,
  text,
  url,
  faculty,
}) => {
  /**
   * Functia care este apelata cand butonul este apasat
   */
  const handleClick = () => {
    window.location.href = url;
  };

  /* Componenta IonCard care va afisa un cod de anunturi care contine un titlu, subtitlu,
     iar ca si continut un buton care sa te redirectioneze la site-ul unde este tot anuntul,
     si totodata mai contine si facultatea de unde este anuntul */
  return (
    <IonCard color="light" className="ion-margin announcement-card">
      <IonCardHeader>
        <IonCardTitle className="title">{title}</IonCardTitle>
        <IonCardSubtitle>{text}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonChip outline={true} color="dark">
          {faculty}
        </IonChip>
        <IonButton className="button-color" shape="round" onClick={handleClick}>
          Go to website
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};
