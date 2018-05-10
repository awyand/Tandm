import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui-next/Avatar';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const styles = {
  welcomeContainer: {
    width: '60%',
    margin: '100px auto 0 auto',
    textAlign: 'center'
  }
}

const Welcome = (props) => (
  <Card style={styles.welcomeContainer}>
    {props.user &&
      <CardText>
        <img src='images/tandm-logo.png' />
        <h2>Weclome to Tandm</h2>
        <h3>You are logged in as: <strong>{props.user.username}</strong></h3>
        <p>Joined: {props.user.dateJoined}</p>
        <p>Use the sidebar to navigate the Dashboard</p>
      </CardText>}
  </Card>
)

export default Welcome;
