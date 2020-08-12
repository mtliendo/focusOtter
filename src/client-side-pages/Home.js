import React, { useReducer } from 'react';
import { Typography, Divider, Button } from 'antd';
import { ActivityList } from '../components/sections/ActivityList';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const generateDisplayDate = (count = 0) => {
  const day = moment().add(count, 'days');

  const displayDay = day.format('dddd, MMMM Do YYYY');

  return {
    unixSeconds: day.unix(),
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
const Home = ({ navigate, data }) => {
  const [dateState, dispatch] = useReducer(dateReducer, initialState);

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
        <Button type="link" onClick={() => dispatch({ type: 'decrementDay' })}>
          &larr;
        </Button>
        <Typography.Text strong>{dateState.displayDate}</Typography.Text>
        <Button type="link" onClick={() => dispatch({ type: 'incrementDay' })}>
          &rarr;
        </Button>
      </section>
      <section style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          onClick={() => {
            navigate('/activities/new');
          }}
        >
          <PlusOutlined />
          New Activity
        </Button>
      </section>
      <Divider />
      <ActivityList data={data} />
    </>
  );
};

export default Home;
