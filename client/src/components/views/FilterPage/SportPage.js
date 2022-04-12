import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";
import "./FilterPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../../_actions/user_actions";
const { Title } = Typography;
const { Meta } = Card;
function SportPage() {
  const [Videos, setVideos] = useState([]);
  // const Videos = useSelector((state) => state.user.videos || []);
  //   const dispatch = useDispatch();
  console.log(Videos);
  useEffect(() => {
    axios.get("/api/video/getVideosCategory/" + "Sports").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setVideos(response.data.videos);
        //   dispatch(getVideos(response.data.videos))
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

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
    <div className="title">
      <Title level={2}> Sport </Title>
      <hr />

      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default SportPage;
