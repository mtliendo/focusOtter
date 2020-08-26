import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Section, Container } from '@components/global';
import styled from 'styled-components';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import Home from '../client-side-pages/Home';
import Navbar from '../components/common/Navbar/Navbar';
import EditActivity from '../client-side-pages/EditActivity';
import PublicActivities from '../client-side-pages/PublicActivities';
import ActivityClock from '../client-side-pages/ActivityClock';
import NewActivity from '../client-side-pages/NewActivity';
import Journal from '../client-side-pages/Journal';

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <Layout>
      <Navbar user={user} />
      <Section>
        <Container>
          <Router>
            <Home path="/activities/home" />
            <NewActivity path="/activities/new" />
            <EditActivity path="/activities/edit/:activityID" />
            <PublicActivities path="/activities/public" />
            <Journal path="/activities/journal" />
            <ActivityClock path="/activities/activity-clock" />
          </Router>
        </Container>
      </Section>
      <Footer />
    </Layout>
  ) : (
    <Layout>
      <Navbar user={{}} />
      <CenteredAuthComponent>
        <AmplifyAuthenticator>
          <AmplifySignUp
            slot="sign-up"
            formFields={[
              { type: 'username' },
              { type: 'password' },
              { type: 'email' },
            ]}
          />
        </AmplifyAuthenticator>
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
