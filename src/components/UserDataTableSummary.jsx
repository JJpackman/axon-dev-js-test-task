import React from "react";
import PropTypes from "prop-types";

const UserDataTableSummary = ({ count, sum, longestString }) => (
  <React.Fragment>
    <h2>Summary</h2>
    <dl>
      <dt>Count of users from Kiev or kiev</dt>
      <dd>{count}</dd>
      <dt>Sum of ages of three oldest users from table</dt>
      <dd>{sum}</dd>
      <dt>Longest string of first name + last name pair</dt>
      <dd>{longestString}</dd>
    </dl>
  </React.Fragment>
);

UserDataTableSummary.propTypes = {
  count: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  longestString: PropTypes.string.isRequired
};

export default UserDataTableSummary;
