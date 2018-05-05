// Dependencies
import React from 'react';

// Project Files
import API from '../../utils/API.js';

// Material-UI Components
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui-next/Table';
import Button from 'material-ui-next/Button';

// Component Export
export default class InactiveMissions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: []
    };

    this.handleActivate = this.handleActivate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // When InactiveMissions component mounts
  componentDidMount() {
    // Call API getMissions methods and pass userId
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

  handleActivate = mission => {
    event.preventDefault();
    // Set mission active key to true
    mission.active = true;
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

  handleDelete = mission => {
    event.preventDefault();
    API.deleteMission(this.props.userId, mission._id)
    .then(res => {
      console.log(res);
      this.setState({
        missions: res.data.missions
      })
    })
    .catch(err => console.log(err));
  }

  render() {

    if (this.state.redirect === true) {
      return <Redirect push to='/active' />
    }

    return (
      <Card className="container">
        <CardTitle title="Inactive Missions" />

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
              {this.state.missions.filter(mission => mission.active === false).map(mission => {
                return (
                  <TableRow key={mission._id}>
                    <TableCell>{mission.name}</TableCell>
                    <TableCell>{mission.dateAdded}</TableCell>
                    <TableCell>{mission.phones.length}</TableCell>
                    <TableCell>
                      <Button variant="raised" color="primary" onClick={() => this.handleActivate(mission)}>Activate</Button>
                      <Button variant="raised" color="secondary" onClick={() => this.handleDelete(mission)}>Delete</Button>
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
