import {LocationProps} from "./LocationProps";
import React from "react";
import {
    IonCard, IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonChip,
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs, IonThumbnail,
    IonTitle
} from "@ionic/react";
import {home, person, settings} from "ionicons/icons";

const Location: React.FC<LocationProps> = ({name, type, img}) => {
    return (
        <IonCard color="primary" className="ion-margin">
            <img alt={name} src={img} />
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonChip>{type}</IonChip>
            </IonCardContent>
        </IonCard>
    );
}

export default Location;