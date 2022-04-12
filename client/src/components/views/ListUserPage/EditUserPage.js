import React, { Component } from "react";
import axios from "axios";
import { Typography, Button, Form, message, Input, Icon } from "antd";

const { Title } = Typography;

export default class EditUserPage extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      fullname: "",
      phone: "",
      email: "",
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/users/getUsers/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          //   users: response.data.users
          name: response.data.user.name,
          fullname: response.data.user.fullname,
          phone: response.data.user.phone,
          email: response.data.user.email,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeFullName(e) {
    this.setState({
      fullname: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      fullname: this.state.fullname,
      phone: this.state.phone,
      email: this.state.email,
    };

    console.log(user);
    if (
      this.state.name === "" ||
      this.state.fullname === "" ||
      this.state.phone === "" ||
      this.state.email === ""
    ) {
      return alert("Please first fill all the fields?");
    }

    axios
      .put(
        "http://localhost:5000/api/users/EditUsers/" +
          this.props.match.params.id,
        user
      )
      .then((res) => console.log(res.data));

    window.location = "/ListUser";
  }

  render() {
    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <Title level={2}> Edit User</Title>
        </div>

        <label>Name</label>
        <Input onChange={this.onChangeName} value={this.state.name} />
        <br />
        <br />
        <label>Full Name</label>
        <Input onChange={this.onChangeFullName} value={this.state.fullname} />
        <br />
        <br />
        <label>Phone</label>
        <Input onChange={this.onChangePhone} value={this.state.phone} />
        <br />
        <br />
        <label>Email</label>
        <Input onChange={this.onChangeEmail} value={this.state.email} />
        <br />
        <br />

        <Button type="primary" size="large" onClick={this.onSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}
