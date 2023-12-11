import React, {useEffect, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip} from "@ionic/react";

import { EventProps } from "./EventProps";
import { addParticipant, addParticipantToEvent, getAllParticipants } from "../participant/PaticipantApi";

import "../utils/styles/event.css";
import {formatDate} from "../utils/utils";
import {usePreferences} from "../utils/usePreferemces";
import {jwtDecode} from "jwt-decode";

export const Event: React.FC<EventProps> = ({eventId, name, description, participants, eventDate
}) => {
    const { get } = usePreferences();
    const [token, setToken] = useState("");

    useEffect( () => {
        const getToken = async () => {
            const result = await get("fsaLoginToken");
            setToken(result!);
        };

        getToken();
    }, []);

    const handleAdd = async () => {
        const userData = jwtDecode(token);
        const participantData = {
            user: userData.sub,
            eventId: eventId
        }
        const eventData = {
            eventId: eventId,
            participants: participants + 1
        }
        console.log(participantData);
        console.log(eventData);
        await addParticipant(token, participantData);
        await addParticipantToEvent(token, eventData);
        // window.location.reload();
    }

    // const checkParticipants = async (eventId, user) => {
    //     const listOfParticipants = await getAllParticipants(token);
    //     listOfParticipants.filter(participant => participant.eventId === e)
    // }

    return (
        <IonCard color="light" className="ion-margin event-card">
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
                <IonCardSubtitle>{formatDate(eventDate)}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <p>{description}</p>
                <IonChip>{participants}</IonChip>
                <IonButton className="button-color" shape="round" onClick={handleAdd}>I participate</IonButton>
            </IonCardContent>
        </IonCard>
    );
}
