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
  Statistic,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./ReviewAdmin.css";

ChartJS.register(ArcElement, Tooltip, Legend);
const { Meta } = Card;
const { Title } = Typography;

const Image = require("../../../assets/images/image_video.jpg");
function ReviewAdminPage(props) {
  // const user = useSelector((state) => state.user);
  const [Videos, setVideos] = useState([]);
  const [videoNumber, setVideoNumber] = useState(0);
  const [videoNumber1, setVideoNumber1] = useState(0);
  const [videoNumber2, setVideoNumber2] = useState(0);
  const [videoNumber3, setVideoNumber3] = useState(0);
  const [videoNumber4, setVideoNumber4] = useState(0);
  const [videoNumber5, setVideoNumber5] = useState(0);

  useEffect(() => {
    axios.get("/api/video/VideoNumberAll").then((response) => {
      if (response.data.success) {
        setVideoNumber(response.data.videoNumber);
      } else {
        alert("Failed to get Video Number");
      }
    });

    axios
      .get("/api/video/VideoNumber/" + "Film & Animation")
      .then((response) => {
        if (response.data.success) {
          setVideoNumber1(response.data.videoNumber);
        } else {
          alert("Failed to get Video Number");
        }
      });

    axios.get("/api/video/VideoNumber/" + "News").then((response) => {
      if (response.data.success) {
        setVideoNumber2(response.data.videoNumber);
      } else {
        alert("Failed to get Video Number");
      }
    });

    axios.get("/api/video/VideoNumber/" + "Music").then((response) => {
      if (response.data.success) {
        setVideoNumber3(response.data.videoNumber);
      } else {
        alert("Failed to get Video Number");
      }
    });
    axios.get("/api/video/VideoNumber/" + "Pets & Animals").then((response) => {
      if (response.data.success) {
        setVideoNumber4(response.data.videoNumber);
      } else {
        alert("Failed to get Video Number");
      }
    });
    axios.get("/api/video/VideoNumber/" + "Sports").then((response) => {
      if (response.data.success) {
        setVideoNumber5(response.data.videoNumber);
      } else {
        alert("Failed to get Video Number");
      }
    });
  }, []);

  const data = {
    labels: ["Film & Animation", "News", "Music", "Pets & Animals", "Sports"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          videoNumber1,
          videoNumber2,
          videoNumber3,
          videoNumber4,
          videoNumber5,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div
        className="layout_review"
        style={{
          backgroundImage: `url(${Image})`,
        }}
      >
        <h1>WELCOME</h1>
        <p>What are you waiting for?</p>
      </div>

      <div className="container_review">
        <div style={{ width: "400px" }}>
          <Pie data={data} />;
        </div>
      </div>

      <div className="label_review">
        <h2>Number Video</h2>
      </div>

      <div className="chart_review">
        <Row gutter={8}>
          <Col span={4}>
            <Statistic title="Film & Animation" value={videoNumber1} />
          </Col>
          <Col span={4}>
            <Statistic title="News" value={videoNumber2} />
          </Col>
          <Col span={4}>
            <Statistic title="Music" value={videoNumber3} />
          </Col>
          <Col span={4}>
            <Statistic title="Pets & Animals" value={videoNumber4} />
          </Col>
          <Col span={4}>
            <Statistic title="Sports" value={videoNumber5} />
          </Col>
          <Col span={4}>
            <Statistic title="Total Video" value={videoNumber} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default ReviewAdminPage;
