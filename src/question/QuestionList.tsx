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
  IonCol,
} from "@ionic/react";

import { Question } from "./Question";
import { QuestionContext } from "./QuestionProvider";

import "../utils/styles/main.css";
import "../utils/styles/location.css";

export const QuestionList: React.FC<RouteComponentProps> = () => {
  const { questions, fetching, fetchingError } = useContext(QuestionContext);
  const [filterType, setFilterType] = useState<string>("");
  const [searchQuestion, setSearchQuestion] = useState<string>("");

  return (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={fetching} message="Fetching Items" />
        {/* <IonGrid className="page">
          <IonRow>
            <IonCol>
              <IonButton onClick={() => setFilterType("Club")} className="button-frame" shape="round">Clubs</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => setFilterType("Restaurant")} className="button-frame" shape="round">Restaurants</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => setFilterType("Cafenea")} className="button-frame ion-text-wrap" shape="round">Coffee Shops</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={() => setFilterType("Biblioteca")} className="button-frame" shape="round">Libraries</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid> */}

        <IonList className="page">
          {questions
            //   ?.filter(location =>
            //       (!filterType || location.type === filterType) &&
            //       location.name.toLowerCase().indexOf(searchLocation.toLowerCase()) >= 0)
            ?.map(({ questionId, text, userDto, date, category }) => (
              <Question
                key={questionId}
                questionId={questionId}
                text={text}
                userDto={userDto}
                date={date}
                category={category}
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
