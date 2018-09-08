import React, { Component } from "react";
import axios from "axios";
import UserDataTableSummaryContainer from "./containers/UserDataTableSummaryContainer";
import UserDataTableContainer from "./containers/UserDataTableContainer";
import NewUserFormContainer from "./containers/NewUserFormContainer";

class App extends Component {
  state = {
    users: null,
    isLoading: false
  };

  loadUsers = () => {
    this.setState({
      isLoading: true
    });

    axios.get("/users").then(res => {
      this.setState({
        users: res.data,
        isLoading: false
      });
    });
  };

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const { isLoading, users } = this.state;

    return (
      <div>
        {isLoading && <p>Загрузка</p>}
        {Array.isArray(users) &&
          users.length > 0 && (
            <React.Fragment>
              <UserDataTableContainer
                data={users}
                actionsCallback={this.loadUsers}
              />
              <UserDataTableSummaryContainer data={users} />
            </React.Fragment>
          )}
        <NewUserFormContainer submitCallback={this.loadUsers} />
      </div>
    );
  }
}

export default App;
