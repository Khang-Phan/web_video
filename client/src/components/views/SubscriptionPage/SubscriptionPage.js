import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";
import "./Sub.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  //  const history = useHistory()
  const [Videos, setVideos] = useState([]);

  let variable = { userFrom: localStorage.getItem("userId") };

  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    if (user.userData && !user.userData.isAuth) {
      alert("you must login to see subsrcibered video!");
      //    history.push('/')
    }

    if (user.userData && user.userData.isAuth) {
      axios
        .post("/api/video/getSubscriptionVideos", variable)
        .then((response) => {
          if (response.data.success) {
            setVideos(response.data.videos);
          } else {
            alert("Failed to get subscription videos");
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
    <div className="layout_sub">
      <Title level={2}> Subscribed Videos </Title>
      <hr />

      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
