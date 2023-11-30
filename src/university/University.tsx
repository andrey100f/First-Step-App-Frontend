import React, {useContext, useState} from "react";
import {UniversityProps} from "./UniversityProps";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonContent, IonFabButton,
    IonHeader, IonIcon, IonList,
    IonModal,
    IonToolbar
} from "@ionic/react";
import {AnnouncementItemContext} from "../announcement/AnnouncementProvider";
import Announcement from "../announcement/Announcement";
import "./styles/main.css";
import {chevronBack} from "ionicons/icons";

const University: React.FC<UniversityProps> = ({universityId, name, img}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { announcements, fetching, fetchingError } = useContext(AnnouncementItemContext);

    return (
      <IonCard color="light" className="ion-margin university-card">
          <img width={325} height={183} alt={name} src={img} />
          <IonCardHeader>
              <IonCardTitle className="title">{name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
              <IonButton className="button-color" shape="round" onClick={() => setIsOpen(true)}>
                  Anunturi pentru studenti
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

                  <IonContent>
                      <IonList className="page">
                          {announcements
                              ?.filter(
                                  (announcement) => announcement.universityDto.name! === name
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
                  </IonContent>
              </IonModal>
          </IonCardContent>
      </IonCard>
    );
};

export default University;