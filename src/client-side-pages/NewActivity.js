import React from 'react';
import { ActivityForm } from '../components/sections/ActivityForm';

function NewActivity() {
  const onFinish = values => {
    console.log(values);
  };

  return (
    <>
      <ActivityForm onFinish={onFinish} />
    </>
  );
}

export default NewActivity;
