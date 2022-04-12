import React, { Component } from "react";
import axios from "axios";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./MyVideoPage.css";
const { Title } = Typography;

function EditMyProfilePage(props) {
  const user = useSelector((state) => state.user);
  // const [user, setUser] = useState();

  const [name, setName] = useState();
  const [fullname, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState(null);

  // const user = useSelector((state) => state.user);

  React.useEffect(() => {
    getProfile();
  }, [user]);

  const getProfile = () => {
    if (user.userData) {
      axios
        .get("http://localhost:5000/api/users/getUsers/" + user.userData._id)
        .then((response) => {
          //   setUser(response.data.user);
          const userRes = response.data.user;
          setName(userRes.name);
          setFullName(userRes.fullname);
          setPhone(userRes.phone);
          setEmail(userRes.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const params = {
      name: name,
      fullname: fullname,
      phone: phone,
      email: email,
    };

    axios
      .put(
        "http://localhost:5000/api/users/EditUsers/" + user.userData._id,
        params
      )
      .then((res) => console.log(res.data));

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      axios.post(
        "http://localhost:5000/api/users/UpdateImage/" + user.userData._id,
        formData
      );
    }

    window.location = "/MyVideo";
  };

  const onChangeAvatar = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container_myvideo_2">
      <div className="title_myvideo_2">
        <Title level={2}> Edit My Profile</Title>
      </div>

      <label>Name</label>
      <Input onChange={onChangeName} value={name} />
      <br />
      <br />
      <label>Full Name</label>
      <Input onChange={onChangeFullName} value={fullname} />
      <br />
      <br />
      <label>Phone</label>
      <Input onChange={onChangePhone} value={phone} />
      <br />
      <br />
      <label>Email</label>
      <Input onChange={onChangeEmail} value={email} />
      <br />
      <br />
      <input type="file" id="myfile" name="myfile" onChange={onChangeAvatar} />
      <br />
      <br />
      <Button type="primary" size="large" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default EditMyProfilePage;
