import { Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const Sidebar = ({ collapsed, onCollapse, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
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
        <Menu.Item key="3">
          <Button type="link" onClick={handleLogout} style={{ color: "red" }}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
