import React, {useContext, useEffect, useState} from "react";
import {AuthContext, AuthState} from "./AuthProvider";
import {usePreferences} from "../utils/usePreferemces";
import {Redirect, Route} from "react-router-dom";

export interface PrivateRouteProps {
    component: any,
    path: string,
    exact?: boolean
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext<AuthState>(AuthContext);
    const {get} = usePreferences();

    const [token, setToken] = useState("");
    useEffect(() => {
        const getToken = async () => {
            const result = await get("fsaLoginToken");
            setToken(result!);
        }

        getToken();
    }, []);

    return (
        <Route {...rest} render={props => {
            if(token !== "" || isAuthenticated) {
                console.log(token);
                return <Component {...props} />
            }
            return <Redirect to={{pathname: "/login"}} />
        }} />
    );
}