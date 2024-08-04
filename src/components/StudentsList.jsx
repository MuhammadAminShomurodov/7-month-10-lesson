// components/StudentsList.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../features/studentsSlice";
import { Table, Button, Space, Input, Select, Modal } from "antd";
import AddEditStudent from "./AddEditStudent";

const { Option } = Select;

const StudentsList = ({ toast }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalVisible(true);
  };

  const handleDelete = (studentId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this student?",
      content: "This action cannot be undone.",
      onOk: () => {
        dispatch(deleteStudent(studentId));
        toast.success("Student deleted successfully!");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (value) => {
    setSelectedGroup(value);
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstname.toLowerCase()} ${student.lastname.toLowerCase()}`;
    return (
      fullName.includes(searchTerm.toLowerCase()) &&
      (selectedGroup ? student.group === selectedGroup : true)
    );
  });

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Student
        </Button>
        <Input
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by group"
          onChange={handleFilter}
          allowClear
          style={{ width: 200 }}
        >
          {Array.from(new Set(students.map((student) => student.group))).map(
            (group) => (
              <Option key={group} value={group}>
                {group}
              </Option>
            )
          )}
        </Select>
      </Space>
      <Table columns={columns} dataSource={filteredStudents} rowKey="id" />

      <AddEditStudent
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingStudent(null);
        }}
        editingStudent={editingStudent}
      />
    </div>
  );
};

export default StudentsList;
