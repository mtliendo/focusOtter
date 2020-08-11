import React from 'react';
import { Form, Input, Button, Select, TimePicker } from 'antd';
import { activityCategories } from '../../utils/categoryMap';
export const ActivityForm = ({ onFinish }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
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
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Title"
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
        label="Time"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TimePicker.RangePicker format="hh:mm a" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a category" onChange={() => {}} allowClear>
          {activityCategories.map(categoryItem => (
            <Option key={`${categoryItem.name}`} value={`${categoryItem.name}`}>
              {categoryItem.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.category !== currentValues.category
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('category') === 'other' ? (
            <Form.Item
              name="customizeCategory"
              label="Customize Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
