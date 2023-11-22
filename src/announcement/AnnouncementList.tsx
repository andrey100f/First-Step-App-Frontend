import { RouteComponentProps } from "react-router";
import React, {useContext, useEffect, useState} from "react";
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
import {usePreferences} from "../utils/usePreferemces";

const AnnouncementList: React.FC<RouteComponentProps> = () => {
  const { announcements, fetching, fetchingError } = useContext(
    AnnouncementItemContext
  );
  const [filterUniversity, setFilterUniversity] = useState<string>("");
  const {get, set} = usePreferences();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);


  const handleRestFilters = () => {
    setFilterUniversity("");
  };

  const handleLogOut = async () => {
    await set("fsaLoginToken", "");
    window.location.href = "/login";
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">First Step App</IonTitle>
          <IonButton className="ion-margin-end" slot="end" color="danger" size="small" fill="outline"
                     shape="round" onClick={handleLogOut}>Log Out</IonButton>
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
