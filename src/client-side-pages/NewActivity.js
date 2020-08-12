import React from 'react';
import { Typography, Divider } from 'antd';

import { ActivityForm } from '../components/sections/ActivityForm';

function NewActivity({ onNewActivity }) {
  const onFinish = values => {
    console.log(values);
    onNewActivity({ id: 4, ...values });
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
