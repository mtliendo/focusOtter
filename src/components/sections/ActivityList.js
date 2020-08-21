import React from 'react';
import { List, Avatar, Tag, Divider } from 'antd';
import { Link } from '@reach/router';
import { categoryMap } from '../../utils/categoryMap';
import moment from 'moment';
import { generateDisplayNameFromDuration } from '../../utils/durationMap';

export function ActivityList(props) {
  return (
    <List
      itemLayout="vertical"
      dataSource={props.data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                S
              </Avatar>
            }
            title={`${item.title} at ${moment
              .unix(item.timeStart)
              .format('h:mm')} for ${generateDisplayNameFromDuration(
              item.duration
            )}`}
            description={
              <>
                {item.description}{' '}
                <section
                  style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}
                >
                  {item.categories.map(category => (
                    <Tag
                      key={category}
                      color={categoryMap(category)}
                      style={{ marginTop: '3px' }}
                    >
                      {category}
                    </Tag>
                  ))}
                </section>
              </>
            }
          />

          <section
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Link key="list-more-edit" to={`/activities/edit/${item.id}`}>
              edit
            </Link>
            <Divider type="vertical" />
            <Link
              key="list-more-timer"
              to={`/activities/activity-clock`}
              state={{ activityLength: item.duration, title: item.title }}
            >
              start timer
            </Link>
          </section>
        </List.Item>
      )}
    />
  );
}
