// components/TeachersList.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, deleteTeacher } from "../features/teachersSlice";
import { Table, Button, Space, Input, Select, Modal } from "antd";
import AddEditTeacher from "./AddEditTeacher";

const { Option } = Select;

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const status = useSelector((state) => state.teachers.status);
  const error = useSelector((state) => state.teachers.error);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [status, dispatch]);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setIsModalVisible(true);
  };

  const handleDelete = (teacherId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this teacher?",
      content: "This action cannot be undone.",
      onOk: () => {
        dispatch(deleteTeacher(teacherId));
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
    setSelectedLevel(value);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.firstname.toLowerCase()} ${teacher.lastname.toLowerCase()}`;
    return (
      fullName.includes(searchTerm.toLowerCase()) &&
      (selectedLevel ? teacher.level === selectedLevel : true)
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
      title: "Level",
      dataIndex: "level",
      key: "level",
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
          Add Teacher
        </Button>
        <Input
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by level"
          onChange={handleFilter}
          allowClear
          style={{ width: 200 }}
        >
          {Array.from(new Set(teachers.map((teacher) => teacher.level))).map(
            (level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            )
          )}
        </Select>
      </Space>
      <Table columns={columns} dataSource={filteredTeachers} rowKey="id" />

      <AddEditTeacher
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingTeacher(null);
        }}
        editingTeacher={editingTeacher}
      />
    </div>
  );
};

export default TeachersList;
