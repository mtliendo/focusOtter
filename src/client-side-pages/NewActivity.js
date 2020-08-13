import React from 'react';
import { Typography } from 'antd';

import { ActivityForm } from '../components/sections/ActivityForm';

function NewActivity({ onNewActivity }) {
  const onFinish = values => {
    onNewActivity({
      id: '4',
      ...values,
      time: null,
      timeStart: values.time.unix(),
      duration: Number(values.duration),
    });
  };

  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }}>
        Add a New Activity
      </Typography.Title>
      <ActivityForm onFinish={onFinish} onFinishMessage="🚀 Activity added!" />
    </>
  );
}

export default NewActivity;
