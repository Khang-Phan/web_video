import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sections.css";
function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setSideVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const sideVideoItem = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div className="container">
        <div className="container_box">
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="container_box_duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
            <br />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span className="title_video">{video.title} </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }}></div>
      {sideVideoItem}
    </React.Fragment>
  );
}

export default SideVideo;
