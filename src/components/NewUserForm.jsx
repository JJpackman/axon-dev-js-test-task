import React, { Component } from "react";
import moment from "moment";

class NewUserForm extends Component {
  state = {
    user: {
      first_name: "",
      last_name: "",
      dob: "",
      location: ""
    },
    touched: {
      first_name: false,
      last_name: false,
      dob: false,
      location: false
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };

  handleInputBlur = field => e => {
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [field]: true
      }
    }));
  };

  validateFields() {
    const { user } = this.state;

    return Object.keys(user).reduce((errors, prop) => {
      errors[prop] = user[prop] === "";
      return errors;
    }, {});
  }

  handleFormSubmit = e => {
    const { user } = this.state;
    this.props.handleSubmit({
      ...user,
      dob: moment(user.dob, "YYYY-MM-DD").format("DD.MM.YYYY")
    });
  };

  render() {
    const errors = this.validateFields();
    const isDisabled = Object.keys(errors).some(field => errors[field]);
    const needShowError = field => {
      const hasError = errors[field];
      const alreadyTouched = this.state.touched[field];

      return hasError ? alreadyTouched : false;
    };

    return (
      <React.Fragment>
        <h2>Form</h2>
        <form onSubmit={this.handleFormSubmit} method="post">
          <div>
            <label>
              First name
              <input
                className={
                  needShowError("first_name") ? "invalid-field" : undefined
                }
                name="first_name"
                type="text"
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur("first_name")}
              />
            </label>
          </div>
          <div>
            <label>
              Last name
              <input
                className={
                  needShowError("last_name") ? "invalid-field" : undefined
                }
                name="last_name"
                type="text"
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur("last_name")}
              />
            </label>
          </div>
          <div>
            <label>
              Date of birth
              <input
                className={needShowError("dob") ? "invalid-field" : undefined}
                name="dob"
                type="date"
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur("dob")}
              />
            </label>
          </div>
          <div>
            <label>
              Location
              <input
                className={
                  needShowError("location") ? "invalid-field" : undefined
                }
                name="location"
                type="text"
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur("location")}
              />
            </label>
          </div>
          <button type="submit" disabled={isDisabled}>
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default NewUserForm;
