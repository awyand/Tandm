import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          user: xhr.response.user
        });
      }
    });
    xhr.send();
  }



  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Router>
          <div>
          <Sidebar />
          <Dashboard user={this.state.user} />
        </div>
        </Router>
      </div>
    );
  }

}

export default DashboardPage;
