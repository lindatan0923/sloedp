import { Redirect, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { 
  IonApp, 
  IonRouterOutlet, 
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';
import { store } from './store';

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
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

import PresidentPage from './pages/PresidentPage';
import Parliament from './pages/Parliament';
import ChairPerson from './pages/ChairPerson';
import Mayor from './pages/Mayor';
import Councilor from './pages/Councilor';
import About from './pages/about';

const Splash = React.lazy(() => import('./pages/splash'));
const CandidateProfile = React.lazy(() => import('./pages/CandidateProfile'));
const PartyProfile = React.lazy(() => import('./pages/PartyProfile'));

setupIonicReact();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
      <Suspense fallback={<div>Loading...</div>}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/splash" />
            </Route>
            <Route exact path="/splash" component={Splash}>
            </Route>
            <Route exact path="/president" render={() => <PresidentPage />}>
            </Route>
            <Route exact path="/about" render={() => <About />}>
            </Route>
            <Route exact path="/mayor" render={() => <Mayor />}>
            </Route>
            <Route exact path="/parliamentary" render={() => <Parliament />}>
            </Route>
            <Route exact path="/chairperson" render={() => <ChairPerson />}>
            </Route>
            <Route exact path="/councilor" render={() => <Councilor />}>
            </Route>
            <Route exact path="/candidate/:id" render={() => <CandidateProfile />}>
            </Route>
            <Route exact path="/party/:id" render={() => <PartyProfile />}>
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
        {/* <IonNav id="content" root={() => <Splash />}></IonNav> */}
        </Suspense>
      </IonApp>
    </Provider>
  );
};

export default App;