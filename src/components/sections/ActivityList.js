import React from 'react';
import { List, Avatar, Tag } from 'antd';
import { Link } from '@reach/router';
import { categoryMap } from '../../utils/categoryMap';
import moment from 'moment';
import { generateDisplayNameFromDuration } from '../../utils/durationMap';

export function ActivityList(props) {
  console.log(props.data);
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          actions={[
            <Tag color={categoryMap(item.category)}>{item.category}</Tag>,
            <Link key="list-more-edit" to={`/activities/edit/${item.id}`}>
              edit
            </Link>,
            <Link
              key="list-more-timer"
              to={`/activities/activity-clock`}
              state={{ activityLength: item.duration, title: item.title }}
            >
              start timer
            </Link>,
          ]}
        >
          <List.Item.Meta
            // avatar={
            //   <Avatar src="https://ouch-cdn.icons8.com/preview/216/3ccb496a-e253-45ad-a3b2-bada05d0d7e5.png" />
            // }
            title={`${item.title} at ${moment
              .unix(item.timeStart)
              .format('h:mm')} for ${generateDisplayNameFromDuration(
              item.duration
            )}`}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}
