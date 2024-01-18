import { RouteComponentProps } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import {
  IonContent,
  IonList,
  IonLoading,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";

import { Question } from "./Question";
import { QuestionContext } from "./QuestionProvider";
import { jwtDecode } from "jwt-decode";
import { usePreferences } from "../utils/usePreferemces";
import { addQuestion } from "./QuestionApi";

import "../utils/styles/main.css";
import "../utils/styles/location.css";

/**
 * Componentă pentru afișarea listei de întrebări.
 * @returns Componenta React pentru afișarea listei de întrebări.
 */
export const QuestionList: React.FC<RouteComponentProps> = () => {
  const { get } = usePreferences();
  const [token, setToken] = useState("");

  const { questions, fetching, fetchingError } = useContext(QuestionContext);
  const [filterType, setFilterType] = useState<string>("");
  const [questionText, setQuestionText] = useState("");
  const [category, setCategory] = useState("");
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
    const questionData = {
      user: userData.sub,
      text: questionText,
      category: category,
    };
    await addQuestion(token, questionData);
    window.location.reload();
    setAdded(true);
  };

  return (
    <IonPage>
      <IonContent>
        {/*<IonLoading isOpen={fetching} message="Fetching Items" />*/}

        {/* Input pentru adăugarea unei noi întrebări */}
        <IonItem className="page-without-scrollbar">
          <IonTextarea
            className="ion-margin"
            label="Add Question"
            labelPlacement="floating"
            placeholder="Enter text"
            onIonChange={(e) => setQuestionText(e.detail.value || "")}
          />
        </IonItem>

        {/* Meniu drop-down pentru a selecta categoria întrebării */}
        <IonItem className="page-without-scrollbar">
          <IonSelect
            className="ion-margin"
            label="Category"
            placeholder="Select the category"
            onIonChange={(e) => setCategory(e.detail.value)}
          >
            <IonSelectOption value="Academic">Academic</IonSelectOption>
            <IonSelectOption value="Student Life">Student Life</IonSelectOption>
            <IonSelectOption value="Career Development">
              Career Development
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Buton pentru adăugarea întrebării */}
        <IonButton
          className="button-color ion-margin"
          shape="round"
          expand="block"
          onClick={handleAdd}
          disabled={!(category !== "" && questionText !== "")}
        >
          Add
        </IonButton>

        {/* Grid pentru butoanele de filtrare după categorie */}
        <IonGrid className="page">
          <IonRow>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("Academic")}
                className="button-frame"
                shape="round"
              >
                Academic
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("Student Life")}
                className="button-frame"
                shape="round"
              >
                Student Life
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("Career Development")}
                className="button-frame ion-text-wrap"
                shape="round"
              >
                Career Development
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                onClick={() => setFilterType("")}
                className="button-frame"
                shape="round"
              >
                Reset Filters
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Listă de întrebări, filtrată după categorie */}
        <IonList className="page">
          {questions
            ?.filter(
              (question) => !filterType || question.category === filterType
            )
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

        {added && (
          <IonToast
            isOpen={true}
            className="ion-color-success"
            duration={2000}
            message={"Question added successfully"}
          ></IonToast>
        )}
      </IonContent>
    </IonPage>
  );
};
