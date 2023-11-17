import { LocationProps } from "./LocationProps";
import React from "react";
import { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonThumbnail,
  IonTitle,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
} from "@ionic/react";
import { home, person, settings } from "ionicons/icons";

const Location: React.FC<LocationProps> = ({ name, type, img }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <IonCard color="light" className="ion-margin">
      <img width={380} height={213.75} alt={name} src={img} />
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonChip outline={true}>{type}</IonChip>
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
            <p>Descriere</p>
          </IonContent>
        </IonModal>
      </IonCardContent>
    </IonCard>
  );
};

export default Location;
