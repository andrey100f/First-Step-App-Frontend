import React, { useCallback, useContext, useEffect, useState } from "react";
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToast, IonFabButton, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { chevronBack } from "ionicons/icons";

import { usePreferences } from "../utils/usePreferemces";
import { RegisterContext } from "./RegisterProvider";

import "../utils/styles/main.css";

interface RegisterState {
  name?: string;
  email?: string;
  password?: string;
  university?: string;
  faculty?: string;
}

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { get } = usePreferences();
  const { isRegistered, isRegistering, register, registrationError } =
    useContext(RegisterContext);
  const [state, setState] = useState<RegisterState>({});
  const { name, email, password, university, faculty } = state;
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaRegisterToken");
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

  const handleRegister = useCallback(() => {
    register?.(name, email, password, university, faculty);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }, [name, email, password, university, faculty]);

  useEffect(() => {
    if (isRegistered || token) {
      history.push("/");
    }
  }, [isRegistered, token]);

  const handleBack = () => {
    history.push("/login");
  };

  return (
    <IonPage>
      <IonContent>
        <IonFabButton color="medium" className="ion-margin" onClick={handleBack}>
          <IonIcon icon={chevronBack}></IonIcon>
        </IonFabButton>
        <IonTitle className="auth-title">Create Account</IonTitle>
        <div className="ion-padding register-background">
          <IonItem className="login-input email" color="transparent">
            <IonLabel position="floating">Name</IonLabel>
            <IonInput type="text" value={name} onIonChange={handleNameChange} />
          </IonItem>
          <IonItem className="login-input" color="transparent">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={handleEmailChange}/>
          </IonItem>
          <IonItem className="login-input" color="transparent">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={handlePasswordChange}/>
          </IonItem>
          <IonItem className="ion-margin" color="transparent">
            <IonSelect value={university} label="University" labelPlacement="floating" onIonChange={handleUniversityChange}>
              <IonSelectOption value="Universitatea Babes Bolyai">Universitatea Babes Bolyai</IonSelectOption>
              <IonSelectOption value="Universitatea Tehnica din Cluj-Napoca">Universitatea Tehnica din Cluj-Napoca</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem className="ion-margin" color="transparent">
            <IonSelect value={faculty} label="Faculty" labelPlacement="floating" onIonChange={handleFacultyChange}>
              <IonSelectOption value="Facultatea de Matematica si Informatica">Facultatea de Matematica si Informatica</IonSelectOption>
              <IonSelectOption value="Facultatea de Automatica si Calculatoare">Facultatea de Automatica si Calculatoare</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton color="dark" className="ion-margin-top login-button" shape="round" onClick={handleRegister}>Sign Up</IonButton>
        </div>

        <IonLoading isOpen={isRegistering} />

        {isRegistered && (
          <IonToast isOpen={true} className="ion-color-success" duration={2000} message={"Registered successfully"}></IonToast>
        )}

        {registrationError && (
          <IonToast isOpen={true} className="ion-color-danger" duration={2000} message={registrationError.message || "Failed to register"}></IonToast>
        )}
      </IonContent>
    </IonPage>
  );
};
