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
    <IonCard color="primary" className="ion-margin">
      <img alt={name} src={img} />
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonChip>{type}</IonChip>
        <IonButton expand="block" onClick={() => setIsOpen(true)}>
          Open
        </IonButton>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              illum quidem recusandae ducimus quos reprehenderit. Veniam,
              molestias quos, dolorum consequuntur nisi deserunt omnis id illo
              sit cum qui. Eaque, dicta.
            </p>
          </IonContent>
        </IonModal>
      </IonCardContent>
    </IonCard>
  );
};

export default Location;
