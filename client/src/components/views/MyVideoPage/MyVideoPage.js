//import React from "react";
import React, { useState, useEffect } from "react";
import {
  Menu,
  Avatar,
  Dropdown,
  Row,
  Typography,
  Notifications,
  Col,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyVideoPage.css";
import { USER_SERVER } from "../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import moment from "moment";
const { Meta } = Card;
const { Title } = Typography;

function MyVideoPage(props) {
  const user = useSelector((state) => state.user);
  const [Videos, setVideos] = useState([]);
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  let variable = { writer: localStorage.getItem("id") };

  useEffect(() => {
    if (user.userData) {
      axios
        .get("/api/subscribe/subscribeNumberId/" + user.userData._id)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(response.data.subscribeNumber);
          } else {
            alert("Failed to get subscriber Number");
          }
        });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      axios.get("/api/video/getVideos").then((response) => {
        if (response.data.success) {
          console.log(response.data.videos);
          setVideos(response.data.videos);
        } else {
          alert("Failed to get Videos");
        }
      });
    } else if (user.userData) {
      console.log({ user });
      axios
        .get("/api/video/getMyVideos/" + user.userData._id)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.videos);
            setVideos(response.data.videos);
          } else {
            alert("Failed to get Videos");
          }
        });
    }
  }, [user]);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={
            <Avatar src={`http://localhost:5000/${video.writer.image}`} />
          }
          title={video.title}
        />
        <span>{video.writer.name} </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views} views</span>-{" "}
        <span> {moment(video.createdAt).format("MM-DD-YYYY")} </span>
      </Col>
    );
  });

  return (
    <div className="container_myvideo">
      <div className="layout_myvideo">
        <div style={{ display: "flex" }}>
          <div className="box_myvideo">
            <img
              src={
                user.userData
                  ? `http://localhost:5000/${user.userData.image}`
                  : ""
              }
              alt="image"
              className="avatar-pic"
            />
            <div className="side_myvideo">
              <h1 className="side-title">
                {user.userData ? user.userData.name : ""}
              </h1>

              <h2 className="sub_myvideo">{SubscribeNumber} Subscribe</h2>
            </div>
          </div>
        </div>
        <br />
        <br />
        <Title level={3}> My Videos</Title>
        <hr />

        <Row gutter={16}>{renderCards}</Row>
      </div>
    </div>
  );
}
export default MyVideoPage;
