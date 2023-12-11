import React, { useContext, useState } from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonFabButton,
    IonHeader,
    IonIcon, IonItem,
    IonList,
    IonLoading,
    IonModal, IonSelect,
    IonSelectOption,
    IonToolbar
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";

import { UniversityProps } from "./UniversityProps";
import { AnnouncementItemContext } from "../announcement/AnnouncementProvider";
import { Announcement } from "../announcement/Announcement";

import "../utils/styles/main.css";

export const University: React.FC<UniversityProps> = ({name, faculties, img}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { announcements, fetching, fetchingError } = useContext(AnnouncementItemContext);
    const [facultyFilter, setFacultyFilter] = useState("");

    return (
      <IonCard color="light" className="ion-margin university-card">
          <img width={325} height={183} alt={name} src={img} />
          <IonCardHeader>
              <IonCardTitle className="university-title">{name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
              <IonButton className="button-color" shape="round" onClick={() => setIsOpen(true)}>Anunturi pentru studenti</IonButton>

              <IonModal isOpen={isOpen}>
                  <IonHeader>
                      <IonToolbar>
                          <IonFabButton color="medium" className="ion-margin" onClick={() => setIsOpen(false)}>
                              <IonIcon icon={chevronBack}></IonIcon>
                          </IonFabButton>
                      </IonToolbar>
                  </IonHeader>

                  <IonContent>
                      <IonLoading isOpen={fetching} message="Fetching Items" />

                      <IonItem className="page-without-scrollbar">
                          <IonSelect className="ion-margin" label="Faculty" placeholder="Select the faculty" onIonChange={(e) => setFacultyFilter(e.detail.value)}>
                              {faculties?.map(faculty => (
                                  <IonSelectOption key={faculty.facultyId} value={faculty.name}>{faculty.name}</IonSelectOption>
                              ))}
                          </IonSelect>
                      </IonItem>

                      <IonButton className="button-color ion-margin" shape="round" onClick={() => setFacultyFilter("")}>Reset Filters</IonButton>

                      <IonList className="page">
                          {announcements
                              ?.filter((announcement) =>
                                  (!facultyFilter || facultyFilter === announcement.faculty) && announcement.university! === name)
                              .map(({announcementId, title, text, url, img, faculty, university}) => (
                                      <Announcement key={announcementId} announcementId={announcementId} title={title} text={text} url={url} img={img} faculty={faculty} university={university}/>
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
