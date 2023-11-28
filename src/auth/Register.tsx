import React, { useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { usePreferences } from "../utils/usePreferemces";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { RegisterContext } from "./RegisterProvider";
import "./styles/main.css";
import { Simulate } from "react-dom/test-utils";
import { AuthContext } from "./LoginProvider";
import { chevronBack, chevronForwardCircle, handLeft } from "ionicons/icons";

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

  const handleLogin = () => {
    history.push("/login");
  };

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
        <IonFabButton
          color="medium"
          className="ion-margin"
          onClick={handleBack}
        >
          <IonIcon icon={chevronBack}></IonIcon>
        </IonFabButton>
        <IonTitle className="register-title">Create Account</IonTitle>
        <div className="ion-padding register-background">
          <IonItem className="login-input email" color="transparent">
            <IonLabel position="floating">Name</IonLabel>
            <IonInput type="text" value={name} onIonChange={handleNameChange} />
          </IonItem>
          <IonItem className="login-input" color="transparent">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={handleEmailChange}
            />
          </IonItem>
          <IonItem className="login-input" color="transparent">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={handlePasswordChange}
            />
          </IonItem>
          <IonItem className="login-input" color="transparent">
            <IonLabel position="floating">University</IonLabel>
            <IonInput
              type="text"
              value={university}
              onIonChange={handleUniversityChange}
            />
          </IonItem>
          <IonItem className="login-input" color="transparent">
            <IonLabel position="floating">Faculty</IonLabel>
            <IonInput
              type="text"
              value={faculty}
              onIonChange={handleFacultyChange}
            />
          </IonItem>
          <IonButton
            color="dark"
            className="ion-margin-top login-button"
            shape="round"
            onClick={handleRegister}
          >
            Sign Up
          </IonButton>
        </div>

        <IonLoading isOpen={isRegistering} />

        {isRegistered && (
          <IonToast
            isOpen={true}
            className="ion-color-success"
            duration={2000}
            message={"Registered successfully"}
          ></IonToast>
        )}

        {registrationError && (
          <IonToast
            isOpen={true}
            className="ion-color-danger"
            duration={2000}
            message={registrationError.message || "Failed to register"}
          ></IonToast>
        )}
      </IonContent>
    </IonPage>
  );
};
