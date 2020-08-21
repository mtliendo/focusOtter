import React from 'react';
import { ActivityForm } from '../components/sections/ActivityForm';
import { Typography, notification } from 'antd';

function EditActivity({
  onEditActivity,
  activityID,
  activityList,
  onDeleteActivity,
}) {
  const selectedActivity = React.useRef(
    activityList.find(activityItem => activityItem.id === activityID)
  );
  const onFinish = values => {
    const updatedActivityData = activityList.map(activityItem =>
      activityItem.id === activityID
        ? { ...activityItem, ...values }
        : activityItem
    );

    console.log({ updatedActivityData });
    onEditActivity(updatedActivityData);
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
        selectedActivity={selectedActivity.current}
        isEditing
      />
    </>
  );
}

export default EditActivity;
