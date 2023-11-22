import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {login as loginApi } from "./AuthApi";
import {usePreferences} from "../utils/usePreferemces";

type LoginFn = (email?: string, password?: string) => void;

export interface AuthState {
    authenticationError: Error | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    login?: LoginFn;
    pendingAuthentication?: boolean;
    email?: string;
    password?: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isAuthenticating: false,
    authenticationError: null,
    pendingAuthentication: false
}

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const {get, set} = usePreferences();
    const [state, setState] = useState<AuthState>(initialState);
    const {isAuthenticated, isAuthenticating, authenticationError, pendingAuthentication} = state;
    const login = useCallback<LoginFn>(loginCallback, []);

    useEffect(authenticationEffect, [pendingAuthentication]);

    const value = {isAuthenticated, login, isAuthenticating, authenticationError};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

    function loginCallback(email?: string, password?: string): void {
        setState({
            ...state,
            pendingAuthentication: true,
            email,
            password
        });
    }

    function authenticationEffect() {
        let canceled = false;

        authenticate();

        return () => {
            canceled = true;
        }

        async function authenticate() {
            if(!pendingAuthentication) {
                return;
            }

            try {
                setState({
                    ...state,
                    isAuthenticating: true
                });

                const {email, password} = state;
                const {token} = await loginApi(email, password);
                await set("fsaLoginToken", token);
                console.log("token set");

                if(canceled) {
                    return
                }

                setState({
                    ...state,
                    pendingAuthentication: false,
                    isAuthenticated: true,
                    isAuthenticating: false
                });
            }
            catch (error) {
                if(canceled) {
                    return;
                }

                setState({
                    ...state,
                    authenticationError: error as Error,
                    pendingAuthentication: false,
                    isAuthenticating: false
                });
            }
        }
    }
};