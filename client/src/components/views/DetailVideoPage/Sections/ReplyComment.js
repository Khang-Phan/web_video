import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import "./sections.css";
import { useSelector } from "react-redux";
import LikeDislikesCm from "./LikeDislikesCm";
import { Comment, Avatar, Button, Input } from "antd";

function ReplyComment(props) {
  const user = useSelector((state) => state.user);
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    props.CommentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.CommentLists, props.parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div className="comment_reply">
            <Comment
              actions={[
                <LikeDislikesCm
                  comment
                  commentId={comment._id}
                  userId={localStorage.getItem("userId")}
                />,
              ]}
              author={comment.writer.name}
              avatar={
                <Avatar
                  src={`http://localhost:5000/${comment.writer.image}`}
                  alt="image"
                />
              }
              content={<p>{comment.content}</p>}
            ></Comment>
            {/* <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} /> */}
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p className="view_reply" onClick={handleChange}>
          View {ChildCommentNumber} more comment(s)
        </p>
      )}

      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
