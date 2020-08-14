import React from 'react';
import { useCountdownTimer } from 'use-countdown-timer';
import { Button, Divider, Typography } from 'antd';

const ActivityClock = ({ location }) => {
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: location.state.activityLength,
  });

  let seconds = Math.floor((countdown / 1000) % 60);
  const minutes = Math.floor(countdown / 1000 / 60);

  seconds = seconds < 10 ? '0' + seconds : seconds;
  return (
    <section>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Divider>
          <Typography.Title level={2}>{location.state.title}</Typography.Title>
        </Divider>
        <h1>{minutes} minutes</h1>
        <h1> and </h1>
        <h1>{seconds} seconds</h1>
      </section>
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" danger onClick={reset} size="large">
          Reset
        </Button>
        {isRunning ? (
          <Button type="primary" size="large" onClick={pause}>
            Pause
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={start}
            size="large"
            style={{ backgroundColor: '#1CE32A', borderColor: '#1CE32A' }}
          >
            Start
          </Button>
        )}
      </section>
    </section>
  );
};

export default ActivityClock;
