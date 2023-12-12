import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonToast
} from "@ionic/react";

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
    const [added, setAdded] = useState(false);
    const [addError, setAddError] = useState(false);

    useEffect( () => {
        const getToken = async () => {
            const result = await get("fsaLoginToken");
            setToken(result!);
        };

        getToken();
    }, []);

    const handleAdd = async () => {
        const userData = jwtDecode(token);
        const listOfParticipants = await getAllParticipants(token);
        const filteredParticipants = listOfParticipants.filter(participant =>
            participant.userEmail === userData.sub && participant.eventId === eventId);

        if(filteredParticipants.length > 0) {
            setAddError(true);
        }
        else {
            setAdded(false);
            const participantData = {
                user: userData.sub,
                eventId: eventId
            }
            const eventData = {
                eventId: eventId,
                participants: participants + 1
            }

            await addParticipant(token, participantData);
            await addParticipantToEvent(token, eventData);

            setAdded(true);
            window.location.reload();
        }
    }

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

                {added && (
                    <IonToast isOpen={true} className="ion-color-success" duration={2000} message={"Participant added successfully"}></IonToast>
                )}

                {addError && (
                    <IonToast isOpen={true} className="ion-color-danger" duration={2000} message={"You already participate at this event!!"}></IonToast>
                )}
            </IonCardContent>
        </IonCard>
    );
}
