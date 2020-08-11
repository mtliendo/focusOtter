import React from 'react';
import { List, Avatar, Tag } from 'antd';
import { Link } from '@reach/router';
import { categoryMap } from '../../utils/categoryMap';

export function ActivityList(props) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          actions={[
            <Tag color={categoryMap(item.category)}>{item.category}</Tag>,
            <Link key="list-loadmore-edit" to={`/activities/edit/${item.id}`}>
              edit
            </Link>,
          ]}
        >
          <List.Item.Meta
            // avatar={
            //   <Avatar src="https://ouch-cdn.icons8.com/preview/216/3ccb496a-e253-45ad-a3b2-bada05d0d7e5.png" />
            // }
            title={`${item.title} at ${item.timeStart}`}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}
