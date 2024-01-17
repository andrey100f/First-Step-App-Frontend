import { RouteComponentProps } from "react-router";
import React, { useContext, useState } from "react";
import {
  IonContent,
  IonList,
  IonLoading,
  IonPage,
  IonButton,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import { Location } from "./Location";
import { LocationContext } from "./LocationProvider";

import "../utils/styles/main.css";
import "../utils/styles/location.css";

/**
 * Componenta pentru afișarea și filtrarea listei de locații.
 * @returns - Componenta React.
 */
export const LocationList: React.FC<RouteComponentProps> = () => {
  const { locations, fetching, fetchingError } = useContext(LocationContext);
  const [filterType, setFilterType] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");

  return (
    <IonPage>
      <IonContent>
        {/*<IonLoading isOpen={fetching} message="Fetching Items" />*/}

        {/* Bara de căutare pentru filtrarea locațiilor după nume */}
        <IonSearchbar
          className="ion-padding page"
          value={searchLocation}
          debounce={500}
          onIonChange={(e) => setSearchLocation(e.detail.value!)}
          animated={true}
          placeholder="Search"
        ></IonSearchbar>
        {/* Grilă cu butoane pentru filtrarea după tip */}
        <IonGrid className="page">
          <IonRow>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("Club")}
                className="button-frame"
                shape="round"
              >
                Clubs
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("Restaurant")}
                className="button-frame"
                shape="round"
              >
                Restaurants
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("Cafenea")}
                className="button-frame ion-text-wrap"
                shape="round"
              >
                Coffee Shops
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("")}
                className="button-frame"
                shape="round"
              >
                Reset Filters
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* Lista de locații afișate conform filtrării */}
        <IonList className="page">
          {locations
            ?.filter(
              (location) =>
                (!filterType || location.type === filterType) &&
                location.name
                  .toLowerCase()
                  .indexOf(searchLocation.toLowerCase()) >= 0
            )
            .map(
              ({
                locationId,
                name,
                street,
                number,
                type,
                latitude,
                longitude,
                img,
                description,
                site,
              }) => (
                <Location
                  key={locationId}
                  locationId={locationId}
                  name={name}
                  street={street}
                  number={number}
                  latitude={parseFloat(latitude.toString())}
                  longitude={parseFloat(longitude.toString())}
                  type={type}
                  img={img}
                  description={description}
                  site={site}
                />
              )
            )}
        </IonList>

        {fetchingError && (
          <div>{fetchingError.message || "Failed to fetch items"}</div>
        )}
      </IonContent>
    </IonPage>
  );
};
