import React, {useCallback, useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";


interface LoginState {
    username?: string;
    password?: string;
}

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [state, setState] = useState<LoginState>({});
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
        }
    }, [isAuthenticated, token]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="ion-padding">
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput value={username} onIonChange={handleUsernameChange} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" value={password} onIonChange={handlePasswordChange}/>
                    </IonItem>
                    <IonButton className="ion-margin-top" expand="block" shape="round" fill="outline" onClick={handleLogin}>Login</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
