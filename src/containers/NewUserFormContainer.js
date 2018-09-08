import React, { Component } from "react";
import axios from "axios";
import NewUserForm from "../components/NewUserForm";

class NewUserFormContainer extends Component {
  handleDataSubmit = data => {
    axios.post("/users", data).then(res => {
      this.props.submitCallback();
    });
  };

  render() {
    return <NewUserForm handleSubmit={this.handleDataSubmit} />;
  }
}

export default NewUserFormContainer;
