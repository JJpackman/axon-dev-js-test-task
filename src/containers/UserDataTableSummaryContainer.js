import React, { Component } from "react";
import moment from "moment";
import UserDataTableSummary from "../components/UserDataTableSummary";

class UserDataTableSummaryContainer extends Component {
  getUsersFromLocations(locations) {
    return this.props.data.filter(user => locations.includes(user.location));
  }

  getAgeComparatorDesc() {
    return (user1, user2) =>
      moment().diff(moment(user2.dob, "DD.MM.YYYY"), "years") -
      moment().diff(moment(user1.dob, "DD.MM.YYYY"), "years");
  }

  usersAgeSumReducer() {
    return (sum, user) =>
      sum + moment().diff(moment(user.dob, "DD.MM.YYYY"), "years");
  }

  usersFullnameReducer() {
    return (fullname1, fullname2) =>
      fullname1.length > fullname2.length ? fullname1 : fullname2;
  }

  render() {
    const { data } = this.props;

    return (
      <UserDataTableSummary
        count={this.getUsersFromLocations(["Kiev", "kiev"]).length}
        sum={[...data]
          .sort(this.getAgeComparatorDesc())
          .slice(0, 3)
          .reduce(this.usersAgeSumReducer(), 0)}
        longestString={data
          .map(user => user.first_name + " " + user.last_name)
          .reduce(this.usersFullnameReducer())}
      />
    );
  }
}

export default UserDataTableSummaryContainer;
