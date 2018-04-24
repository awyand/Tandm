import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import NewMission from './dashboard_components/NewMission';
import ActiveMissions from './dashboard_components/ActiveMissions';
import Contact from './dashboard_components/Contact';
import Help from './dashboard_components/Help';
import Inventory from './dashboard_components/Inventory';
import Mapper from './dashboard_components/Mapper';
import Reports from './dashboard_components/Reports';
import SavedMissions from './dashboard_components/SavedMissions';
import Welcome from './dashboard_components/Welcome';



const Dashboard = ({ user }) => (

    <Card className='container'>
      <Route exact path='/dashboard' render={() => <Welcome user={user} />} />
      <Route exact path='/new' render={() => <NewMission userId={user._id} />} />
      <Route exact path='/saved' component={SavedMissions} />
      <Route exact path='/active' component={ActiveMissions} />
      <Route exact path='/reports' component={Reports} />
      <Route exact path='/map' component={Mapper} />
      <Route exact path='/inventory' component={Inventory} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/help' component={Help} />
    </Card>

);

// Dashboard.propTypes = {
//   user.username: PropTypes.string.isRequired
// };

export default Dashboard;
