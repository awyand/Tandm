// Dependencies
import React from 'react';

// Project Files
import API from '../../utils/API.js';

// Material-UI components
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui-next/Table';
import Button from 'material-ui-next/Button';

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
        <CardTitle title="Active Missions" style={{fontWeight: 'bold'}} />

        <Table>
            <TableHead>
              <TableRow style={{backgroundColor: '#003b8e'}}>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}>Mission Name</TableCell>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}>Location</TableCell>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}>Date Added</TableCell>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}># Phones</TableCell>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.missions.filter(mission => mission.active === true).map((mission, i) => {
                return (
                  <TableRow key={mission._id} style={{backgroundColor: i % 2 === 0 ? 'none' : 'rgba(21,100,191,0.05)'}}>
                    <TableCell style={{textAlign: 'center'}}>{mission.name}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>{mission.location}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>{mission.dateAdded}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>{mission.phones.length}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>
                      <Button
                        variant="raised"
                        color="secondary"
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
