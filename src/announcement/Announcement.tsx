import {AnnouncementProps} from "./AnnouncementProps";
import React from "react";
import {
    IonCard, IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs, IonThumbnail,
    IonTitle
} from "@ionic/react";
import {home, person, settings} from "ionicons/icons";
import "./styles/main.css"

const Announcement: React.FC<AnnouncementProps> = ({title, text, category, img, url}) => {
    return (
        <IonCard color="tertiary" className="ion-margin card">
            <IonCardHeader>
                <IonCardTitle className="title">{title}</IonCardTitle>
                <IonCardSubtitle>{text}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <img width="50px" height="50px" alt="UBB Mate Info" src={img} />
                <a className="ion-float-end" href={url}>See more details</a></IonCardContent>
        </IonCard>
    );
}

export default Announcement;