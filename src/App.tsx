import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact,} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect, useState } from "react";

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

import { AnnouncementProvider } from "./announcement/AnnouncementProvider";
import {home, informationCircleOutline, location, person} from "ionicons/icons";
import { LocationList } from "./location/LocationList";
import { LocationProvider } from "./location/LocationProvider";
import { Login } from "./auth/Login";
import { LoginProvider } from "./auth/LoginProvider";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Register } from "./auth/Register";
import { RegisterProvider } from "./auth/RegisterProvider";
import { usePreferences } from "./utils/usePreferemces";
import { LandingPage } from "./auth/LandingPage";
import { UniversityList } from "./university/UniversityList";
import { UniversityProvider } from "./university/UniversityProvider";
import { EventProvider } from "./event/EventProvider";
import { EditUser } from "./user/EditUser";

import "./utils/styles/main.css";
import {QuestionProvider} from "./question/QuestionProvider";
import {QuestionList} from "./question/QuestionList";
import {AnswerProvider} from "./answer/AnswerProvider";

setupIonicReact();

const App: React.FC = () => {
  const {get} = usePreferences();
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
              <LoginProvider>
                <RegisterProvider>
                  <Route path="/hello" component={LandingPage} exact={true} />
                  <Route path="/login" component={Login} exact={true} />
                  <Route path="/register" component={Register} exact={true} />
                  <LocationProvider>
                    <AnnouncementProvider>
                      <UniversityProvider>
                        <EventProvider>
                          <QuestionProvider>
                            <AnswerProvider>
                              <PrivateRoute path="/announcements" component={UniversityList} exact={true}/>
                              <PrivateRoute path="/locations" component={LocationList} exact={true}/>
                              <PrivateRoute path="/questions" component={QuestionList} exact={true}/>
                              <PrivateRoute path="/edit" component={EditUser} exact={true}/>
                            </AnswerProvider>
                          </QuestionProvider>
                        </EventProvider>
                      </UniversityProvider>
                    </AnnouncementProvider>
                  </LocationProvider>
                  <Route exact path="/" render={() => <Redirect to="/announcements" />}/>
                </RegisterProvider>
              </LoginProvider>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className="tab-bar">
              <IonTabButton tab="announcements" href="/announcements">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Announcements</IonLabel>
              </IonTabButton>
              <IonTabButton tab="locations" href="/locations">
                <IonIcon aria-hidden="true" icon={location} />
                <IonLabel>Locations</IonLabel>
              </IonTabButton>
              <IonTabButton tab="questions" href="/questions">
                <IonIcon aria-hidden="true" icon={informationCircleOutline} />
                <IonLabel>Forum</IonLabel>
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
            <LoginProvider>
              <RegisterProvider>
                <Route path="/hello" component={LandingPage} exact={true} />
                <Route path="/login" component={Login} exact={true} />
                <Route path="/register" component={Register} exact={true} />
                <LocationProvider>
                  <AnnouncementProvider>
                    <UniversityProvider>
                      <EventProvider>
                        <QuestionProvider>
                          <AnswerProvider>
                            <PrivateRoute path="/announcements" component={UniversityList} exact={true}/>
                            <PrivateRoute path="/locations" component={LocationList} exact={true}/>
                            <PrivateRoute path="/questions" component={QuestionList} exact={true}/>
                            <PrivateRoute path="/edit" component={EditUser} exact={true}/>
                          </AnswerProvider>
                        </QuestionProvider>
                      </EventProvider>
                    </UniversityProvider>
                  </AnnouncementProvider>
                </LocationProvider>
                <Route exact path="/" render={() => <Redirect to="/announcements" />}/>
              </RegisterProvider>
            </LoginProvider>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};
export default App;
