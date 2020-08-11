import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Button } from 'antd';
import { Typography, Divider } from 'antd';
import { Section, Container } from '@components/global';
import { ActivityList } from '../components/sections/ActivityList';
import { PlusOutlined } from '@ant-design/icons';
const data = [
  {
    id: 1,
    category: 'Math',
    title: 'This is your very first activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: '2:30',
    timeEnd: '3:30',
  },
  {
    id: 2,
    category: 'Science',
    title: 'This is your second activity🎉',
    description:
      'This is a description of your first activity. To get started, go ahead and click the edit button ➡️',
    timeStart: '3:30',
    timeEnd: '4:30',
  },
];

const Home = ({ navigate }) => (
  <Section>
    <Container>
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
      <section style={{ display: 'flex' }}>
        <AmplifySignOut />
      </section>
    </Container>
  </Section>
);

export default Home;
