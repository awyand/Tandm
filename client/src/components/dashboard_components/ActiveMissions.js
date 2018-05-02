// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Project Files
import API from '../../utils/API.js';

// Material-UI components
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui-next/Table';
import Button from 'material-ui-next/Button';
import Icon from 'material-ui-next/Icon';

// Component Export
export default class ActiveMissions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: []
    };

    this.handleDeactivate = this.handleDeactivate.bind(this);
  }

  // When ActiveMissions component mounts
  componentDidMount() {
    // Call API getActiveMissions methods and pass userId
    API.getMissions(this.props.userId)
    .then(res => {
      // Log API response
      console.log(res);
      // Push missions array from API response to state
      this.setState({
        missions: res.data.missions
      });
    })
    .catch(err => console.log(err));
  }

  handleDeactivate = mission => {
    event.preventDefault();
    // Set mission active key to true
    mission.active = false;
    // Call API updateMission method and pass userId and mission object
    API.updateMission(this.props.userId, mission)
    .then(res => {
      console.log(res);
      this.setState({
        missions: res.data.missions
      });
    })
    .catch(err => console.log(err));
  }

  render() {

    return (
      <Card className="container">
        <CardTitle title="Active Missions" />

        <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mission Name</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell># Phones</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.missions.filter(mission => mission.active === true).map(mission => {
                return (
                  <TableRow key={mission._id}>
                    <TableCell>{mission.name}</TableCell>
                    <TableCell>{mission.dateAdded}</TableCell>
                    <TableCell>{mission.phones.length}</TableCell>
                    <TableCell>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={() => this.handleDeactivate(mission)}
                      >
                        Deactivate
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

      </Card>
    )
  }
}
