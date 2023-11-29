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
  IonRow,
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
        <IonButton onClick={() => setIsOpen(true)}>{name}</IonButton>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonSearchbar animated={true} placeholder="Search"></IonSearchbar>
              <IonGrid>
                <IonRow>
                  <IonCol className="ion-margin frame">
                    <IonButton onClick={() => setIsOpen(true)}>
                      {(type = "All")}
                    </IonButton>
                  </IonCol>
                  <IonCol className="frame">
                    <IonButton onClick={() => setIsOpen(true)}>
                      {(type = "Clubs")}
                    </IonButton>
                  </IonCol>
                  <IonCol className="frame">
                    <IonButton
                      className="frame"
                      onClick={() => setIsOpen(true)}
                    >
                      {(type = "Restaurants")}
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      className="frame"
                      onClick={() => setIsOpen(true)}
                    >
                      {(type = "Coffee Shops")}
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      className="frame"
                      onClick={() => setIsOpen(true)}
                    >
                      {(type = "Libraries")}
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
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
