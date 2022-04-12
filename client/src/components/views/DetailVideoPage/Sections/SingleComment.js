import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import "./sections.css";
import { useSelector } from "react-redux";
import LikeDislikesCm from "./LikeDislikesCm";
const { TextArea } = Input;
function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in");
    } else {
      Axios.post("/api/comment/saveComment", variables).then((response) => {
        if (response.data.success) {
          setCommentValue("");
          setOpenReply(!OpenReply);
          props.refreshFunction(response.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
    }
  };

  const actions = [
    <LikeDislikesCm
      comment
      commentId={props.comment._id}
      userId={localStorage.getItem("userId")}
    />,
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={
          <Avatar
            src={`http://localhost:5000/${props.comment.writer.image}`}
            alt="image"
          />
        }
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form className="form_comment" onSubmit={onSubmit}>
          <TextArea
            className="textarea_comment"
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some reply comments"
          />
          <br />
          <Button className="button_comment" onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
