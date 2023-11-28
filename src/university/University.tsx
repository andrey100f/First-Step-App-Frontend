import React, {useContext, useState} from "react";
import {UniversityProps} from "./UniversityProps";
import {
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonContent,
    IonHeader, IonList,
    IonModal, IonTitle,
    IonToolbar
} from "@ionic/react";
import MyMap from "../utils/location/MyMap";
import {AnnouncementItemContext} from "../announcement/AnnouncementProvider";
import Announcement from "../announcement/Announcement";

const University: React.FC<UniversityProps> = ({universityId, name, img}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { announcements, fetching, fetchingError } = useContext(AnnouncementItemContext);

    return (
      <IonCard color="light" className="ion-margin">
          <img width={380} height={213.75} alt={name} src={img} />
          <IonCardHeader>
              <IonCardTitle>{name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
              <IonButton color="primary" shape="round" onClick={() => setIsOpen(true)}>
                  Anunturi pentru studenti
              </IonButton>

              <IonModal isOpen={isOpen}>
                  <IonHeader>
                      <IonToolbar>
                          <IonButtons slot="end">
                              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                          </IonButtons>
                      </IonToolbar>
                  </IonHeader>

                  <IonContent className="ion-padding">
                      <IonList>
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