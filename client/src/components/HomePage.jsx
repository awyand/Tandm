import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <Card className="container">
        <CardTitle title="Welcome to Tandm" subtitle="Please log in or sign up to start." />
          {Auth.isUserAuthenticated() ? (
              <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.
                <br />
                <Link to="/dashboard">Dashboard</Link>
                <br />
                <Link to="/logout">Log out</Link>
              </CardText>
          ) : (
              <CardText style={{ fontSize: '16px', color: 'red' }}>You are not logged in.
                <br />
                <Link to="/login">Log in</Link>
                <br />
                <Link to="/signup">Sign up</Link>
              </CardText>
          )}
      </Card>
    )
  }
};

export default HomePage;
