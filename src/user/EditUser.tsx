import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { jwtDecode } from "jwt-decode";

import { usePreferences } from "../utils/usePreferemces";

import "../utils/styles/main.css";
import {getAllUsers} from "./UserApi";

export const EditUser: React.FC<RouteComponentProps> = () => {
  const { get, set } = usePreferences();
  const [token, setToken] = useState("");

  const [name, setName] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");

  useEffect( () => {
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
      const user = users?.find(user => user.email === userData.sub);

      setName(user!.name);
      setOldEmail(user!.email);
      setNewEmail(user!.email);
      setPassword(user!.password);
      setUniversity(user!.universityDto!.name);
      setFaculty(user!.facultyDto!.name);
  }

    useEffect(() => {
        if(token) {
            setUser(token);
        }
    }, [token]);

    const handleUpdate = async () => {
        const updateData = {name, newEmail, oldEmail, password, university, faculty}
        console.log(updateData);
    };

  return (
    <IonPage>
        <IonToolbar>
          <IonButton className="ion-margin" slot="end" color="dark" shape="round" onClick={handleLogOut}>Log Out</IonButton>
        </IonToolbar>

      <IonContent>
        <IonTitle className="edit-user-title">Edit Profile</IonTitle>
        <div className="edit-user-background">
          <IonItem className="ion-margin login-input email" color="transparent">
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={name} onIonChange={e => setName(e.detail.value || "")} />
          </IonItem>
          <IonItem className="ion-margin login-input" color="transparent">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={oldEmail} onIonChange={e => {
                setOldEmail(oldEmail);
                setNewEmail(e.detail.value || "");
                }} />
          </IonItem>
          <IonItem className="ion-margin login-input" color="transparent">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value || "")}/>
          </IonItem>
            <IonItem className="ion-margin" color="transparent">
                <IonSelect value={university} label="University" labelPlacement="floating" onIonChange={e => setUniversity(e.detail.value || "")}>
                    <IonSelectOption value="Universitatea Babes Bolyai">Universitatea Babes Bolyai</IonSelectOption>
                    <IonSelectOption value="Universitatea Tehnica din Cluj-Napoca">Universitatea Tehnica din Cluj-Napoca</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem className="ion-margin" color="transparent">
                <IonSelect value={faculty} label="Faculty" labelPlacement="floating" onIonChange={e => setFaculty(e.detail.value || "")}>
                    <IonSelectOption value="Facultatea de Matematica si Informatica">Facultatea de Matematica si Informatica</IonSelectOption>
                    <IonSelectOption value="Facultatea de Automatica si Calculatoare">Facultatea de Automatica si Calculatoare</IonSelectOption>
                </IonSelect>
            </IonItem>
          <IonButton className="ion-margin-top login-button edit-button" shape="round" color="dark" onClick={handleUpdate}>Update</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
