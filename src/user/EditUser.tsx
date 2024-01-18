import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { jwtDecode } from "jwt-decode";

import { usePreferences } from "../utils/usePreferemces";
import { getAllUsers, updateUser } from "./UserApi";

import "../utils/styles/main.css";

/**
 * Componenta pentru editarea profilului utilizatorului.
 * @returns Componenta React pentru editarea profilului utilizatorului.
 */
export const EditUser: React.FC<RouteComponentProps> = () => {
  const { get, set } = usePreferences();
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  const handleLogOut = async () => {
    await set("fsaLoginToken", "");
    window.location.href = "/hello";
  };

  const setUser = async (token: string) => {
    const userData = jwtDecode(token);
    const users = await getAllUsers(token);
    const user = users?.find((user) => user.email === userData.sub);

    setName(user!.name);
    setOldEmail(user!.email);
    setNewEmail(user!.email);
    setPassword(user!.password);
    setUniversity(user!.university);
    setFaculty(user!.faculty);
  };

  useEffect(() => {
    if (token) {
      setUser(token);
    }
  }, [token]);

  const handleUpdate = async () => {
    const updateData = { name, oldEmail, newEmail, password };
    await updateUser(updateData, token);
    setUpdated(true);
    await setUser(token);
  };

  /**
   * Returneaza componenta pentru editatrea profilului utilizatorului
   */
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
          {/* Input pentru nume */}
          <IonItem className="ion-margin login-input email" color="transparent">
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              value={name}
              onIonChange={(e) => setName(e.detail.value || "")}
            />
          </IonItem>
          {/* Input pentru email */}
          <IonItem className="ion-margin login-input" color="transparent">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              value={oldEmail}
              onIonChange={(e) => {
                setOldEmail(oldEmail);
                setNewEmail(e.detail.value || "");
              }}
            />
          </IonItem>
          {/* Input pentru parola */}
          <IonItem className="ion-margin login-input" color="transparent">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value || "")}
            />
          </IonItem>
          {/* Input pentru univeristate */}
          <IonItem className="ion-margin" color="transparent">
            <IonSelect
              value={university}
              label="University"
              labelPlacement="floating"
              disabled
            >
              <IonSelectOption value="Universitatea Babes-Bolyai">
                Universitatea Babes-Bolyai
              </IonSelectOption>
              <IonSelectOption value="Universitatea Tehnica din Cluj-Napoca">
                Universitatea Tehnica din Cluj-Napoca
              </IonSelectOption>
              <IonSelectOption value="Universitatea Tehnica din Cluj-Napoca">
                Universitatea de Medicina si Farmacie Iuliu Hatieganu
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          {/* Input pentru facultate */}
          <IonItem className="ion-margin" color="transparent">
            <IonSelect
              value={faculty}
              label="Faculty"
              labelPlacement="floating"
              disabled
            >
              <IonSelectOption value="Facultatea de Matematica si Informatica">
                Facultatea de Matematica si Informatica
              </IonSelectOption>
              <IonSelectOption value="Facultatea de Drept">
                Facultatea de Drept
              </IonSelectOption>
              <IonSelectOption value="Facultatea de Stiinte Economice si Gestiunea Afacerilor">
                Facultatea de Stiinte Economice si Gestiunea Afacerilor
              </IonSelectOption>
              <IonSelectOption value="Facultatea de Automatica si Calculatoare">
                Facultatea de Automatica si Calculatoare
              </IonSelectOption>
              <IonSelectOption value="Facultatea de Constructii">
                Facultatea de Constructii
              </IonSelectOption>
              <IonSelectOption value="Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei">
                Facultatea de Electronica, Telecomunicatii si Tehnologia
                Informatiei
              </IonSelectOption>
              <IonSelectOption value="Facultatea Medicina">
                Facultatea Medicina
              </IonSelectOption>
              <IonSelectOption value="Facultatea de Medicina Dentara">
                Facultatea de Medicina Dentara
              </IonSelectOption>
              <IonSelectOption value="Facultatea de Farmacie">
                Facultatea de Farmacie
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          {/** Butonul pentru update */}
          <IonButton
            className="ion-margin-top login-button edit-button"
            shape="round"
            color="dark"
            onClick={handleUpdate}
          >
            Update
          </IonButton>
        </div>

        {updated && (
          <IonToast
            isOpen={true}
            className="ion-color-success"
            duration={2000}
            message={"Updated successfully"}
          ></IonToast>
        )}
      </IonContent>
    </IonPage>
  );
};
