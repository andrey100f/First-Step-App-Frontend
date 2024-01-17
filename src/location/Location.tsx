import React from "react";
import { useState, useContext } from "react";

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
  IonFabButton,
  IonIcon,
  IonText,
  IonList,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";

import { LocationProps } from "./LocationProps";
import { EventContext } from "../event/EventProvider";
import { Event } from "../event/Event";
import { MyMap } from "../utils/location/MyMap";

import "../utils/styles/location.css";

/**
 * Componenta Location care afiseaza detalii despre o locatie, inclusiv evenimente asociate si harta.
 * @param param0 - Proprietatile locatiei.
 * @returns - Elementul React pentru afisarea detaliilor locatiei.
 */
export const Location: React.FC<LocationProps> = ({
  locationId,
  name,
  type,
  latitude,
  longitude,
  img,
  description,
  site,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const days = description.split("\n");
  const { events, fetching, fetchingError } = useContext(EventContext);

  const handleClick = () => {
    window.location.href = site;
  };

  return (
    /**
     * Componenta IonCard care are un titlu, un subtitlu, un buton care care te redirectioneaza pe o alta pagina
     * unde ai mai multe detalii despre eveniment, cum ar fii programul, locatia pe harta si o lista de evenimente.
     */
    <IonCard color="light" className="ion-margin location-card">
      <img width={380} height={213.75} alt={name} src={img} />
      <IonCardHeader>
        <IonCardTitle className="location-title">{name}</IonCardTitle>
        <IonCardSubtitle className="location-subtitle">{type}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButton
          className="button-color"
          shape="round"
          onClick={() => setIsOpen(true)}
        >
          See More Details
        </IonButton>

        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonFabButton
                color="medium"
                className="ion-margin"
                onClick={() => setIsOpen(false)}
              >
                <IonIcon icon={chevronBack}></IonIcon>
              </IonFabButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding page-without-scrollbar">
            <IonCard className="program-card">
              <IonCardContent>
                <IonCardSubtitle className="program-title">
                  Program:
                </IonCardSubtitle>
                {days.map((day) => (
                  <IonText
                    className="program-text"
                    key={"" + locationId + `${day} program`}
                  >
                    {day}
                  </IonText>
                ))}
                <IonButton
                  className="button-color"
                  shape="round"
                  onClick={handleClick}
                >
                  Go to website
                </IonButton>
              </IonCardContent>
            </IonCard>

            <IonCard className="map-card">
              <IonCardContent>
                {latitude && longitude && (
                  <MyMap
                    key={"" + locationId + " location"}
                    lat={latitude}
                    lng={longitude}
                  />
                )}
              </IonCardContent>
            </IonCard>

            <IonList className="page">
              {events
                ?.filter((event) => event.locationName === name)
                .map(
                  ({
                    eventId,
                    name,
                    description,
                    participants,
                    locationName,
                    eventDate,
                  }) => (
                    <Event
                      key={eventId}
                      eventId={eventId}
                      name={name}
                      description={description}
                      participants={participants}
                      locationName={locationName}
                      eventDate={eventDate}
                    />
                  )
                )}
            </IonList>

            {fetchingError && (
              <div>{fetchingError.message || "Failed to fetch items"}</div>
            )}
          </IonContent>
        </IonModal>
      </IonCardContent>
    </IonCard>
  );
};
