import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import Home from '../client-side-pages/Home';
import Navbar from '../components/common/Navbar/Navbar';
import EditActivity from '../client-side-pages/EditActivity';
import PublicActivities from '../client-side-pages/PublicActivities';
import ActivityClock from '../client-side-pages/ActivityClock';
import NewActivity from '../client-side-pages/NewActivity';

const App = ({ navigate }) => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <Layout>
      <Navbar />
      <Router>
        <Home path="/activities/home" />
        <EditActivity path="/activities/edit/:activityID" />
        <NewActivity path="/activities/new" />
        <PublicActivities path="/activities/public" />
        <ActivityClock path="/activities/activity-clock" />
      </Router>
      <Footer />
    </Layout>
  ) : (
    <Layout>
      <Navbar />
      <CenteredAuthComponent>
        <AmplifyAuthenticator />
      </CenteredAuthComponent>
      <Footer />
    </Layout>
  );
};

const CenteredAuthComponent = styled.section`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
