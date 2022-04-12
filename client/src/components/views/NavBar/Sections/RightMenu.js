/* eslint-disable jsx-a11y/anchor-is-valid */
//import React from 'react';
import React, { useState } from "react";
import { Menu, Avatar, Dropdown, Notifications, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
//const Upload = require("../../../../assets/images/upload.png");

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  console.log({ user });
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const variables = {
    name: props.name,
    image: props.image,
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/MyVideo">
          <div className="avatar">
            <img
              src={
                user.userData
                  ? `http://localhost:5000/${user.userData.image}`
                  : ""
              }
              alt="image"
              className="avatar-pic"
              width="100px"
              height="100px"
            />

            <h5 className="side-title">
              {user.userData ? user.userData.name : ""}
            </h5>
            <h5 className="side-title">
              {user.userData ? user.userData.fullname : ""}
            </h5>
            <h5 style={{ color: "#8b8b8b", fontSize: "12px" }}>
              {user.userData ? user.userData.email : ""}
            </h5>
          </div>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/ManagerMyVideo">Manager My Video</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/EditMyProfile">Edit My Profile</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={logoutHandler}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Button style={{ margin: "17px" }}>
            <a href="/login">Signin</a>
          </Button>
        </Menu.Item>
        <Menu.Item key="app">
          <Button style={{ margin: "17px" }}>
            <a href="/register">Signup</a>
          </Button>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="create">
          <Button style={{ margin: "17px" }}>
            <a href="/video/upload">
              {/* <img src={Upload} alt="Upload" /> */}
              Upload
            </a>
          </Button>
        </Menu.Item>
        <Menu.Item key="">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar
              src={
                user.userData
                  ? `http://localhost:5000/${user.userData.image}`
                  : ""
              }
              alt="image"
            />
          </Dropdown>
          <p>{user.image}</p>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
