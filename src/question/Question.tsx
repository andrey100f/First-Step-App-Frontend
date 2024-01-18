import React, { useContext, useEffect, useState } from "react";
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
  IonTextarea,
  IonToast,
} from "@ionic/react";

import { formatDate } from "../utils/utils";
import { AnswerContext } from "../answer/AnswerProvider";
import { chevronBack } from "ionicons/icons";
import { Answer } from "../answer/Answer";
import { usePreferences } from "../utils/usePreferemces";
import { jwtDecode } from "jwt-decode";
import { addAnswer } from "../answer/AnswerApi";

import "../utils/styles/question.css";
import "../utils/styles/main.css";

/**
 * Componenta Question pentru afișarea întrebărilor și gestionarea răspunsurilor.
 * @param param0 - Proprietățile întrebării.
 * @returns Componenta Question.
 */
export const Question: React.FC<QuestionProps> = ({
  questionId,
  text,
  user,
  questionDate,
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { answers, fetching, fetchingError } = useContext(AnswerContext);
  const { get } = usePreferences();
  const [token, setToken] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  const handleAdd = async () => {
    setAdded(false);
    const userData = jwtDecode(token);
    const answerData = {
      user: userData.sub,
      text: answerText,
      question: questionId,
    };
    await addAnswer(token, answerData);
    window.location.reload();
    setAdded(true);
  };

  /**
   * Componenta IonCard care contine titlul format din numele utilizatorului, data la care a fost adaugata intrebarea
   * categoria din care se afla intrebarea, iar apoi un buton de Reply unde iti poti adauga raspunsul
   */
  return (
    <IonCard color="light" className="ion-margin question-card">
      <IonCardHeader>
        <IonCardTitle>{user}</IonCardTitle>
        <IonCardSubtitle>{formatDate(questionDate)}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonChip>{category}</IonChip>
        <IonText className="question-text ion-margin">{text}</IonText>
        <IonButton
          className="button-color"
          shape="round"
          onClick={() => setIsOpen(true)}
        >
          Reply
        </IonButton>

        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonFabButton
                color="medium"
                className="ion-margin"
                onClick={() => setIsOpen(false)}
              >
                <IonIcon icon={chevronBack}></IonIcon>
              </IonFabButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding page-without-scrollbar">
            <IonItem className="page-without-scrollbar">
              <IonTextarea
                className="ion-margin"
                label="Add Answer"
                labelPlacement="floating"
                placeholder="Enter text"
                onIonChange={(e) => setAnswerText(e.detail.value || "")}
              />
            </IonItem>
            <IonButton
              className="button-color ion-margin"
              shape="round"
              expand="block"
              onClick={handleAdd}
              disabled={!(answerText !== "")}
            >
              Add
            </IonButton>

            <IonList className="page">
              {answers
                ?.filter((answer) => answer.question === questionId)
                .map(({ answerId, text, answerDate, user, question }) => (
                  <Answer
                    key={answerId}
                    answerId={answerId}
                    text={text}
                    answerDate={answerDate}
                    user={user}
                    question={question}
                  />
                ))}
            </IonList>

            {fetchingError && (
              <div>{fetchingError.message || "Failed to fetch items"}</div>
            )}

            {added && (
              <IonToast
                isOpen={true}
                className="ion-color-success"
                duration={2000}
                message={"Answer added successfully"}
              ></IonToast>
            )}
          </IonContent>
        </IonModal>
      </IonCardContent>
    </IonCard>
  );
};
