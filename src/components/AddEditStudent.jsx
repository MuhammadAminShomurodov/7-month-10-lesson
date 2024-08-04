import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { addStudent, editStudent } from "../features/studentsSlice";

const { Option } = Select;

const AddEditStudent = ({ visible, onClose, editingStudent }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (editingStudent) {
      form.setFieldsValue(editingStudent);
    } else {
      form.resetFields();
    }
  }, [editingStudent, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingStudent) {
        dispatch(editStudent({ id: editingStudent.id, ...values }));
      } else {
        dispatch(addStudent(values));
      }
      onClose();
    });
  };

  return (
    <Modal
      title={editingStudent ? "Edit Student" : "Add Student"}
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
          name="group"
          label="Group"
          rules={[{ required: true, message: "Please select a group!" }]}
        >
          <Select placeholder="Select a group">
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditStudent;
