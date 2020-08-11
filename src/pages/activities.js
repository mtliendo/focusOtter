import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import Layout from '@common/Layout';
import Home from '../components/sections/Home';
import Navbar from '../components/common/Navbar/Navbar';

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
      </Router>
    </Layout>
  ) : (
    <Layout>
      <Navbar />
      <CenteredAuthComponent>
        <AmplifyAuthenticator />
      </CenteredAuthComponent>
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
