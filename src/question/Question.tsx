import React, {useContext, useState} from "react";
import { QuestionProps } from "./QuestionProps";
import {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonButton,
    IonText,
    IonChip,
    IonModal,
    IonHeader,
    IonToolbar,
    IonFabButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
} from "@ionic/react";

import {formatDate} from "../utils/utils";

import "../utils/styles/question.css";
import "../utils/styles/main.css";
import {AnswerContext} from "../answer/AnswerProvider";
import {chevronBack} from "ionicons/icons";
import {MyMap} from "../utils/location/MyMap";
import {Event} from "../event/Event";
import {Answer} from "../answer/Answer";

export const Question: React.FC<QuestionProps> = ({ questionId, text, user, questionDate, category }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {answers, fetching, fetchingError} = useContext(AnswerContext);

  return (
    <IonCard color="light" className="ion-margin question-card">
      <IonCardHeader>
        <IonCardTitle>{user}</IonCardTitle>
        <IonCardSubtitle>{formatDate(questionDate)}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
          <IonChip>{category}</IonChip>
        <IonText className="question-text ion-margin">{text}</IonText>
        <IonButton className="button-color" shape="round" onClick={() => setIsOpen(true)}>Reply</IonButton>

          <IonModal isOpen={isOpen}>
              <IonHeader>
                  <IonToolbar>
                      <IonFabButton color="medium" className="ion-margin" onClick={() => setIsOpen(false)}>
                          <IonIcon icon={chevronBack}></IonIcon>
                      </IonFabButton>
                  </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding page-without-scrollbar">
                  <IonItem className="page-without-scrollbar">
                      <IonTextarea className="ion-margin" label="Add Answer" labelPlacement="floating" placeholder="Enter text" />
                  </IonItem>
                  <IonButton className="button-color ion-margin" shape="round" expand="block">Add</IonButton>

                  <IonList className="page">
                      {answers
                          ?.filter(answer => answer.question === questionId)
                          .map(({answerId, text, answerDate, user, question}) => (
                              <Answer key={answerId} answerId={answerId} text={text} answerDate={answerDate}
                                     user={user} question={question} />
                          ))}
                  </IonList>

                  {fetchingError && (
                      <div>{fetchingError.message || "Failed to fetch items"}</div>
                  )}
              </IonContent>
          </IonModal>
      </IonCardContent>
    </IonCard>
  );
};
