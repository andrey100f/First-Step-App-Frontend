import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext, AuthState } from "./LoginProvider";
import { usePreferences } from "../utils/usePreferemces";

interface PrivateRouteProps {
  component: any;
  path: string;
  exact?: boolean;
}

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
