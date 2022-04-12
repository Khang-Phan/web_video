import React, { useState, useEffect } from "react";
import { Component } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./ListVideoPage.css";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Catogory = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "News" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
];

function EditVideoPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategories] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  //  const [file, setFile] = useState(null);

  React.useEffect(() => {
    getVideo();
  }, []);

  const getVideo = () => {
    axios
      .get("http://localhost:5000/api/video/getVideos/" + props.match.params.id)
      .then((response) => {
        const videoRes = response.data.video;
        setTitle(videoRes.title);
        setDescription(videoRes.description);
        setCategories(videoRes.category);
        setPrivacy(videoRes.privacy);
        setThumbnail(videoRes.thumbnail);
        setFilePath(videoRes.filePath);
        setDuration(videoRes.duration);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeCategory = (e) => {
    setCategories(e.target.value);
  };
  const onChangePrivacy = (e) => {
    setPrivacy(e.target.value);
  };

  // onChangeDescription(e) {
  //   this.setState({
  //     description: e.target.value,
  //   });
  // }

  // onChangeCategory(e) {
  //   this.setState({
  //     category: e.target.value,
  //   });
  // }

  // onChangePrivacy(e) {
  //   this.setState({
  //     privacy: e.target.value,
  //   });
  // }

  const onSubmit = (e) => {
    e.preventDefault();

    const video = {
      title: title,
      description: description,
      category: category,
      privacy: privacy,
    };

    if (title === "" || description === "") {
      return alert("No, Please first fill all the fields");
    }

    axios
      .put(
        "http://localhost:5000/api/video/EditVideo/" + props.match.params.id,
        video
      )
      .then((res) => console.log(res.data));

    if (Thumbnail) {
      const variables = {
        filePath: FilePath,
        duration: Duration,
        thumbnail: Thumbnail,
      };
      axios.post("/api/video/UpdateVideo/" + props.match.params.id, variables);
    }

    if (props.user.userData.isAdmin) {
      props.history.push("/ListVideo");
    } else {
      props.history.push("/ManagerMyVideo");
    }
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.filePath);

        //gerenate thumbnail with this filepath !

        axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.thumbsFilePath);
          } else {
            alert("Failed to make the thumbnails");
          }
        });
      } else {
        alert("failed to save the video in server");
      }
    });
  };
  return (
    <div className="container_listvideo">
      <div className="title_listvideo">
        <Title level={2}> Edit Video</Title>
      </div>
      <Title level={3}>Choose file (mp4)</Title>
      <br />

      <div className="box_listvideo">
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          )}
        </Dropzone>

        {Thumbnail !== "" && (
          <div>
            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
          </div>
        )}
      </div>

      <br />
      <br />
      <label>Title</label>
      <Input onChange={onChangeTitle} value={title} />
      <br />
      <br />
      <label>Description</label>
      <TextArea onChange={onChangeDescription} value={description} />
      <br />
      <br />

      <select onChange={onChangeCategory}>
        {Catogory.map((item, index) => (
          <option
            key={index}
            value={item.label}
            selected={category === item.label}
          >
            {item.label}
          </option>
        ))}
      </select>
      <br />
      <br />

      <select onChange={onChangePrivacy}>
        {Private.map((item, index) => (
          <option
            key={index}
            value={item.value}
            selected={privacy === item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
      <br />
      <br />

      <Button type="primary" size="large" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}
export default EditVideoPage;
