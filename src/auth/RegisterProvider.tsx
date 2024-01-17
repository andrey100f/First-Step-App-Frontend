import React, { useCallback, useEffect, useState } from "react";

import { register as registerApi } from "./AuthApi";
import { ItemProviderProps } from "../utils/provider";

type RegisterFn = (
  name?: string,
  email?: string,
  password?: string,
  university?: string,
  faculty?: string
) => void;

/**
 * Interfata pentru inregistrare
 */
interface RegisterState {
  registrationError: Error | null;
  isRegistered: boolean;
  isRegistering: boolean;
  register?: RegisterFn;
  pendingRegistration?: boolean;
  name?: string;
  email?: string;
  password?: string;
  university?: string;
  faculty?: string;
}

const initialState: RegisterState = {
  isRegistered: false,
  isRegistering: false,
  registrationError: null,
  pendingRegistration: false,
};
/**
 * Context pentru gestionarea stării înregistrării unui cont nou
 */
export const RegisterContext = React.createContext<RegisterState>(initialState);

/**
 * Provider pentru gestionarea stării înregistrării unui cont nou
 * @param  param0 - Proprietățile providerului
 * @returns - Componenta providerului
 */
export const RegisterProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [state, setState] = useState<RegisterState>(initialState);
  const {
    isRegistered,
    isRegistering,
    registrationError,
    pendingRegistration,
  } = state;
  const register = useCallback<RegisterFn>(registerCallback, []);

  useEffect(registerEffect, [pendingRegistration]);

  const value = { isRegistered, register, isRegistering, registrationError };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );

  /**
   * Funcție de callback pentru a iniția procesul de înregistrare
   * @param name - Numele utilizatorului
   * @param email - Adresa de email
   * @param password - Parola
   * @param university - Universitatea
   * @param faculty - Facultatea
   */
  function registerCallback(
    name?: string,
    email?: string,
    password?: string,
    university?: string,
    faculty?: string
  ): void {
    setState({
      ...state,
      pendingRegistration: true,
      name,
      email,
      password,
      university,
      faculty,
    });
  }

  function registerEffect() {
    let canceled = false;

    signup();

    return () => {
      canceled = true;
    };

    async function signup() {
      if (!pendingRegistration) {
        return;
      }

      try {
        setState({
          ...state,
          isRegistering: true,
        });

        const { name, email, password, university, faculty } = state;
        const { token } = await registerApi(
          name,
          email,
          password,
          university,
          faculty
        );

        if (!canceled) {
          return;
        }

        setState({
          ...state,
          pendingRegistration: false,
          isRegistered: true,
          isRegistering: false,
        });
      } catch (error) {
        if (!canceled) {
          return;
        }

        setState({
          ...state,
          registrationError: error as Error,
          pendingRegistration: false,
          isRegistering: false,
        });
      }
    }
  }
};
