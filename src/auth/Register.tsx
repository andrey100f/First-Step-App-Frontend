import React, { useCallback, useContext, useEffect, useState } from "react";
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToast, IonFabButton, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { chevronBack } from "ionicons/icons";

import { usePreferences } from "../utils/usePreferemces";
import { RegisterContext } from "./RegisterProvider";

import "../utils/styles/main.css";
import {UniversityContext} from "../university/UniversityProvider";

interface RegisterState {
  name?: string;
  email?: string;
  password?: string;
  university?: string;
  faculty?: string;
}

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const {get } = usePreferences();
  const {isRegistered, isRegistering, register, registrationError} = useContext(RegisterContext);
  const [state, setState] = useState<RegisterState>({});
  const {name, email, password, university, faculty} = state;
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const {universities} = useContext(UniversityContext);

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

  const handleRegister = useCallback(() => {
    if(university === "Universitatea Babes-Bolyai" && (faculty !== "Facultatea de Matematica si Informatica" && faculty !== "Facultatea de Drept" && faculty !== "Facultatea de Stiinte Economice si Gestiunea Afacerilor")) {
      setError(true);
      return;
    }

    if(university === "Universitatea Tehnica din Cluj-Napoca" && (faculty !== "Facultatea de Automatica si Calculatoare" && faculty !== "Facultatea de Constructii" && faculty !== "Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei")) {
      setError(true);
      return;
    }

    if(university === "Universitatea de Medicina si Farmacie Iuliu Hatieganu" && (faculty !== "Facultatea Medicina" && faculty !== "Facultatea de Medicina Dentara" && faculty !== "Facultatea de Farmacie")) {
      setError(true);
      return;
    }

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
                <IonSelectOption value="Universitatea Babes-Bolyai">Universitatea Babes-Bolyai</IonSelectOption>
                <IonSelectOption value="Universitatea Tehnica din Cluj-Napoca">Universitatea Tehnica din Cluj-Napoca</IonSelectOption>
                <IonSelectOption value="Universitatea Tehnica din Cluj-Napoca">Universitatea de Medicina si Farmacie Iuliu Hatieganu</IonSelectOption>
                <IonSelectOption value="Universitatea De Stiinte Agricole si Medicina Veterinara">Universitatea De Stiinte Agricole si Medicina Veterinara</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className="ion-margin" color="transparent">
              <IonSelect value={faculty} label="Faculty" labelPlacement="floating" onIonChange={handleFacultyChange}>
                <IonSelectOption value="Facultatea de Matematica si Informatica">UBB - Facultatea de Matematica si Informatica</IonSelectOption>
                <IonSelectOption value="Facultatea de Drept">UBB - Facultatea de Drept</IonSelectOption>
                <IonSelectOption value="Facultatea de Stiinte Economice si Gestiunea Afacerilor">UBB - Facultatea de Stiinte Economice si Gestiunea Afacerilor</IonSelectOption>
                <IonSelectOption value="Facultatea de Chimie si Ingineria Mediului">UBB - Facultatea de Chimie si Ingineria Mediului</IonSelectOption>
                <IonSelectOption value="Facultatea de Biologie">UBB - Facultatea de Biologie</IonSelectOption>
                <IonSelectOption value="Facultatea de Geografie">UBB - Facultatea de Geografie</IonSelectOption>
                <IonSelectOption value="Facultatea de Litere">UBB - Facultatea de Litere</IonSelectOption>
                <IonSelectOption value="Facultatea de Istorie si Filozofie">UBB - Facultatea de Istorie si Filozofie</IonSelectOption>
                <IonSelectOption value="Facultatea de Sociologie si Asistenta Sociala">UBB - Facultatea de Sociologie si Asistenta Sociala</IonSelectOption>
                <IonSelectOption value="Facultatea de Psihologie si Stiinte ale Educatiei">UBB - Facultatea de Psihologie si Stiinte ale Educatiei</IonSelectOption>
                <IonSelectOption value="Facultatea de Studii Europene">UBB - Facultatea de Studii Europene</IonSelectOption>
                <IonSelectOption value="Facultatea de Business">UBB - Facultatea de Business</IonSelectOption>
                <IonSelectOption value="Facultatea de Stiinte Politice.Administrative si ale Comunicarii">UBB - Facultatea de Stiinte Politice.Administrative si ale Comunicarii</IonSelectOption>
                <IonSelectOption value="Facultatea de Educatie fizica si Sport">UBB - Facultatea de Educatie fizica si Sport</IonSelectOption>
                <IonSelectOption value="Facultatea de Teologie Ortodoxa">UBB - Facultatea de Teologie Ortodoxa</IonSelectOption>
                <IonSelectOption value="Facultatea de Teologie Greco-Catolica">UBB - Facultatea de Teologie Greco-Catolica</IonSelectOption>
                <IonSelectOption value="Facultatea de Teologie Reformata si Muzica">UBB - Facultatea de Teologie Reformata si Muzica</IonSelectOption>

                <IonSelectOption value="Facultatea de Automatica si Calculatoare">UTCN - Facultatea de Automatica si Calculatoare</IonSelectOption>
                <IonSelectOption value="Facultatea de Constructii">UTCN - Facultatea de Constructii</IonSelectOption>
                <IonSelectOption value="Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei">UTCN - Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei</IonSelectOption>
                <IonSelectOption value="Facultatea de Arhitectura si Urbanism">UTCN - Facultatea de Arhitectura si Urbanism</IonSelectOption>
                <IonSelectOption value="Facultatea de Autovehicule Rutiere, Mecatronica si Mecanica">UTCN - Facultatea de Autovehicule Rutiere, Mecatronica si Mecanica</IonSelectOption>
                <IonSelectOption value="Facultatea de Ingineria Materialelor si a Mediului">UTCN - Facultatea de Ingineria Materialelor si a Mediului</IonSelectOption>
                <IonSelectOption value="Facultatea de Inginerie a Instalatiilor">UTCN - Facultatea de Inginerie a Instalatiilor</IonSelectOption>
                <IonSelectOption value="Facultatea de Inginerie Electrica">UTCN - Facultatea de Inginerie Electrica</IonSelectOption>

                <IonSelectOption value="Facultatea Medicina">UMF - Facultatea Medicina</IonSelectOption>
                <IonSelectOption value="Facultatea de Medicina Dentara">UMF - Facultatea de Medicina Dentara</IonSelectOption>
                <IonSelectOption value="Facultatea de Farmacie">UMF - Facultatea de Farmacie</IonSelectOption>

                <IonSelectOption value="Facultatea de Stiinnta si Tehnologia Alimentelor">USAMV - FFacultatea de Agrigultura</IonSelectOption>
                <IonSelectOption value="Facultatea de Agrigultura">USAMV - Facultatea de Agrigultura</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton color="dark" className="ion-margin-top login-button" shape="round" onClick={handleRegister}
                       disabled={(!(email !== undefined && password !== undefined && university !== undefined && faculty !== undefined))}>Sign Up</IonButton>
          </div>

          <IonLoading isOpen={isRegistering} />

          {isRegistered && (
              <IonToast isOpen={true} className="ion-color-success" duration={2000} message={"Registered successfully"}></IonToast>
          )}

          {registrationError && (
              <IonToast isOpen={true} className="ion-color-danger" duration={2000} message={registrationError.message || "Failed to register"}></IonToast>
          )}

          {error && (
              <IonToast isOpen={true} className="ion-color-danger" duration={2000} message="Failed to register - The university does not have this faculty"></IonToast>
          )}
        </IonContent>
      </IonPage>
  );
};
