import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Welcome = (props) => (
  <Card className="container">
    <CardTitle title="Dashboard" />
  {props.user && <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{props.user.username}</strong>!</CardText>}

  </Card>
)

export default Welcome;
