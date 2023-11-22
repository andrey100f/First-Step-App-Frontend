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
import MyMap from "../utils/location/MyMap";

const Location: React.FC<LocationProps> = ({
  locationId,
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
  const days = description.split("\n");

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

            {days.map(day =>
              <p key={"" + locationId + `${day} program`}>{day}</p>
            )}

            {latitude && longitude &&
                <MyMap key={"" + locationId + " location"}
                    lat={latitude}
                    lng={longitude}
                />}
          </IonContent>
        </IonModal>
      </IonCardContent>
    </IonCard>
  );
};

export default Location;
