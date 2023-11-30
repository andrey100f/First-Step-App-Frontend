import React, { useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToast } from "@ionic/react";
import { chevronBack } from "ionicons/icons";

import { usePreferences } from "../utils/usePreferemces";
import { AuthContext } from "./LoginProvider";

import "../utils/styles/main.css";

interface LoginState {
  email?: string;
  password?: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { get } = usePreferences();
  const { isAuthenticated, isAuthenticating, login, authenticationError } =
    useContext(AuthContext);
  const [state, setState] = useState<LoginState>({});
  const { email, password } = state;
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

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

  useEffect(() => {
    if (isAuthenticated || token) {
      history.push("/");
    }
  }, [isAuthenticated, token]);

  return (
    <IonPage>
      <IonContent>
        <IonFabButton color="medium" className="ion-margin" onClick={handleBack}>
          <IonIcon icon={chevronBack}></IonIcon>
        </IonFabButton>
        <IonTitle className="login-title auth-title">Welcome Back!</IonTitle>
        <p className="login-subtitle">Enter Your Username and Password</p>
        <div className="ion-padding login-background">
          <IonItem className="login-input email" color="transparent">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={handleEmailChange}/>
          </IonItem>
          <IonItem className="login-input" color="transparent">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={handlePasswordChange}/>
          </IonItem>
          <IonButton color="dark" className="ion-margin-top login-button" shape="round" onClick={handleLogin}>Log In</IonButton>
          <IonButton color="dark" className="ion-margin-top login-button" shape="round" onClick={handleRegister}>Register</IonButton>
        </div>

        <IonLoading isOpen={isAuthenticating} />

        {authenticationError && (
          <IonToast isOpen={true} className="ion-color-danger" duration={2000}
                    message={authenticationError.message || "Failed to authenticate"}></IonToast>
        )}
      </IonContent>
    </IonPage>
  );
};
