import React, { useState } from "react";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

import "./MainLayout.css";
import { useEffect } from "react";
import { getUserByEmail } from "../../apis/auth.api";

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
  getItem("Files", "9", <FileOutlined />),
];

export const MainLayout = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("uit-hackathon-token");
    if (token) {
      const decoded = jwt_decode(token);
      setAvatar(decoded.avatar);

      getUserByEmail(decoded.email).then((data) => {
        if (data && data.user?.role === "pending") {
          navigate("/choose-role");
        }
      });
    }
  }, []);

  const handleOnBreakpoint = (broken) => {
    console.log(broken);
  };

  const handleOnCollapse = (collapsed, type) => {
    console.log(collapsed, type);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("uit-hackathon-token");
    toast.success("Logout successfully!");
    setAvatar(null);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Layout className="main-layout">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={handleOnBreakpoint}
        onCollapse={handleOnCollapse}
      >
        <div className="logo" onClick={handleLogoClick}>
          Greener Globe
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={items} />
      </Sider>

      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
          {avatar ? (
            <Avatar size="large" src={avatar} className="avatar" />
          ) : (
            <Avatar size="large" icon={<UserOutlined />} className="avatar" />
          )}
          <div
            className={`login-button ${avatar ? "logout-button" : ""}`}
            onClick={avatar ? handleLogoutClick : handleLoginClick}
          >
            {avatar ? "Logout" : "Login"}
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Greener Globe - {new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};
