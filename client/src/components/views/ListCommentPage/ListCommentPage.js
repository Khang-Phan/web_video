import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Row, Form, Table, Typography } from "antd";
const { Title } = Typography;

//import { Container} from 'react-bootstrap';
//import { useState, useEffect } from 'react';

class ListCommentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //  content: "",
      //  writer: "",
      //  postId:"",
      comments: [],
    };
    // const [comments, setComment] = useState([]);
    //  this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/comment/getAllComments")
      .then((response) => {
        this.setState({ comments: response.data.comments });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteComment(id) {
    axios
      .delete("http://localhost:5000/api/comment/DeleteComments/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      comments: this.state.comments.filter((el) => el._id !== id),
    });
  }

  columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Writer",
      dataIndex: "writer.name",
      key: "writer",
    },
    {
      title: "PostId",
      dataIndex: "postId.title",
      key: "postId",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <Button
            type="primary"
            danger
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.deleteComment(record._id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  render() {
    return (
      <div>
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <Title level={2}>Form Comment</Title>
        </div>
        <div style={{ padding: 50 }}>
          <Table columns={this.columns} dataSource={this.state.comments} />
        </div>
      </div>
    );
  }
}
export default ListCommentPage;
