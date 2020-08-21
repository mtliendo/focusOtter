import React, { useEffect, useState, useReducer } from 'react';
import { Router } from '@reach/router';
import { Section, Container } from '@components/global';
import styled from 'styled-components';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import moment from 'moment';
import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import Home from '../client-side-pages/Home';
import Navbar from '../components/common/Navbar/Navbar';
import EditActivity from '../client-side-pages/EditActivity';
import PublicActivities from '../client-side-pages/PublicActivities';
import ActivityClock from '../client-side-pages/ActivityClock';
import NewActivity from '../client-side-pages/NewActivity';
// import Journal from '../client-side-pages/Journal';
const initialActivityData = [
  {
    id: '1',
    categories: ['Math'],
    title: 'This is your very first activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: 1597209853,
    duration: 900000,
    isPublic: false,
  },
  {
    id: '2',
    categories: ['Science'],
    title: 'This is your second activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: 1597208853,
    duration: 7200000,
    isPublic: false,
  },
];
const initialActivityData2 = [
  {
    id: '1',
    categories: ['Math', 'Science', 'Freetime'],
    title: 'This is your very first activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: 1597209853,
    duration: 900000,
  },
  {
    id: '2',
    categories: ['Science', 'Math'],
    title: 'This is your second activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: 1597208853,
    duration: 7200000,
  },
];
const daysData = [
  {
    id: 'fda',
    user: 'mtliendo1',
    dayInSecs: 1597986000,
    activities: initialActivityData,
  },
  {
    id: 'jfda',
    user: 'mtliendo',
    dayInSecs: 1598072400,
    activities: initialActivityData2,
  },
];

const generateDisplayDate = (count = 0) => {
  const day = moment()
    .utc()
    .add(count, 'days');

  const momentFormat = day.format('M-D-YYYY');
  const dateInSeconds = moment(momentFormat, 'M-D-YYYY').unix();

  //get users
  const displayDay = moment(day)
    .local()
    .format('dddd, MMMM Do YYYY');

  return {
    unixSeconds: dateInSeconds,
    displayDay,
  };
};

const dateReducer = (state, action) => {
  let generatedDate;
  switch (action.type) {
    case 'incrementDay':
      generatedDate = generateDisplayDate(state.count + 1);

      return {
        count: state.count + 1,
        displayDate: generatedDate.displayDay,
        unixSeconds: generatedDate.unixSeconds,
      };
    case 'decrementDay':
      generatedDate = generateDisplayDate(state.count - 1);
      return {
        count: state.count - 1,
        displayDate: generatedDate.displayDay,
        unixSeconds: generatedDate.unixSeconds,
      };
    default:
      throw Error('no recognizeable action found');
  }
};

const initialState = {
  count: 0,
  displayDate: generateDisplayDate().displayDay,
  unixSeconds: generateDisplayDate().unixSeconds,
};

const App = ({ navigate }) => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState({});
  const [activityData, setActivityData] = useState(daysData);
  const [dateState, dispatch] = useReducer(dateReducer, initialState);
  const [selectedDayActivities, setSelectedDayActivities] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  useEffect(() => {
    // todo: get today (in seconds)
    const todayInSecs = dateState.unixSeconds;
    // todo: get the day...fetch the data
    const foundItem = activityData.find(item => {
      return item.dayInSecs === todayInSecs;
    });

    setSelectedDayActivities(foundItem ? foundItem.activities : []);
  }, [activityData, dateState.unixSeconds]);

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

  const handleDayChange = direction => {
    if (direction !== 'decrement' && direction !== 'increment') {
      console.log('no direction given in HOME route');
    }
    if (direction === 'decrement') {
      dispatch({ type: 'decrementDay' });
    }
    if (direction === 'increment') {
      dispatch({ type: 'incrementDay' });
    }
  };

  return authState === AuthState.SignedIn && user ? (
    <Layout>
      <Navbar user={user} />
      <Section>
        <Container>
          <Router>
            <Home
              path="/activities/home"
              dailyActivityInfo={selectedDayActivities}
              onDayChange={handleDayChange}
              displayDate={dateState.displayDate}
            />
            <EditActivity
              path="/activities/edit/:activityID"
              onEditActivity={handleEditActivity}
              onDeleteActivity={handleDeleteActivity}
              activityList={selectedDayActivities}
            />
            <NewActivity
              path="/activities/new"
              onNewActivity={handleNewActivity}
            />
            <PublicActivities path="/activities/public" />
            {/* <Journal path="/activities/journal" /> */}
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
