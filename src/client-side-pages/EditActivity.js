import React from 'react';
import { ActivityForm } from '../components/sections/ActivityForm';
import { Typography } from 'antd';

function EditActivity({ onEditActivity, activityID, activityList }) {
  const selectedActivity = activityList.find(
    activityItem => activityItem.id.toString() === activityID
  );

  const onFinish = values => {
    console.log(values);
    onEditActivity({ id: activityID, ...values });
  };

  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }}>
        Edit Activity
      </Typography.Title>
      <ActivityForm
        onFinish={onFinish}
        onFinishMessage="🚀 Activity edited!"
        selectedActivity={selectedActivity}
      />
    </>
  );
}

export default EditActivity;
