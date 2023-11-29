import { LocationProps } from "./LocationProps";
import React from "react";
import { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCardSubtitle,
  IonSearchbar,
  IonGrid,
  IonCol,
  IonRow, IonFabButton, IonIcon,
} from "@ionic/react";
import MyMap from "../utils/location/MyMap";
import { chevronBack, search } from "ionicons/icons";
import "./styles/main.css";

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
    <IonCard color="light" className="ion-margin location-card">
      <img width={380} height={213.75} alt={name} src={img} />
      <IonCardHeader>
        <IonCardTitle className="title">{name}</IonCardTitle>
        <IonCardSubtitle className="subtitle">{type}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButton className="button-color" shape="round" onClick={() => setIsOpen(true)}>
          See More Details
        </IonButton>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonFabButton
                  color="medium"
                  className="ion-margin"
                  onClick={() => setIsOpen(false)}>
                <IonIcon icon={chevronBack}></IonIcon>
              </IonFabButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {days.map((day) => (
              <p key={"" + locationId + `${day} program`}>{day}</p>
            ))}

            {latitude && longitude && (
              <MyMap
                key={"" + locationId + " location"}
                lat={latitude}
                lng={longitude}
              />
            )}
          </IonContent>
        </IonModal>
      </IonCardContent>
    </IonCard>
  );
};

export default Location;
