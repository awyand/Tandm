import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import InactiveIcon from '@material-ui/icons/PhonePaused';
import ActiveIcon from '@material-ui/icons/PhoneForwarded';
import PieIcon from '@material-ui/icons/PieChart';
import MapIcon from '@material-ui/icons/Map';
import StorageIcon from '@material-ui/icons/Storage';
import EmailIcon from '@material-ui/icons/Email';
import HelpIcon from '@material-ui/icons/Help';

const Help = () => (
  <Card className="container">
    <CardTitle title="Help" style={{fontWeight: 'bold'}} />
    <img src='images/tandm-logo.png' style={{height: '140px'}}  />
    <CardText style={{textAlign: 'left', padding: '40px'}}>
      <h2>Dashboard</h2>
      <p>
        Upon logging in, you will be presented with a welcome message and
        be able to utilize the sidebar on the left. You may log out at any time
        by using the logout icon in the upper right-hand corner.
      </p>

      <br />

      <h2>Sidebar</h2>
      <p>
        Click the sidebar stack icon in the upper left-hand corner to expand
        the sidebar, or use the buttons once you're familiar with the app.
      </p>
      <p>The sidebar contains the following routes:</p>
      <ul>
        <li>New Mission&nbsp;<AddIcon /></li>
        <li>Saved Missions&nbsp;<InactiveIcon /></li>
        <li>Active Missions&nbsp;<ActiveIcon /></li>
        <li>Reports&nbsp;<PieIcon /></li>
        <li>Maps&nbsp;<MapIcon /></li>
        <li>Inventory&nbsp;<StorageIcon /></li>
        <li>Contact&nbsp;<EmailIcon /></li>
        <li>Help&nbsp;<HelpIcon /></li>
      </ul>

      <br />

      <h2>New Mission</h2>
      <p>
        When you click on the New Mission icon, you will be asked to provide
        a mission name and location, and select the number of phones you want
        to add to your mission (currently, up to four).
      </p>

      <p>
        Once you select the number of phones you'd like to add, a Phone Roster
        box will appear with the corresponding number of phones, in red.
      </p>

    </CardText>
  </Card>
)

export default Help;
