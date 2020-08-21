import React, { useEffect } from 'react';
import { Form, Input, Button, Select, TimePicker, notification } from 'antd';
import { activityCategories } from '../../utils/categoryMap';
import { Link } from '@reach/router';
import moment from 'moment';
import {
  durationMap,
  generateDisplayNameFromDuration,
  generateDurationFromDisplayName,
} from '../../utils/durationMap';

export const ActivityForm = ({
  onFinish,
  onFinishMessage = '',
  selectedActivity = {},
  isEditing = false,
  onDelete,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: selectedActivity.id,
      title: selectedActivity.title,
      description: selectedActivity.description,
      [isEditing && 'time']: moment.unix(selectedActivity.timeStart),
      duration: generateDisplayNameFromDuration(selectedActivity.duration),
      categories: selectedActivity.categories,
    });
  }, [form, selectedActivity]);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleOnFinish = stuff => {
    console.log('stuff', stuff);
    notification.success({
      message: onFinishMessage,
      description: `Changed Activity: ${form.getFieldValue('title')}`,
    });

    //ensure that the duration is a number
    if (typeof form.getFieldValue('duration') !== 'number') {
      form.setFieldsValue({
        duration: generateDurationFromDisplayName(
          form.getFieldValue('duration')
        ),
      });
    }

    onFinish(form.getFieldsValue());

    onReset();
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleOnFinish}
      >
        <Form.Item
          name="title"
          label="Title"
          len={10}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="time"
          label="Start Time"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker format="hh:mm a" inputReadOnly minuteStep={5} />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="How long will the activity last?"
            onChange={() => {}}
            allowClear
          >
            {durationMap.map(duration => (
              <Select.Option
                key={`${duration.displayName}`}
                value={`${duration.displayName}`}
              >
                {duration.displayName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="categories"
          label="Category"
          rules={[
            {
              required: true,
              type: 'array',
              max: 4,
            },
          ]}
        >
          <Select
            placeholder="Select a category"
            onChange={() => {}}
            allowClear
            mode="multiple"
          >
            {activityCategories.map(categoryItem => (
              <Select.Option
                key={`${categoryItem.name}`}
                value={`${categoryItem.name}`}
              >
                {categoryItem.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          {isEditing && (
            <Button danger onClick={onDelete}>
              Delete
            </Button>
          )}
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/activities/home">Back to activities list</Link>
        </Form.Item>
      </Form>
    </>
  );
};
