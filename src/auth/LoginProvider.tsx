import React, { useCallback, useEffect, useState } from "react";

import { login as loginApi } from "./AuthApi";
import { usePreferences } from "../utils/usePreferemces";
import { ItemProviderProps } from "../utils/provider";

/**Tipul functiei de login */
type LoginFn = (email?: string, password?: string) => void;

/* Interfata pentru starea de autentificare */
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
  pendingAuthentication: false,
};

/** Crearea contextului de autenticicare */
export const AuthContext = React.createContext<AuthState>(initialState);

/** Provider-ul pentru gestionarea starii de autentificare */
export const LoginProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const { set } = usePreferences();
  const [state, setState] = useState<AuthState>(initialState);
  const {
    isAuthenticated,
    isAuthenticating,
    authenticationError,
    pendingAuthentication,
  } = state;
  const login = useCallback<LoginFn>(loginCallback, []);

  useEffect(authenticationEffect, [pendingAuthentication]);

  const value = {
    isAuthenticated,
    login,
    isAuthenticating,
    authenticationError,
  };

  // Randerea componentei provider cu valoarea contextului
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  /**
   * Funcția apelată la încercarea de autentificare
   * @param email email-ul pentru autentificare
   * @param password parola pentru autentificare
   */
  function loginCallback(email?: string, password?: string): void {
    setState({
      ...state,
      pendingAuthentication: true,
      email,
      password,
    });
  }

  function authenticationEffect() {
    let canceled = false;

    authenticate();

    return () => {
      canceled = true;
    };
    /**
     * Funcția asincronă pentru efectuarea autentificării
     */
    async function authenticate() {
      if (!pendingAuthentication) {
        return;
      }

      try {
        setState({
          ...state,
          isAuthenticating: true,
        });

        const { email, password } = state;
        const { token } = await loginApi(email, password);
        await set("fsaLoginToken", token);

        if (!canceled) {
          return;
        }

        setState({
          ...state,
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
        });
      } catch (error) {
        if (!canceled) {
          return;
        }

        setState({
          ...state,
          authenticationError: error as Error,
          pendingAuthentication: false,
          isAuthenticating: false,
        });
      }
    }
  }
};
