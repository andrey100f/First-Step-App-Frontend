import { RouteComponentProps } from "react-router";
import React, { useContext, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonButton, IonSearchbar, IonGrid, IonRow, IonCol,
} from "@ionic/react";
import Location from "./Location";
import { LocationContext } from "./LocationProvider";
import "./styles/main.css";

const LocationList: React.FC<RouteComponentProps> = () => {
  const { locations, fetching, fetchingError } = useContext(LocationContext);
  const [filterType, setFilterType] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");

  return (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={fetching} message="Fetching Items" />

        <IonSearchbar className="ion-padding page" value={searchLocation} debounce={500} onIonChange={e => setSearchLocation(e.detail.value!)}
                      animated={true} placeholder="Search"></IonSearchbar>
        <IonGrid className="page">
          <IonRow>
            <IonCol>
              <IonButton onClick={() => setFilterType("Club")} className="frame" shape="round">Clubs</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => setFilterType("Restaurant")} className="frame" shape="round">Restaurants</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => setFilterType("Cafenea")} className="frame ion-text-wrap" shape="round">Coffee Shops</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => setFilterType("Biblioteca")} className="frame" shape="round">Libraries</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList className="page">
          {locations
              ?.filter(location =>
                  (!filterType || location.type === filterType) &&
                  location.name.toLowerCase().indexOf(searchLocation.toLowerCase()) >= 0)
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

export default LocationList;
