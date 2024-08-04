import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import StudentsList from "./components/StudentsList";
import TeachersList from "./components/TeachersList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={200}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{ background: "#001529" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/">Students</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/teachers">Teachers</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">
            <div className="logo" />
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Routes>
              <Route path="/" element={<StudentsList toast={toast} />} />
              <Route
                path="/teachers"
                element={<TeachersList toast={toast} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      <ToastContainer />
    </Router>
  );
};

export default App;
