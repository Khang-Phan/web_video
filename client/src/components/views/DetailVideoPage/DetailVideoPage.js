import React, { useEffect, useState } from "react";
import { Card, List, Avatar, Row, Col } from "antd";
import axios from "axios";
import "./DetailVideoPage.css";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";
import moment from "moment";
const { Meta } = Card;
function DetailVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("Failed to get video Info");
      }
    });

    axios.post("/api/comment/getComments", videoVariable).then((response) => {
      if (response.data.success) {
        console.log("response.data.comments", response.data.comments);
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get video Info");
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (Video.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div className="postPage">
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>
            <List.Item
              actions={[
                <LikeDislikes
                  video
                  videoId={videoId}
                  userId={localStorage.getItem("userId")}
                />,
                <Subscriber
                  userTo={Video.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                title={<h2>{Video.title}</h2>}
                // privacy={<h2>{Video.privacy.label}</h2>}
              />
            </List.Item>
            <span> {Video.views} views</span>-{" "}
            <span> {moment(Video.createdAt).format("MM-DD-YYYY")} </span>
            <br />
            <br />
            <Meta
              avatar={
                <Avatar src={`http://localhost:5000/${Video.writer.image}`} />
              }
              title={Video.writer.name}
              description={Video.description}
            />
            <Comments
              CommentLists={CommentLists}
              postId={Video._id}
              refreshFunction={updateComment}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DetailVideoPage;
