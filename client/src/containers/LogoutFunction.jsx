// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';

// LogoutFunction component
class LogoutFunction extends React.Component {

  componentDidMount() {
    // Deauthenticate user
    Auth.deauthenticateUser();
    // Change the current URL to / after logout
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <p>Logging out...</p>
      </div>
    )
  }
}

LogoutFunction.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LogoutFunction;
