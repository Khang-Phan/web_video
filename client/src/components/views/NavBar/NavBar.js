import React, { useState } from "react";
import { useSelector } from "react-redux";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon, Menu } from "antd";
import "./Sections/Navbar.css";
import {
  HomeOutlined,
  ScheduleOutlined,
  VideoCameraOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
const Logo = require("../../../assets/images/new_image.jpg");

function NavBar() {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const isAdmin = user.userData && user.userData.isAdmin;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <div className="menu__logo">
        <Button
          type="primary"
          onClick={showDrawer}
          style={{
            top: "20px",

            fontSize: "1.0rem",
            width: "50%",
          }}
        >
          <Icon type="align-left" />
        </Button>
      </div>
      <div className="menu__logo">
        <a href="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "90%", marginTop: "-5px" }}
          />
        </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        {/* <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer> */}
        {!isAdmin && (
          <Drawer
            title="Options"
            placement="left"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Menu>
              <Menu.Item key="mail">
                <HomeOutlined />
                <span>
                  <a href="/">Home</a>
                </span>
              </Menu.Item>
              <Menu.Item key="subscription">
                <ScheduleOutlined />
                <span>
                  <a href="/subscription">Subscription</a>
                </span>
              </Menu.Item>
              <Menu.ItemGroup key="g2" title="Category">
                <Menu.Item>
                  <a href="/Film&Animation">Film & Animation</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="/News">News</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="/Music">Music</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="/Sport">Sport</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="/Pets&Animals">Pets & Animals</a>
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu>
          </Drawer>
        )}
        {isAdmin && (
          <Drawer
            title="Options"
            placement="left"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Menu>
              <Menu.Item>
                <HomeOutlined />
                <span>
                  <a href="/Review">Home</a>
                </span>
              </Menu.Item>
              <Menu.Item>
                <UserOutlined />
                <span>
                  <a href="/ListUser">User Manager</a>
                </span>
              </Menu.Item>
              <Menu.Item>
                <VideoCameraOutlined />
                <span>
                  <a href="/ListVideo">Video Manager</a>
                </span>
              </Menu.Item>
              <Menu.Item>
                <CommentOutlined />
                <span>
                  <a href="/ListComment">Comment Manager</a>
                </span>
              </Menu.Item>
            </Menu>
          </Drawer>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
