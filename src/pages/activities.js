import React, { useEffect } from 'react';
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

const initialActivityData = [
  {
    id: '1',
    category: 'Math',
    title: 'This is your very first activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: 1597209853,
    duration: 900000,
  },
  {
    id: '2',
    category: 'Science',
    title: 'This is your second activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: 1597208853,
    duration: 7200000,
  },
];

const App = ({ navigate }) => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState({});
  const [activityData, setActivityData] = React.useState(initialActivityData);
  const [sortedActivityData, setSortedActivityData] = React.useState();

  useEffect(() => {
    const sortedActivities = [...activityData].sort(
      (a, b) => a.timeStart - b.timeStart
    );

    setSortedActivityData(sortedActivities);
  }, [activityData]);

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const handleNewActivity = newActivity => {
    setActivityData([...activityData, newActivity]);
  };

  const handleEditActivity = selectedActivity => {
    const updatedActivityData = activityData.map(activityItem => {
      return activityItem.id === selectedActivity.id
        ? {
            ...selectedActivity,
          }
        : activityItem;
    });

    setActivityData(updatedActivityData);
    navigate('/activities/home');
  };

  const handleDeleteActivity = updatedActivityList => {
    setActivityData(updatedActivityList);
    navigate('/activities/home');
  };

  return authState === AuthState.SignedIn && user ? (
    <Layout>
      <Navbar user={user} />
      <Section>
        <Container>
          <Router>
            <Home path="/activities/home" data={sortedActivityData} />
            <EditActivity
              path="/activities/edit/:activityID"
              onEditActivity={handleEditActivity}
              onDeleteActivity={handleDeleteActivity}
              activityList={sortedActivityData}
            />
            <NewActivity
              path="/activities/new"
              onNewActivity={handleNewActivity}
            />
            <PublicActivities path="/activities/public" />
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
