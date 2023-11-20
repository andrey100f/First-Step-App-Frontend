import React, {useCallback, useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";

interface SigninState {
    firstname?: string;
    lastname?: string;
    university?: string;
    username?: string;
    password?: string;
}

export const Signin: React.FC<RouteComponentProps> = ({history}) => {
    const [state, setState] = useState<SigninState>({});
    const {username, password} = state;


    const handlePasswordChange = useCallback((e: any) => setState({
        ...state,
        password: e.detail.value || ""
    }), [state]);

    const handleUsernameChange = useCallback((e: any) => setState({
        ...state,
        username: e.detail.value || ""
    }), [state]);

    const handleLogin = useCallback(() => {
        window.location.href = "/announcement";
    }, [username, password, token]);


    useEffect(() => {
        history.push("/announcement");
    },
}[isAuthenticated, token]);

return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Signin</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <div className="ion-padding">
                <IonItem>
                    <IonLabel position="floating">FirstName</IonLabel>
                    <IonInput value={firstname} onIonChange={handleFirstNameChange} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">LastName</IonLabel>
                    <IonInput value={lastname} onIonChange={handleLastNameChange} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">University</IonLabel>
                    <IonInput value={university} onIonChange={handleUniversityChange} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput value={username} onIonChange={handleUsernameChange} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" value={password} onIonChange={handlePasswordChange}/>
                </IonItem>
                <IonButton className="ion-margin-top" expand="block" shape="round" fill="outline" onClick={handleLogin}>Signin</IonButton>
            </div>
        </IonContent>
    </IonPage>
);
