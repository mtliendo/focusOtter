import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Button } from 'antd';
import { List, Avatar, Typography } from 'antd';
import { Section, Container } from '@components/global';
import { Link } from '@reach/router';
const data = [
  {
    title: 'Ant Design Title 1',
    time: '3:00',
  },
  {
    title: 'Ant Design Title 2',
    time: '3:00',
  },
  {
    title: 'Ant Design Title 3',
    time: '3:00',
  },
  {
    title: 'Ant Design Title 4',
    time: '3:00',
  },
];
const Home = () => (
  <Section>
    <Container>
      <Typography.Title>Daily Activity List</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[
              <Link key="list-loadmore-edit" to="/">
                edit
              </Link>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <a href="https://ant.design">
                  {item.title} at {item.time}
                </a>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />

      <AmplifySignOut />
    </Container>
  </Section>
);

export default Home;
