import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import StudentsList from "./components/StudentsList";
import TeachersList from "./components/TeachersList";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const { Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("authenticated");
    if (authStatus === "true") {
      setAuthenticated(true);
    }
  }, []);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setAuthenticated(false);
    window.location.href = "/login"; // Use window.location to navigate outside of Router context
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {authenticated ? (
          <>
            <Sidebar
              collapsed={collapsed}
              onCollapse={onCollapse}
              onLogout={handleLogout}
            />
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
          </>
        ) : (
          <Routes>
            <Route
              path="*"
              element={<LoginPage setAuthenticated={setAuthenticated} />}
            />
          </Routes>
        )}
      </Layout>
      <ToastContainer />
    </Router>
  );
};

export default App;
