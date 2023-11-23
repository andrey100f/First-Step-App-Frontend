import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {register as registerApi } from "./AuthApi";
import {usePreferences} from "../utils/usePreferemces";

type RegistrationFn = (name?: string, email?: string, password?: string, university?: string, faculty?: string) => void;

export interface RegistrationState {
    registrationError: Error | null;
    isRegistered: boolean;
    isRegistering: boolean;
    register?: RegistrationFn;
    pendingRegistration?: boolean;
    name?: string;
    email?: string;
    password?: string;
    university?: string;
    faculty?: string;
}

const initialState: RegistrationState = {
    isRegistered: false,
    isRegistering: false,
    registrationError: null,
    pendingRegistration: false
}

export const RegistrationContext = React.createContext<RegistrationState>(initialState);

interface RegistrationProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({children}) => {
    const [state, setState] = useState<RegistrationState>(initialState);
    const {isRegistered, isRegistering, registrationError, pendingRegistration} = state;
    const register = useCallback<RegistrationFn>(registerCallback, []);

    useEffect(registrationEffect, [pendingRegistration]);

    const value = {isRegistered, register, isRegistering, registrationError};

    return (
        <RegistrationContext.Provider value={value}>
            {children}
        </RegistrationContext.Provider>
    );

    function registerCallback(name?: string, email?: string, password?: string, university?: string, faculty?: string): void {
        setState({
            ...state,
            pendingRegistration: true,
            name,
            email,
            password,
            university,
            faculty
        });
    }

    function registrationEffect() {
        let canceled = false;

        signup();

        return () => {
            canceled = true;
        }

        async function signup() {
            if(!pendingRegistration) {
                return;
            }

            try {
                setState({
                    ...state,
                    isRegistering: true
                });

                const {name, email, password, university, faculty} = state;
                const {token} = await registerApi(name, email, password, university, faculty);

                if(canceled) {
                    return
                }

                setState({
                    ...state,
                    pendingRegistration: false,
                    isRegistered: true,
                    isRegistering: false
                });
            }
            catch (error) {
                if(canceled) {
                    return;
                }

                setState({
                    ...state,
                    registrationError: error as Error,
                    pendingRegistration: false,
                    isRegistering: false
                });
            }
        }
    }
};