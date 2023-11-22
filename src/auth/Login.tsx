import React, {useCallback, useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {usePreferences} from "../utils/usePreferemces";
import {AuthContext} from "./AuthProvider";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel, IonLoading,
    IonPage,
    IonTitle, IonToast,
    IonToolbar
} from "@ionic/react";

interface LoginState {
    email?: string;
    password?: string;
}

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const {get} = usePreferences();
    const {isAuthenticated, isAuthenticating, login, authenticationError} = useContext(AuthContext);
    const [state, setState] = useState<LoginState>({});
    const {email, password} = state;
    const [token, setToken] = useState("");

    useEffect(() => {
        const getToken = async () => {
            const result = await get("fsaLoginToken");
            setToken(result!);
        };

        getToken();
    }, []);


    const handlePasswordChange = useCallback((e: any) => setState({
        ...state,
        password: e.detail.value || ""
    }), [state]);

    const handleEmailChange = useCallback((e: any) => setState({
        ...state,
        email: e.detail.value || ""
    }), [state]);

    const handleLogin = useCallback(() => {
        login?.(email, password);
        history.push("/");
    }, [email, password, token]);


    useEffect(() => {
        if (isAuthenticated || token !== "") {
            history.push("/");
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
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput value={email} onIonChange={handleEmailChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" value={password} onIonChange={handlePasswordChange}/>
                    </IonItem>
                    <IonButton className="ion-margin-top" expand="block" shape="round" fill="outline"
                               onClick={handleLogin}>Login</IonButton>
                </div>

                <IonLoading isOpen={isAuthenticating} />

                {authenticationError && (
                    <IonToast isOpen={true} className="ion-color-danger" duration={2000}
                              message={authenticationError.message || "Failed to authenticate"} ></IonToast>
                )}
            </IonContent>
        </IonPage>
    );
};
