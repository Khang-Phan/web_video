import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import "./sections.css";
const { TextArea } = Input;

function Comments(props) {
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
    };
    if (user.userData && !user.userData.isAuth) {
      return alert("You must Login to comment");
    } else {
      axios.post("/api/comment/saveComment", variables).then((response) => {
        if (response.data.success) {
          setComment("");
          props.refreshFunction(response.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
    }
  };

  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}
      {console.log(props.CommentLists)}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form className="form_comment" onSubmit={onSubmit}>
        <TextArea
          className="textarea_comment"
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button className="button_comment" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
