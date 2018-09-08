import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class UserDataTable extends Component {
  state = {
    edited_user: {
      first_name: "",
      last_name: "",
      dob: "",
      location: ""
    },
    edited_user_id: "",
    isFormOpen: false
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      edited_user: {
        ...prevState.edited_user,
        [name]: value
      }
    }));
  };

  validateFields() {
    const { edited_user } = this.state;

    return Object.keys(edited_user).reduce((errors, prop) => {
      errors[prop] = edited_user[prop] === "";
      return errors;
    }, {});
  }

  handleEditting = user => {
    this.state.isFormOpen
      ? this.setState({
          isFormOpen: false
        })
      : this.setState({
          isFormOpen: true,
          edited_user: {
            first_name: user.first_name,
            last_name: user.last_name,
            dob: moment(user.dob, "DD.MM.YYYY").format("YYYY-MM-DD"),
            location: user.location
          },
          edited_user_id: user.id
        });
  };

  handleChangesSubmit = e => {
    const { edited_user, edited_user_id } = this.state;

    this.props.handleEdit(edited_user_id, {
      ...edited_user,
      dob: moment(edited_user.dob, "YYYY-MM-DD").format("DD.MM.YYYY")
    });
    this.setState({
      isFormOpen: false
    });
  };

  render() {
    const { edited_user, isFormOpen } = this.state;
    const errors = this.validateFields();
    const isDisabled = Object.keys(errors).some(field => errors[field]);

    return (
      <React.Fragment>
        <h2>Table</h2>
        <form
          id="edit-form"
          className={!isFormOpen ? "d-none" : undefined}
          onSubmit={this.handleChangesSubmit}
          method="put"
        >
          <div>
            <label>
              First name
              <input
                className={errors["first_name"] ? "invalid-field" : undefined}
                name="first_name"
                value={edited_user.first_name}
                type="text"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last name
              <input
                className={errors["last_name"] ? "invalid-field" : undefined}
                name="last_name"
                value={edited_user.last_name}
                type="text"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Date of birth
              <input
                className={errors["dob"] ? "invalid-field" : undefined}
                name="dob"
                value={edited_user.dob}
                type="date"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Location
              <input
                className={errors["location"] ? "invalid-field" : undefined}
                name="location"
                value={edited_user.location}
                type="text"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <button type="submit" disabled={isDisabled}>
            Save changes
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th style={{ textAlign: "center" }}>DOB</th>
              <th>Location</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(user => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.dob}</td>
                <td>{user.location}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.handleEditting(user)}
                  >
                    {!isFormOpen ? "Edit" : "Close Form"}
                  </button>
                  <button
                    type="button"
                    onClick={() => this.props.handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

UserDataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      dob: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired
    })
  ),
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default UserDataTable;
