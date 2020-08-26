import React from 'react';
import { ActivityForm } from '../components/sections/ActivityForm';
import { Typography } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import { getActivity } from '../graphql/queries';
import { updateActivity, deleteActivity } from '../graphql/mutations';

function EditActivity({
  navigate, //provided by reach-router
  activityID, //provided by reach-router
  location,
}) {
  const [selectedActivity, setSelectedActivity] = React.useState({});
  const { currentDayID } = location.state;
  React.useEffect(() => {
    API.graphql(graphqlOperation(getActivity, { id: activityID })).then(
      results => {
        console.log(results.data.getActivity);
        setSelectedActivity(results.data.getActivity);
      }
    );
  }, [activityID]);

  const handleEditActivity = updatedActivityItem => {
    console.log({ updatedActivityItem });
    API.graphql(
      graphqlOperation(updateActivity, {
        input: { ...updatedActivityItem, activityID: currentDayID },
      })
    ).then(result => console.log('updated! here is the result', result));

    navigate('/activities/home');
  };

  const onFinish = values => {
    const unixTime = values.time.unix();
    delete values.time;
    handleEditActivity({ ...values, timeStart: unixTime, id: activityID });
  };

  const onDelete = () => {
    API.graphql(
      graphqlOperation(deleteActivity, { input: { id: activityID } })
    ).then(result => {
      console.log('successfully deleted', result);
      navigate('/activities/home');
    });
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
