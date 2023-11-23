import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { EditUser } from "./auth/EditUser";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AnnouncementList from "./announcement/AnnouncementList";
import { AnnouncementProvider } from "./announcement/AnnouncementProvider";
import { home, location, person } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import LocationList from "./location/LocationList";
import { LocationProvider } from "./location/LocationProvider";
import { Login } from "./auth/Login";
import { AuthContext, AuthProvider, AuthState } from "./auth/AuthProvider";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Register } from "./auth/Register";
import { RegistrationProvider } from "./auth/RegistrationProvider";
import { usePreferences } from "./utils/usePreferemces";

setupIonicReact();

const App: React.FC = () => {
  const { get, set } = usePreferences();
  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const result = await get("fsaLoginToken");
      setToken(result!);
    };

    getToken();
  }, []);

  return (
    <IonApp>
      {token && (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <AuthProvider>
                <RegistrationProvider>
                  <Route path="/login" component={Login} exact={true} />
                  <Route path="/register" component={Register} exact={true} />
                  <LocationProvider>
                    <AnnouncementProvider>
                      <PrivateRoute
                        path="/announcements"
                        component={AnnouncementList}
                        exact={true}
                      />
                      <PrivateRoute
                        path="/locations"
                        component={LocationList}
                        exact={true}
                      />
                      <PrivateRoute
                        path="/edit"
                        component={EditUser}
                        exact={true}
                      />
                    </AnnouncementProvider>
                  </LocationProvider>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/announcements" />}
                  />
                </RegistrationProvider>
              </AuthProvider>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="announcements" href="/announcements">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Announcements</IonLabel>
              </IonTabButton>
              <IonTabButton tab="locations" href="/locations">
                <IonIcon aria-hidden="true" icon={location} />
                <IonLabel>Locations</IonLabel>
              </IonTabButton>
              <IonTabButton tab="edit" href="/edit">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Edit User</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      )}

      {!token && (
        <IonReactRouter>
          <IonRouterOutlet>
            <AuthProvider>
              <RegistrationProvider>
                <Route path="/login" component={Login} exact={true} />
                <Route path="/register" component={Register} exact={true} />
                <LocationProvider>
                  <AnnouncementProvider>
                    <PrivateRoute
                      path="/announcements"
                      component={AnnouncementList}
                      exact={true}
                    />
                    <PrivateRoute
                      path="/locations"
                      component={LocationList}
                      exact={true}
                    />
                    <PrivateRoute
                      path="/edit"
                      component={EditUser}
                      exact={true}
                    />
                  </AnnouncementProvider>
                </LocationProvider>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/announcements" />}
                />
              </RegistrationProvider>
            </AuthProvider>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};
export default App;
