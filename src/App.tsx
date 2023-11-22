import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AnnouncementList from "./announcement/AnnouncementList";
import {AnnouncementProvider} from "./announcement/AnnouncementProvider";
import {home, location} from "ionicons/icons";
import React, {useContext} from "react";
import LocationList from "./location/LocationList";
import {LocationProvider} from "./location/LocationProvider";
import {Login} from "./auth/Login";
import {AuthContext, AuthProvider, AuthState} from "./auth/AuthProvider";
import {PrivateRoute} from "./auth/PrivateRoute";

setupIonicReact();

const App: React.FC = () => {
    const {isAuthenticated} = useContext<AuthState>(AuthContext);
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <AuthProvider>
                            <Route path="/login" component={Login} exact={true}/>
                            <LocationProvider>
                                <AnnouncementProvider>
                                    <PrivateRoute path="/announcements" component={AnnouncementList} exact={true}/>
                                    <PrivateRoute path="/locations" component={LocationList} exact={true}/>
                                </AnnouncementProvider>
                            </LocationProvider>
                            <Route exact path="/" render={() => <Redirect to="/announcements"/>}/>
                        </AuthProvider>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="announcements" href="/announcements">
                            <IonIcon aria-hidden="true" icon={home}/>
                            <IonLabel>Announcements</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="locations" href="/locations">
                            <IonIcon aria-hidden="true" icon={location}/>
                            <IonLabel>Locations</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>

            </IonReactRouter>
        </IonApp>
    )
};
export default App;
