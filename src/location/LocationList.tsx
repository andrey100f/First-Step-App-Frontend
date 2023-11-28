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
  IonButton,
} from "@ionic/react";
import Location from "./Location";
import { LocationContext } from "./LocationProvider";
import "./styles/main.css";

const LocationList: React.FC<RouteComponentProps> = () => {
  const { locations, fetching, fetchingError } = useContext(LocationContext);
  const [filterType, setFilterType] = useState<string>("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">First Step App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonTitle className="ion-margin">Locations</IonTitle>
        <IonSelect
          className="ion-margin"
          value={filterType}
          placeholder="Select the lcoation type"
          onIonChange={(e) => setFilterType(e.detail.value!)}
        >
          <IonSelectOption key="club" value="club">
            club
          </IonSelectOption>
          <IonSelectOption key="restaurant" value="restaurant">
            restaurant
          </IonSelectOption>
          <IonSelectOption key="cafenea" value="cafenea">
            cafenea
          </IonSelectOption>
          <IonSelectOption key="biblioteca" value="biblioteca">
            biblioteca
          </IonSelectOption>
        </IonSelect>

        <IonButton className="ion-margin" onClick={() => setFilterType("")}>
          Reset Filters
        </IonButton>
        <IonLoading isOpen={fetching} message="Fetching Items" />

        <IonList>
          {locations
            ?.filter(
              (location) =>
                !filterType ||
                location.type!.toLowerCase() === filterType.toLowerCase()
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
