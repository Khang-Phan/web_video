import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ListUser.css";
import { Button, Row, Form, Table, Card, Typography, Input } from "antd";
const { Title } = Typography;
const { Search } = Input;
// import "./ListUserPage.css";
//import {  Button} from 'bootstrap';
//import { useState, useEffect } from 'react';

const ListUserPage = (props) => {
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    getUser();
  }, []);

  const onSearch = (value) => {
    axios
      .post("/api/users/listUser", { searchKeyword: value })
      .then((response) => {
        console.log(response);
        setUsers(response.data.users);
      });
  };

  const getUser = () => {
    axios
      .get("http://localhost:5000/api/users/getAllUsers")
      .then((response) => {
        //this.setState({ users: response.data.users });
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id) => {
    if (id == "6187393085b9234c5ccea4f5") {
      return alert("You don't delete admin account");
    } else {
      axios
        .delete("http://localhost:5000/api/users/DeleteUser/" + id)
        .then((response) => {
          console.log(response.data);
        });

      setUsers(users.filter((el) => el._id !== id));
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button onClick={() => props.history.push("/EditUser/" + record._id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                deleteUser(record._id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="label_user">
        <Title level={2}>Form User</Title>
      </div>
      <div className="search_user">
        <Search
          placeholder="input search text"
          enterButton="Search"
          //size="large"
          // style={{ textIndent: 50, width: 200 }}
          onSearch={onSearch}
        />
      </div>
      <div style={{ paddingRight: "150px" }}>
        <Button className="button_user">
          <a href="/CreateUser">Create User</a>
        </Button>
      </div>

      <div style={{ padding: 50 }}>
        <Table columns={columns} dataSource={users} />
      </div>
    </div>
  );
};

export default ListUserPage;
