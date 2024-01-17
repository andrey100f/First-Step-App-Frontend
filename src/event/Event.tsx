import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
} from "@ionic/react";

import { EventProps } from "./EventProps";

import "../utils/styles/event.css";

/**
 * Componenta pentru afișarea unui eveniment
 * @param param0 - Proprietățile evenimentului
 * @returns - Componenta pentru afișarea unui eveniment
 */
export const Event: React.FC<EventProps> = ({
  name,
  description,
  participants,
}) => {
  return (
    /** Componenta IonCard care are in interiorul sau un atet cu un titlu
     * iar in interiorul cardului ave, afisata descrierea evenimentului, un buton pe car epoti sa-l apesi
     * daca doresti sa participi la eveniment si numarul de participanti.
     */
    <IonCard color="light" className="ion-margin event-card">
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>{description}</p>
        <IonChip>{participants}</IonChip>
        <IonButton>Like</IonButton>
      </IonCardContent>
    </IonCard>
  );
};
