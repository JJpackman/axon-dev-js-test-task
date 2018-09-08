import React, { Component } from "react";
import axios from "axios";
import UserDataTable from "../components/UserDataTable";

class UserDataTableContainer extends Component {
  handleEditData = (id, data) => {
    axios.put(`/users/${id}`, data).then(res => {
      this.props.actionsCallback();
    });
  };

  handleDeleteData = id => {
    axios.delete(`/users/${id}`).then(res => {
      this.props.actionsCallback();
    });
  };

  render() {
    return (
      <UserDataTable
        data={this.props.data}
        handleDelete={this.handleDeleteData}
        handleEdit={this.handleEditData}
      />
    );
  }
}

export default UserDataTableContainer;
