import {RouteComponentProps} from "react-router";
import React, {useContext} from "react";
import {IonContent, IonHeader, IonList, IonLoading, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Location from "./Location";
import {LocationContext} from "./LocationProvider";

const LocationList: React.FC<RouteComponentProps> = () => {
    const {locations, fetching, fetchingError} = useContext(LocationContext);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle slot="start">First Step App</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonTitle className="ion-margin">Locations</IonTitle>
                <IonLoading isOpen={fetching} message="Fetching Items" />

                <IonList>
                    {locations?.map(({name, type, img}) =>
                        <Location name={name} type={type} img={img} />)}
                </IonList>

                {fetchingError && (
                    <div>{fetchingError.message || "Failed to fetch items"}</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default LocationList;