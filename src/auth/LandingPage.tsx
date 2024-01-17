import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent, IonPage, IonTitle } from "@ionic/react";

import { usePreferences } from "../utils/usePreferemces";
import { AuthContext } from "./LoginProvider";

/**
 * Componenta pentru pagina de intrare
 * @param param0
 * @returns
 */
export const LandingPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { get } = usePreferences();
  const { isAuthenticated } = useContext(AuthContext);
  const [token, setToken] = useState("");

  // Efect secundar pentru a obține și seta token-ul la încărcarea componentei
  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  // Efect secundar pentru a redirecționa utilizatorii autentificați sau cu token către pagina principală
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
        {/* Imaginea de fundal pentru pagina de intrare */}
        <div className="landing-background"></div>
        {/* Titlurile pentru a încuraja utilizatorii să înceapă */}
        <IonTitle className="landing-title">Let's Get</IonTitle>
        <IonTitle className="landing-title">Started</IonTitle>
        {/* Butonul pentru a redirecționa utilizatorii către pagina de autentificare */}
        <IonButton
          color="dark"
          className="ion-margin-top login-button"
          shape="round"
          onClick={handleJoin}
        >
          Join Now
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
