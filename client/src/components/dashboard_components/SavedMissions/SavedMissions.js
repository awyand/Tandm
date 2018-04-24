import React from 'react';
import './SavedMissions.css';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const SavedMissions = () => (
  <Card className="container">
    <CardTitle title="Saved Missions" />
    {/* insert conditional so that table only displays if active missions exists */}
  {/* {props.user && <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{props.user.username}</strong>!</CardText>} */}
  </Card>
)

export default SavedMissions;
