import React, { useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { usePreferences } from "../utils/usePreferemces";
import "./styles/main.css";

interface UpdateState {
  name?: string;
  email?: string;
  password?: string;
  university?: string;
  faculty?: string;
}

export const EditUser: React.FC<RouteComponentProps> = ({ history }) => {
  const [state, setState] = useState<UpdateState>({});
  const { name, email, password, university, faculty } = state;
  const { get, set } = usePreferences();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  const handleNameChange = useCallback(
    (e: any) =>
      setState({
        ...state,
        name: e.detail.value || "",
      }),
    [state]
  );

  const handleEmailChange = useCallback(
    (e: any) =>
      setState({
        ...state,
        email: e.detail.value || "",
      }),
    [state]
  );

  const handlePasswordChange = useCallback(
    (e: any) =>
      setState({
        ...state,
        password: e.detail.value || "",
      }),
    [state]
  );

  const handleUniversityChange = useCallback(
    (e: any) =>
      setState({
        ...state,
        university: e.detail.value || "",
      }),
    [state]
  );

  const handleFacultyChange = useCallback(
    (e: any) =>
      setState({
        ...state,
        faculty: e.detail.value || "",
      }),
    [state]
  );

  const handleLogOut = async () => {
    await set("fsaLoginToken", "");
    window.location.href = "/hello";
  };

  return (
    <IonPage>
        <IonToolbar>
          <IonButton
            className="ion-margin"
            slot="end"
            color="dark"
            shape="round"
            onClick={handleLogOut}
          >
            Log Out
          </IonButton>
        </IonToolbar>

      <IonContent>
        <IonTitle className="edit-user-title">Edit Profile</IonTitle>
        <div className="edit-user-background">
          <IonItem className="ion-margin login-input email" color="transparent">
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={name} onIonChange={handleNameChange} />
          </IonItem>
          <IonItem className="ion-margin login-input" color="transparent">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={email} onIonChange={handleEmailChange} />
          </IonItem>
          <IonItem className="ion-margin login-input" color="transparent">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={handlePasswordChange}
            />
          </IonItem>
            <IonItem className="ion-margin" color="transparent">
                <IonSelect value={university} label="University" labelPlacement="floating">
                    <IonSelectOption value="Universitatea Babes Bolyai">Universitatea Babes Bolyai</IonSelectOption>
                    <IonSelectOption value="Universitatea Tehnica din Cluj-Napoca">Universitatea Tehnica din Cluj-Napoca</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem className="ion-margin" color="transparent">
                <IonSelect value={faculty} label="Faculty" labelPlacement="floating">
                    <IonSelectOption value="Facultatea de Matematica si Informatica">Facultatea de Matematica si Informatica</IonSelectOption>
                    <IonSelectOption value="Facultatea de Automatica si Calculatoare">Facultatea de Automatica si Calculatoare</IonSelectOption>
                </IonSelect>
            </IonItem>
          <IonButton
            className="ion-margin-top login-button edit"
            shape="round"
            color="dark"
          >
            Update
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
