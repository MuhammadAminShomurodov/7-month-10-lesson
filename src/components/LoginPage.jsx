// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Layout } from "antd";
import "./LoginPage.css";

const { Content } = Layout;

const LoginPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("authenticated", "true");
      setAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: "300px",
      }}
    >
      <h2>Login</h2>
      <Content style={{ maxWidth: "400px", margin: "auto" }}>
        <Form>
          <Form.Item label="Username">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default LoginPage;
