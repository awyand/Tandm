import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const styles = {
  welcomeContainer: {
    width: '90%',
    margin: '100px auto 0 auto',
    textAlign: 'center'
  }
}

const Welcome = (props) => (
  <Card style={styles.welcomeContainer}>
    <CardTitle title="Welcome to Tandm" />
  {props.user &&
    <CardText>
      <h2>Welcome <strong>{props.user.username}</strong>!</h2>
      <p>Use the sidebar to navigate the Dashboard</p>
    </CardText>}
  </Card>
)

export default Welcome;
