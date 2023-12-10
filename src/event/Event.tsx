import React from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip} from "@ionic/react";

import { EventProps } from "./EventProps";

import "../utils/styles/event.css";
import {formatDate} from "../utils/utils";

export const Event: React.FC<EventProps> = ({name, description, participants, eventDate
}) => {
    return (
        <IonCard color="light" className="ion-margin event-card">
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
                <IonCardSubtitle>{formatDate(eventDate)}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <p>{description}</p>
                <IonChip>{participants}</IonChip>
                <IonButton>Like</IonButton>
            </IonCardContent>
        </IonCard>
    );
}
