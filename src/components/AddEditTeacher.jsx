import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { addTeacher, editTeacher } from "../features/teachersSlice"; // To'g'ri import yo'li

const { Option } = Select;

const AddEditTeacher = ({ visible, onClose, editingTeacher }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (editingTeacher) {
      form.setFieldsValue(editingTeacher);
    } else {
      form.resetFields();
    }
  }, [editingTeacher, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingTeacher) {
        dispatch(editTeacher({ id: editingTeacher.id, ...values }));
      } else {
        dispatch(addTeacher(values));
      }
      onClose();
    });
  };

  return (
    <Modal
      title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[{ required: true, message: "Please input the first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ required: true, message: "Please input the last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="level"
          label="Level"
          rules={[{ required: true, message: "Please select a level!" }]}
        >
          <Select placeholder="Select a level">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditTeacher;
