import React from 'react';
import { Typography } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import { ActivityForm } from '../components/sections/ActivityForm';
import { createActivityDay, createActivity } from '../graphql/mutations';

function NewActivity({ location }) {
  const { currentDayID, daysInSecs } = location.state;
  console.log({ daysInSecs });
  const createNewActivityDay = async () => {
    const createdActivityDay = await API.graphql(
      graphqlOperation(createActivityDay, {
        input: { daysInSecs: daysInSecs },
      })
    );

    return createdActivityDay;
  };

  const handleNewActivity = newActivity => {
    // add the activity to the current activityDay in local state via its id
    console.log({ newActivity });
    console.log('the current day item', currentDayID);
    if (currentDayID) {
      API.graphql(
        graphqlOperation(createActivity, {
          input: { ...newActivity, activityID: currentDayID },
        })
      ).then(data =>
        console.log(
          'updated! here are the results..maybe let the user know *wink*',
          data
        )
      );
    } else {
      // no id created yet, so we have to create one, and then set the newActivity to it.
      createNewActivityDay().then(results => {
        console.log('the results', results);

        API.graphql(
          graphqlOperation(createActivity, {
            input: {
              ...newActivity,
              activityID: results.data.createActivityDay.id,
            },
          })
        ).then(data =>
          console.log(
            'updated! here are the results..maybe let the user know *wink*',
            data
          )
        );
      });
    }
  };
  const onFinish = values => {
    const unixTime = values.time.unix();
    delete values.time;
    handleNewActivity({
      ...values,
      timeStart: unixTime,
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
