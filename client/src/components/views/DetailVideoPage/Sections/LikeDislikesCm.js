import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import "./sections.css";

import { useSelector } from "react-redux";

function LikeDislikesCm(props) {
  const user = useSelector((state) => state.user);
  const [LikesCm, setLikesCm] = useState(0);
  const [DislikesCm, setDislikesCm] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = { commentId: props.commentId, userId: props.userId };

  useEffect(() => {
    Axios.post("/api/likecm/getLikesCm", variable).then((response) => {
      console.log("getLikesCm", response.data);

      if (response.data.success) {
        //How many likes does this video or comment have
        setLikesCm(response.data.likescm.length);

        //if I already click this like button or not
        response.data.likescm.map((likecm) => {
          if (likecm.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    Axios.post("/api/likecm/getDislikesCm", variable).then((response) => {
      console.log("getDislikeCm", response.data);
      if (response.data.success) {
        //How many likes does this video or comment have
        setDislikesCm(response.data.dislikescm.length);

        //if I already click this like button or not
        response.data.dislikescm.map((dislikecm) => {
          if (dislikecm.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  const onLikeCm = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("You must Login! ");
    }

    if (LikeAction === null) {
      Axios.post("/api/likecm/upLikeCm", variable).then((response) => {
        if (response.data.success) {
          setLikesCm(LikesCm + 1);
          setLikeAction("liked");

          //If dislike button is already clicked

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikesCm(DislikesCm - 1);
          }
        } else {
          alert("Failed to increase the like");
        }
      });
    } else {
      Axios.post("/api/likecm/unLikeCm", variable).then((response) => {
        if (response.data.success) {
          setLikesCm(LikesCm - 1);
          setLikeAction(null);
        } else {
          alert("Failed to decrease the like");
        }
      });
    }
  };

  const onDisLikeCm = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("You must Login! ");
    }

    if (DislikeAction !== null) {
      Axios.post("/api/likecm/unDisLikeCm", variable).then((response) => {
        if (response.data.success) {
          setDislikesCm(DislikesCm - 1);
          setDislikeAction(null);
        } else {
          alert("Failed to decrease dislike");
        }
      });
    } else {
      Axios.post("/api/likecm/upDisLikeCm", variable).then((response) => {
        if (response.data.success) {
          setDislikesCm(DislikesCm + 1);
          setDislikeAction("disliked");

          //If dislike button is already clicked
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikesCm(LikesCm - 1);
          }
        } else {
          alert("Failed to increase dislike");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            onClick={onLikeCm}
          />
        </Tooltip>
        <span className="tooltip_likedislike">{LikesCm}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DislikeAction === "disliked" ? "filled" : "outlined"}
            onClick={onDisLikeCm}
          />
        </Tooltip>
        <span className="tooltip_likedislike">{DislikesCm}</span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislikesCm;
