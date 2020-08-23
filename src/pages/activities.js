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
import Journal from '../client-side-pages/Journal';
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
    journalEntry: 'hello',
  },
  {
    id: 'jfda',
    user: 'mtliendo',
    dayInSecs: 1598072400,
    activities: initialActivityData2,
    journalEntry: '',
  },
];

const generateDisplayDate = (count = 0) => {
  const day = moment()
    .utc()
    .add(count, 'days');

  const momentFormat = day.format('M-D-YYYY');
  const dateInSeconds = moment(momentFormat, 'M-D-YYYY').unix();

  //get users
  const displayDate = moment(day)
    .local()
    .format('dddd, MMMM Do YYYY');

  return {
    unixSeconds: dateInSeconds,
    displayDate,
  };
};

const dateReducer = (state, action) => {
  let generatedDateInfo;
  switch (action.type) {
    case 'incrementDay':
      generatedDateInfo = generateDisplayDate(state.count + 1);

      return {
        count: state.count + 1,
        ...generatedDateInfo,
      };
    case 'decrementDay':
      generatedDateInfo = generateDisplayDate(state.count - 1);
      return {
        count: state.count - 1,
        ...generatedDateInfo,
      };
    default:
      throw Error('no recognizeable action found');
  }
};

const initialState = {
  count: 0,
  displayDate: generateDisplayDate().displayDate,
  unixSeconds: generateDisplayDate().unixSeconds,
};

const App = ({ navigate }) => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState({});
  const [activityData, setActivityData] = useState(daysData);
  const [currentDayItem, setCurrentDayItem] = useState({});
  const [dateState, dispatch] = useReducer(dateReducer, initialState);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  useEffect(() => {
    const todayInSecs = dateState.unixSeconds;
    // todo: get the day...fetch the data
    const foundItem = activityData.find(item => {
      return item.dayInSecs === todayInSecs;
    });

    // SelectedDayActivities(foundItem ? foundItem.activities : []);
    setCurrentDayItem(foundItem ? foundItem : {});
  }, [activityData, dateState.unixSeconds]);

  const handleNewActivity = newActivity => {
    const selectedDayInSecs = dateState.unixSeconds;
    let foundDayActivityInfo = activityData.find(item => {
      return item.dayInSecs === selectedDayInSecs;
    });

    if (foundDayActivityInfo) {
      foundDayActivityInfo = {
        ...foundDayActivityInfo,
        activities: [...currentDayItem.activities, newActivity],
      };
      const updatedActivityData = activityData.map(activityItem => {
        return activityItem.id === foundDayActivityInfo.id
          ? foundDayActivityInfo
          : activityItem;
      });
      setActivityData(updatedActivityData);
    } else {
      setActivityData(actData => [
        ...actData,
        {
          id: 'jfdaa',
          user: 'mtliendo3',
          dayInSecs: selectedDayInSecs,
          activities: [newActivity],
        },
      ]);
    }

    //todo: update the activityData with the new selectedDayActivities
  };

  const handleEditActivity = updatedActivityList => {
    const selectedDayInSecs = dateState.unixSeconds;
    let foundDayActivityInfo = activityData.find(item => {
      return item.dayInSecs === selectedDayInSecs;
    });

    foundDayActivityInfo = {
      ...foundDayActivityInfo,
      activities: updatedActivityList,
    };

    const updatedActivityData = activityData.map(activityItem => {
      return activityItem.id === foundDayActivityInfo.id
        ? foundDayActivityInfo
        : activityItem;
    });

    setActivityData(updatedActivityData);
    navigate('/activities/home');
  };

  const handleDeleteActivity = updatedActivityList => {
    const selectedDayInSecs = dateState.unixSeconds;
    let foundDayActivityInfo = activityData.find(item => {
      return item.dayInSecs === selectedDayInSecs;
    });

    foundDayActivityInfo = {
      ...foundDayActivityInfo,
      activities: updatedActivityList,
    };

    const updatedActivityData = activityData.map(activityItem => {
      return activityItem.id === foundDayActivityInfo.id
        ? foundDayActivityInfo
        : activityItem;
    });

    setActivityData(updatedActivityData);
    navigate('/activities/home');
  };

  const handleDayChange = direction => {
    dispatch({ type: direction });
  };

  const handleJournalDataUpdate = newJournalData => {
    setActivityData(currActData => {
      const todayInSecs = dateState.unixSeconds;
      return currActData.map(currActItem => {
        if ((currActItem.dayInSecs = todayInSecs)) {
          currActItem.journalEntry = newJournalData;
          return currActItem;
        }
        return currActItem;
      });
    });
  };

  return authState === AuthState.SignedIn && user ? (
    <Layout>
      <Navbar user={user} />
      <Section>
        <Container>
          <Router>
            <Home
              path="/activities/home"
              dailyActivityInfo={currentDayItem.activities}
              onDayChange={handleDayChange}
              displayDate={dateState.displayDate}
            />
            <EditActivity
              path="/activities/edit/:activityID"
              onEditActivity={handleEditActivity}
              onDeleteActivity={handleDeleteActivity}
              activityList={currentDayItem.activities}
            />
            <NewActivity
              path="/activities/new"
              onNewActivity={handleNewActivity}
            />
            <PublicActivities path="/activities/public" />
            <Journal
              path="/activities/journal"
              displayDate={dateState.displayDate}
              journalData={currentDayItem.journalEntry}
              onJournalDataUpdate={handleJournalDataUpdate}
            />
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
