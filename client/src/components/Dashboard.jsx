// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Material-UI components
import { Card, CardTitle, CardText } from 'material-ui/Card';

// Project components
import NewMission from './dashboard_components/NewMission.js';
import ActiveMissions from './dashboard_components/ActiveMissions.js';
import Contact from './dashboard_components/Contact.js';
import Help from './dashboard_components/Help.js';
import Inventory from './dashboard_components/Inventory.js';
import Mapper from './dashboard_components/Mapper.js';
import Reports from './dashboard_components/Reports.js';
import InactiveMissions from './dashboard_components/InactiveMissions.js';
import Welcome from './dashboard_components/Welcome.js';

const Dashboard = ({ user }) => (

    <div>
      <Route exact path='/dashboard' render={() => <Welcome user={user} />} />
      <Route exact path='/new' render={() => <NewMission userId={user._id} />} />
      <Route exact path='/inactive' render={() => <InactiveMissions userId={user._id}/>} />
      <Route exact path='/active' render={() => <ActiveMissions userId={user._id} />} />
      <Route exact path='/reports' component={Reports} />
      <Route exact path='/map' component={Mapper} />
      <Route exact path='/inventory' component={Inventory} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/help' component={Help} />
    </div>

);

export default Dashboard;
