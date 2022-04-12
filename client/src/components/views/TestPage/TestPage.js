//import React from "react";
import React, { useState, useEffect } from 'react';
import { Menu, Avatar, Dropdown , Row, Typography ,Notifications, Col, Card } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

import moment from 'moment';
const { Meta } = Card;
const { Title } = Typography;

function TestPage(props) {
  const user = useSelector(state => state.user)
  const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])





    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views} views</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

  return (
    <div className="singleVideo" style={{ flex: "0.85", marginLeft: "-200px" }}>
     
     
     
       
          <div style={{ marginLeft: "20%", marginTop: "3%" }}>
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ display: "flex", marginLeft: "10px", height: '100px', width: '150%' }}>
              <img
                  src={user.userData ? user.userData.image: ""}
                  alt="image"
                  className="avatar-pic"
                />
                <div style={{ display: "flex", flexDirection: "column", textIndent: '50px' }}>
                <h1 className="side-title">{user.userData ? user.userData.name: ""}</h1>
              
                <h1 style={{ color: "#8b8b8b",fontSize:"12px"}}>{user.userData ? user.userData.email: ""}</h1>
                
                </div>
              </div>
             
            </div>
           <br/>
           <br/>
            <Title level={3} > My Videos</Title>
            <hr />

            <Row gutter={16}>
            {renderCards}
            </Row>
          </div>
        </div>
      )
            }
export default TestPage;