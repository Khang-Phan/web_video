import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ListVideoPage.css";
import { Button, Row, Form, Table, Card, Typography, Input } from "antd";
const { Title } = Typography;
const { Search } = Input;
//import './ListUserPage.css';
//import {  Button} from 'bootstrap';
//import { useState, useEffect } from 'react';

const ListVideoPage = (props) => {
  const [videos, setVideos] = useState([]);

  React.useEffect(() => {
    getVideo();
  }, []);

  const onSearch = (value) => {
    axios.post("/api/video/list", { searchKeyword: value }).then((response) => {
      console.log(response);
      setVideos(response.data.videos);
    });
  };

  const getVideo = () => {
    axios
      .get("http://localhost:5000/api/video/getVideos")
      .then((response) => {
        // this.setState({ videos: response.data.videos });
        setVideos(response.data.videos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteVideo = (id) => {
    axios
      .delete("http://localhost:5000/api/video/DeleteVideo/" + id)
      .then((response) => {
        console.log(response.data);
      });

    setVideos(videos.filter((el) => el._id !== id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Writer",
      dataIndex: "writer.name",
      key: "writer",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    // {
    //   title: "Privacy",
    //   dataIndex: "privacy",
    //   key: "privacy",
    // },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button
            onClick={() => props.history.push("/EditVideo/" + record._id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                deleteVideo(record._id);
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
      <div className="title_listvideo">
        <Title level={2}>Form Video</Title>
      </div>
      <div className="search">
        <Search
          placeholder="input search title"
          enterButton="Search"
          //size="large"
          // style={{ textIndent: 50, width: 200 }}
          onSearch={onSearch}
        />
      </div>
      <div style={{ padding: 50 }}>
        <Table columns={columns} dataSource={videos} />
      </div>
    </div>
  );
};

export default ListVideoPage;
