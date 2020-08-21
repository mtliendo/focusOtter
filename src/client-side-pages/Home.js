import React from 'react';
import { Typography, Divider, Button } from 'antd';
import { ActivityList } from '../components/sections/ActivityList';
import { PlusOutlined } from '@ant-design/icons';

const Home = ({ navigate, dailyActivityInfo, onDayChange, displayDate }) => {
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
        <Button type="link" onClick={() => onDayChange('decrementDay')}>
          &larr;
        </Button>
        <Typography.Text strong>{displayDate}</Typography.Text>
        <Button type="link" onClick={() => onDayChange('incrementDay')}>
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
      <ActivityList data={dailyActivityInfo} />
    </>
  );
};

export default Home;
