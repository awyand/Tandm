// Dependencies
import React from 'react';

// Project Files
import API from '../../utils/API.js';

// Material-UI Components
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui-next/Table';
import Button from 'material-ui-next/Button';
import { withStyles } from 'material-ui-next/styles';

// Component Export
export default class InactiveMissions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: [],
      hover: false
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

  toggleHover = () => {
    this.setState({
      hover: true
    });
  }

  render() {

    if (this.state.redirect === true) {
      return <Redirect push to='/active' />
    }

    return (
      <Card className="container">
        <CardTitle title="Inactive Missions" style={{fontWeight: 'bold'}} />

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
              {this.state.missions.filter(mission => mission.active === false).map((mission, i) => {
                return (
                  <TableRow key={mission._id} style={{backgroundColor: i % 2 === 0 ? `rgba(21,100,191,0.05)` : 'none'}}>
                    <TableCell style={{textAlign: 'center'}}>{mission.name}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>{mission.location}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>{mission.dateAdded}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>{mission.phones.length}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>
                      <Button variant="raised" style={{marginRight: '4px'}} color="primary" onClick={() => this.handleActivate(mission)}>Activate</Button>
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
