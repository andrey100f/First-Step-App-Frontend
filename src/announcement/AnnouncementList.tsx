import {RouteComponentProps} from "react-router";
import React, {useContext} from "react";
import {IonContent, IonHeader, IonList, IonLoading, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Announcement from "./Announcement";
import {AnnouncementItemContext} from "./AnnouncementProvider";

const AnnouncementList: React.FC<RouteComponentProps> = () => {
    const {announcements, fetching, fetchingError} = useContext(AnnouncementItemContext);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle slot="start">First Step App</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching Items" />

                <IonList>
                    {announcements?.map(({title, text, category, img }) =>
                    <Announcement title={title} text={text} category={category} img={img} />)}
                </IonList>

                {fetchingError && (
                    <div>{fetchingError.message || "Failed to fetch items"}</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default AnnouncementList;