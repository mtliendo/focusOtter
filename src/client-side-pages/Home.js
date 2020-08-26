import React, { useState, useReducer, useEffect } from 'react';
import { Typography, Divider, Button } from 'antd';
import { ActivityList } from '../components/sections/ActivityList';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { API, graphqlOperation } from 'aws-amplify';
import { activityByDaysInSecs } from '../graphql/queries';

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
const Home = ({ navigate }) => {
  const [currentDayItem, setCurrentDayItem] = useState({ activities: [] });
  const [dateState, dispatch] = useReducer(dateReducer, initialState);

  const fetchActivityDay = async daysInSecs => {
    const activityDay = await API.graphql(
      graphqlOperation(activityByDaysInSecs, { daysInSecs })
    );

    return activityDay;
  };

  useEffect(() => {
    fetchActivityDay(dateState.unixSeconds).then(
      ({ data: { activityByDaysInSecs } }) => {
        console.log(activityByDaysInSecs.items[0]);
        activityByDaysInSecs.items[0]
          ? setCurrentDayItem(activityByDaysInSecs.items[0])
          : setCurrentDayItem({ activities: [] });
      }
    );
  }, [dateState.unixSeconds]);

  const handleDayChange = direction => {
    dispatch({ type: direction });
  };

  return (
    <>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography.Title>Daily Activity List</Typography.Title>
      </section>

      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '3rem',
        }}
      >
        <Button type="link" onClick={() => handleDayChange('decrementDay')}>
          &larr;
        </Button>
        <Typography.Text strong>{dateState.displayDate}</Typography.Text>
        <Button type="link" onClick={() => handleDayChange('incrementDay')}>
          &rarr;
        </Button>
      </section>
      <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          onClick={() => {
            navigate('/activities/new', {
              state: {
                currentDayID: currentDayItem.id,
                daysInSecs: dateState.unixSeconds,
              },
            });
          }}
        >
          <PlusOutlined />
          New Activity
        </Button>
        <Button
          type="default"
          onClick={() => {
            navigate('/activities/journal', {
              state: {
                currentDayID: currentDayItem.id,
                displayDate: dateState.displayDate,
                journalData: currentDayItem.journalEntry,
              },
            });
          }}
        >
          <FormOutlined />
          Log Daily Note
        </Button>
      </section>
      <Divider />
      <ActivityList
        activities={currentDayItem.activities.items}
        currentDayID={currentDayItem.id}
      />
    </>
  );
};

export default Home;
