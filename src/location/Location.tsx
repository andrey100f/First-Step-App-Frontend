import { LocationProps } from "./LocationProps";
import React from "react";
import { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonTitle,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
} from "@ionic/react";

const Location: React.FC<LocationProps> = ({
  name,
  street,
  number,
  type,
  latitude,
  longitude,
  img,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <IonCard color="primary" className="ion-margin">
      <img alt={name} src={img} />
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonChip color="tertiary">{type}</IonChip>
        <IonButton color="dark" expand="block" onClick={() => setIsOpen(true)}>
          Details
        </IonButton>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{name}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>{description}</p>
          </IonContent>
        </IonModal>
      </IonCardContent>
    </IonCard>
  );
};

export default Location;
