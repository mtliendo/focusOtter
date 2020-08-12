import React from 'react';
import { Button } from 'antd';
import { Typography, Divider } from 'antd';
import { ActivityList } from '../components/sections/ActivityList';
import { PlusOutlined } from '@ant-design/icons';

const Home = ({ navigate, data }) => (
  <>
    <Typography.Title>Daily Activity List</Typography.Title>
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

export default Home;
