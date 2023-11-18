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
import Announcement from "./Announcement";
import { AnnouncementItemContext } from "./AnnouncementProvider";

const AnnouncementList: React.FC<RouteComponentProps> = () => {
  const { announcements, fetching, fetchingError } = useContext(
    AnnouncementItemContext
  );
  const [filterUniversity, setFilterUniversity] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const handleRestFilters = () => {
    setFilterUniversity("");
    setFilterCategory("");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">First Step App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonTitle className="ion-margin">Announcements</IonTitle>
        <IonSelect
          className="ion-margin"
          value={filterUniversity}
          placeholder="Select the university"
          onIonChange={(e) => setFilterUniversity(e.detail.value!)}
        >
          <IonSelectOption key="UBB" value="UBB">
            UBB
          </IonSelectOption>
          <IonSelectOption key="UTCN" value="UTCN">
            UTCN
          </IonSelectOption>
        </IonSelect>

        <IonSelect
          className="ion-margin"
          value={filterUniversity}
          placeholder="Select the category"
          onIonChange={(e) => setFilterUniversity(e.detail.value!)}
        >
          <IonSelectOption key="Practica" value="Practica">
            Practica
          </IonSelectOption>
          <IonSelectOption key="Burse" value="Burse">
            Burse
          </IonSelectOption>
        </IonSelect>

        <IonButton className="ion-margin" onClick={handleRestFilters}>
          Reset Filters
        </IonButton>
        <IonLoading isOpen={fetching} message="Fetching Items" />

        <IonList>
          {announcements
            ?.filter(
              (announcement) =>
                !filterUniversity ||
                announcement.universityDto.name! === filterUniversity
            )
            .filter(
              (announcement) =>
                !filterCategory || announcement.category! === filterCategory
            )
            .map(
              ({
                announcementId,
                title,
                text,
                category,
                img,
                url,
                universityDto,
              }) => (
                <Announcement
                  key={announcementId}
                  announcementId={announcementId}
                  title={title}
                  text={text}
                  category={category}
                  img={img}
                  url={url}
                  universityDto={universityDto}
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

export default AnnouncementList;
