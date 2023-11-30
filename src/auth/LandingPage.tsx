import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent, IonPage, IonTitle } from "@ionic/react";

import { usePreferences } from "../utils/usePreferemces";
import { AuthContext } from "./LoginProvider";

export const LandingPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { get } = usePreferences();
  const { isAuthenticated } = useContext(AuthContext);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated || token) {
      history.push("/");
    }
  }, [isAuthenticated, token]);

  const handleJoin = () => {
    history.push("/login");
  };

  return (
    <IonPage>
      <IonContent>
        <div className="landing-background"></div>
        <IonTitle className="landing-title">Let's Get</IonTitle>
        <IonTitle className="landing-title">Started</IonTitle>
        <IonButton color="dark" className="ion-margin-top login-button" shape="round" onClick={handleJoin}>Join Now</IonButton>
      </IonContent>
    </IonPage>
  );
};
