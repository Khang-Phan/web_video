import React from "react";
import { Menu, SearchIcon, Input } from "antd";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../../../_actions/user_actions";
// import { useHistory } from 'react-router-dom';
const { Search } = Input;

function LeftMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAdmin = user.userData && user.userData.isAdmin;
  // const history =  useHistory();
  const onSearch = (value) => {
    axios.post("/api/video/list", { searchKeyword: value }).then((response) => {
      console.log(response);
      dispatch(getVideos(response.data.videos));
      // props.history.push("/");
    });
  };
  return (
    <>
      {!isAdmin && (
        <Menu mode={props.mode}>
          <Menu.Item key="" style={{ width: 600 }}>
            <Search
              placeholder="input search text"
              enterButton="Search"
              //size="large"
              style={{ margin: "17px" }}
              onSearch={onSearch}
            />
          </Menu.Item>
        </Menu>
      )}
      {/* {isAdmin && (
        <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <a href="/ListUser">User</a>
          </Menu.Item>
          <Menu.Item key="mail">
            <a href="/ListVideo">Video</a>
          </Menu.Item>
          <Menu.Item key="mail">
            <a href="/ListComment">Comment</a>
          </Menu.Item>
        </Menu>
      )} */}
    </>
  );
}

export default LeftMenu;
