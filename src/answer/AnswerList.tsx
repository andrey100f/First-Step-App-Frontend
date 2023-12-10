import { RouteComponentProps } from "react-router";
import React, { useContext, useState } from "react";
import {
    IonContent,
    IonList,
    IonLoading,
    IonPage,
    IonButton,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol, IonItem, IonTextarea, IonInput, IonCardContent, IonCard,
} from "@ionic/react";

import { Answer } from "./Answer";
import { AnswerContext } from "./AnswerProvider";

import "../utils/styles/main.css";
import "../utils/styles/location.css";

export const AnswerList: React.FC<RouteComponentProps> = () => {
    const { answers, fetching, fetchingError } = useContext(AnswerContext);
    const [filterType, setFilterType] = useState<string>("");
    const [searchQuestion, setSearchQuestion] = useState<string>("");

    return (
        <IonPage>
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching Items" />

                <IonItem className="page-without-scrollbar">
                    <IonInput className="ion-margin" label="Add Question" labelPlacement="floating" placeholder="Enter text" />
                </IonItem>
                <IonButton className="button-color ion-margin" shape="round" expand="block">Add</IonButton>

                <IonGrid className="page">
                    <IonRow>
                        <IonCol>
                            <IonButton onClick={() => setFilterType("Academic")} className="button-frame" shape="round">Academic</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => setFilterType("Student Life")} className="button-frame" shape="round">Student Life</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => setFilterType("Career Development")} className="button-frame ion-text-wrap" shape="round">Career Development</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => setFilterType("")} className="button-frame" shape="round">Reset Filters</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonList className="page">
                    {answers
                        ?.filter(answer =>
                            (!filterType || answer.question === filterType))
                        ?.map(({ answerId, text,answerDate, question }) => (
                            <Answer
                                key={answerId}
                                text={text}
                                answerDate={answerDate}
                                question={question}
                            />
                        ))}
                </IonList>

                {fetchingError && (
                    <div>{fetchingError.message || "Failed to fetch items"}</div>
                )}

            </IonContent>
        </IonPage>
    );
};
