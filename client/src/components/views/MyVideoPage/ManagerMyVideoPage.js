import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyVideoPage.css";
import { useSelector } from "react-redux";
import { Button, Row, Form, Table, Typography } from "antd";
const { Title } = Typography;

//import { Container} from 'react-bootstrap';
//import { useState, useEffect } from 'react';

const ManagerMyVideoPage = (props) => {
  const [videos, setVideos] = useState([]);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    getAllMyVideo();
  }, [user]);

  const getAllMyVideo = () => {
    if (user.userData) {
      axios
        .get("/api/video/getMyVideos/" + user.userData._id)
        .then((response) => {
          setVideos(response.data.videos);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const deleteMyVideo = (id) => {
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
            onClick={() => props.history.push("/EditMyVideo/" + record._id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                deleteMyVideo(record._id);
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
      <div className="title_myvideo_2">
        <Title level={2}>Form My Video</Title>
      </div>
      <div style={{ padding: 50 }}>
        <Table columns={columns} dataSource={videos} />
      </div>
    </div>
  );
};
export default ManagerMyVideoPage;
