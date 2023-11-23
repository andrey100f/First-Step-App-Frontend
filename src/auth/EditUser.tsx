import React, { useCallback, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Update</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput value={name} onIonChange={handleNameChange} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={email} onIonChange={handleEmailChange} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={handlePasswordChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">University</IonLabel>
            <IonInput value={university} onIonChange={handleUniversityChange} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Faculty</IonLabel>
            <IonInput value={faculty} onIonChange={handleFacultyChange} />
          </IonItem>
          <IonButton
            className="ion-margin-top"
            expand="block"
            shape="round"
            fill="outline"
          >
            Update
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
