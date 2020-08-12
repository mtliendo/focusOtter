import React from 'react';
import { ActivityForm } from '../components/sections/ActivityForm';
import { Typography, notification } from 'antd';

function EditActivity({
  onEditActivity,
  activityID,
  activityList,
  onDeleteActivity,
}) {
  const selectedActivity = activityList.find(
    activityItem => activityItem.id === activityID
  );

  console.log({ activityID });
  console.log({ activityList });

  const onFinish = values => {
    onEditActivity({
      id: activityID,
      ...values,
      timeStart: values.time.unix(),
      duration: Number(values.duration),
    });
  };

  const onDelete = () => {
    const updatedActivityList = activityList.filter(
      activityItem => activityItem.id !== activityID
    );
    notification.success({ message: 'Activity deleted ✅' });
    onDeleteActivity(updatedActivityList);
  };

  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }}>
        Edit Activity
      </Typography.Title>
      <ActivityForm
        onFinish={onFinish}
        onFinishMessage="🚀 Activity edited!"
        onDelete={onDelete}
        selectedActivity={selectedActivity}
        isEditing
      />
    </>
  );
}

export default EditActivity;
