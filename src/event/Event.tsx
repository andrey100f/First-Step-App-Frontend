import React from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip } from "@ionic/react";

import { EventProps } from "./EventProps";

import "../utils/styles/event.css";

export const Event: React.FC<EventProps> = ({name, description, participants
}) => {
    return (
        <IonCard color="light" className="ion-margin event-card">
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <p>{description}</p>
                <IonChip>{participants}</IonChip>
                <IonButton>Like</IonButton>
            </IonCardContent>
        </IonCard>
    );
}
