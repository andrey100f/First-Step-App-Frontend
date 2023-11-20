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
import {calendar, call, home, location, person, settings} from "ionicons/icons";
import React from "react";
import LocationList from "./location/LocationList";
import {LocationProvider} from "./location/LocationProvider";
import {Login} from "./SignIn/Login";
import {Signin} from "./SignIn/Signin";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonTabs>
      <IonRouterOutlet>
          <Route path="/Login" component={Login} exact={true} />
          <Route path="/Signin" component={Signin} exact={true} />
          <LocationProvider>
        <AnnouncementProvider>
          <Route path="/announcements" component={AnnouncementList} exact={true} />
            <Route path="/locations" component={LocationList} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/announcements" />}/>
        </AnnouncementProvider>
          </LocationProvider>
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
        </IonTabBar>
        </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
