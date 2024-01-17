import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext, AuthState } from "./LoginProvider";
import { usePreferences } from "../utils/usePreferemces";

interface PrivateRouteProps {
  component: any;
  path: string;
  exact?: boolean;
}
/**
 * Componenta pentru gestionarea rutelor private
 * @param param0 - Proprietățile componentei PrivateRoute
 * @returns Componenta pentru rută privată sau redirecționează către pagina de salut
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useContext<AuthState>(AuthContext);
  const { get } = usePreferences();

  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token || isAuthenticated) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: "/hello" }} />;
      }}
    />
  );
};
