import React from 'react';
import './InactiveMissions.css';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const InactiveMissions = () => (
  <Card className="container">
    <CardTitle title="Inactive Missions" />
    {/* insert conditional so that table only displays if active missions exists */}
  {/* {props.user && <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{props.user.username}</strong>!</CardText>} */}
  </Card>
)

export default InactiveMissions;
