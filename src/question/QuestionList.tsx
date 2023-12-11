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

import { Question } from "./Question";
import { QuestionContext } from "./QuestionProvider";

import "../utils/styles/main.css";
import "../utils/styles/location.css";

export const QuestionList: React.FC<RouteComponentProps> = () => {
  const { questions, fetching, fetchingError } = useContext(QuestionContext);
  const [filterType, setFilterType] = useState<string>("");

  return (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={fetching} message="Fetching Items" />

        <IonItem className="page-without-scrollbar">
          <IonTextarea className="ion-margin" label="Add Question" labelPlacement="floating" placeholder="Enter text" />
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
          {questions
              ?.filter(question =>
                  (!filterType || question.category === filterType))
            ?.map(({ questionId, text, user, questionDate, category }) => (
              <Question
                key={questionId}
                questionId={questionId}
                text={text}
                user={user}
                questionDate={questionDate}
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
