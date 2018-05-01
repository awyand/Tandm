// Modules
import React from 'react';
import PropTypes from 'prop-types';

// Project Files
import API from '../../utils/API.js';

// Material-UI Components
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui-next/Table';
import Button from 'material-ui-next/Button';
import Icon from 'material-ui-next/Icon';

// Component Export
export default class InactiveMissions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: []
    }
  }

  // When InactiveMissions component mounts
  componentDidMount() {
    // Get data from API
    API.getMissions(this.props.userId)
    .then(res => {
      console.log('API Response:');
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
        <CardTitle title="Inactive Missions" />

        <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mission Name</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell># Phones</TableCell>
                <TableCell>Active?</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.missions.map(mission => {
                return (
                  <TableRow key={mission._id}>
                    <TableCell>{mission.name}</TableCell>
                    <TableCell>{mission.dateAdded}</TableCell>
                    <TableCell>{mission.phones.length}</TableCell>
                    <TableCell>{mission.active ? 'Y' : 'N'}</TableCell>
                    <TableCell>
                      <Button variant="raised" color="primary">Activate</Button>
                      <Button variant="raised" color="secondary">Delete</Button>
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
