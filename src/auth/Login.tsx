import React, { useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonContent,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";

import { usePreferences } from "../utils/usePreferemces";
import { AuthContext } from "./LoginProvider";

import "../utils/styles/main.css";
//Interfata pentru starea componentei de autentificare
interface LoginState {
  email?: string;
  password?: string;
}

/**
 * Componenta pentru pagina de autentificare
 * @param param0
 * @returns
 */
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { get } = usePreferences();
  const { isAuthenticated, isAuthenticating, login, authenticationError } =
    useContext(AuthContext);
  const [state, setState] = useState<LoginState>({});
  const { email, password } = state;
  const [token, setToken] = useState("");

  // Efect secundar pentru a obține și seta token-ul la încărcarea componentei
  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  // Funcții pentru gestionarea schimbărilor în câmpurile de email și parolă

  const handlePasswordChange = useCallback(
    (e: any) =>
      setState({
        ...state,
        password: e.detail.value || "",
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

  const handleLogin = useCallback(() => {
    login?.(email, password);
    setTimeout(() => {
      window.location.href = "/announcements";
    }, 500);
  }, [email, password, token]);

  const handleRegister = () => {
    history.push("/register");
  };

  const handleBack = () => {
    history.push("/hello");
  };

  // Efect secundar pentru redirecționarea utilizatorilor autentificați către pagina principală
  useEffect(() => {
    if (isAuthenticated || token) {
      history.push("/");
    }
  }, [isAuthenticated, token]);

  return (
    <IonPage>
      <IonContent>
        {/* Buton pentru revenirea la pagina anterioară */}
        <IonFabButton
          color="medium"
          className="ion-margin"
          onClick={handleBack}
        >
          <IonIcon icon={chevronBack}></IonIcon>
        </IonFabButton>
        {/* Titlu și subtitlu pentru pagina de autentificare */}
        <IonTitle className="login-title auth-title">Welcome Back!</IonTitle>
        <p className="login-subtitle">Enter Your Username and Password</p>
        {/* Formularul de autentificare cu câmpuri pentru email și parolă */}
        <div className="ion-padding login-background">
          <IonItem className="login-input email" color="transparent">
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
          {/* Butonul de autentificare */}
          <IonButton
            color="dark"
            className="ion-margin-top login-button"
            shape="round"
            onClick={handleLogin}
          >
            Log In
          </IonButton>
          {/* Butonul de inregistrare */}
          <IonButton
            color="dark"
            className="ion-margin-top login-button"
            shape="round"
            onClick={handleRegister}
          >
            Register
          </IonButton>
        </div>

        <IonLoading isOpen={isAuthenticating} />

        {/* Mesajul de eroare în caz de autentificare eșuată */}
        {authenticationError && (
          <IonToast
            isOpen={true}
            className="ion-color-danger"
            duration={2000}
            message={authenticationError.message || "Failed to authenticate"}
          ></IonToast>
        )}
      </IonContent>
    </IonPage>
  );
};
