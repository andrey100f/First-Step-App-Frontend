import React, {useCallback, useContext, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
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
import {RegistrationContext} from "./RegistrationProvider";

interface RegisterState {
    name?: string;
    email?: string;
    password?: string;
    university?: string;
    faculty?: string;
}

export const Register: React.FC<RouteComponentProps> = ({history}) => {
    const {isRegistered, isRegistering, register, registrationError} = useContext(RegistrationContext);
    const [state, setState] = useState<RegisterState>({});
    const {name, email, password, university, faculty} = state;

    const handleNameChange = useCallback((e: any) => setState({
        ...state,
        name: e.detail.value || ""
    }), [state]);

    const handleEmailChange = useCallback((e: any) => setState({
        ...state,
        email: e.detail.value || ""
    }), [state]);

    const handlePasswordChange = useCallback((e: any) => setState({
        ...state,
        password: e.detail.value || ""
    }), [state]);

    const handleUniversityChange = useCallback((e: any) => setState({
        ...state,
        university: e.detail.value || ""
    }), [state]);

    const handleFacultyChange = useCallback((e: any) => setState({
        ...state,
        faculty: e.detail.value || ""
    }), [state]);

    const handleRegister = useCallback(() => {
        register?.(name, email, password, university, faculty);
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);
    }, [name, email, password, university, faculty]);

    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="ion-padding">
                    <IonItem>
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput value={name} onIonChange={handleNameChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput value={email} onIonChange={handleEmailChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" value={password} onIonChange={handlePasswordChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">University</IonLabel>
                        <IonInput value={university} onIonChange={handleUniversityChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Faculty</IonLabel>
                        <IonInput value={faculty} onIonChange={handleFacultyChange}/>
                    </IonItem>
                    <IonButton className="ion-margin-top" expand="block" shape="round" fill="outline"
                               onClick={handleRegister}>Sign Up</IonButton>
                    <IonButton className="ion-margin-top" expand="block" shape="round" fill="outline"
                               onClick={handleLogin}>Log In</IonButton>
                </div>

                <IonLoading isOpen={isRegistering} />

                {isRegistered && (
                    <IonToast isOpen={true} className="ion-color-success" duration={2000}
                              message={"Registered successfully"} ></IonToast>
                )}

                {registrationError && (
                    <IonToast isOpen={true} className="ion-color-danger" duration={2000}
                              message={registrationError.message || "Failed to register"} ></IonToast>
                )}
            </IonContent>
        </IonPage>
    );
}