import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './NewMission.css';
import API from '../../../utils/API.js';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import TextField from 'material-ui-next/TextField';
import Checkbox from 'material-ui-next/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';

export default class NewMission extends React.Component {
  constructor(props) {
    super(props);
  }

  // Dummy data for testing POST route
  // state = {
  //   mission: {
  //     name: 'Operation Overlord',
  //     phones: [
  //       {
  //         name: 'Medic',
  //         osVersion: 'Android P',
  //         containers: [
  //           {
  //             name: 'Unclassified',
  //             networks: ['Wifi', 'Bluetooth'],
  //             apps: ['Mail', 'First Aid']
  //           },
  //           {
  //             name: 'Secret',
  //             networks: ['Cellular', 'USB'],
  //             apps: ['Signal', 'Maps']
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Solider',
  //         osVersion: 'KitKat',
  //         containers: [
  //           {
  //             name: 'Unclassified',
  //             networks: ['Cellular'],
  //             apps: ['Signal']
  //           },
  //           {
  //             name: 'Secret',
  //             networks: ['Wifi', 'Bluetooth'],
  //             apps: ['Maps', 'Camera']
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }

  state = {
    checkedU: false,
    checkedS: false,
    checkedTS: false,
    name: '',
    phones: [
      {
        name: '',
        osVersion: '',
        containers: [
          {
            name: '',
            networks: [],
            apps: []
          }
        ]
      }
    ]
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  }

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });

  }

  handleAddMission = event => {
    event.preventDefault();

    console.log(this.state.name);

    // API.addMission(this.props.userId, this.state.mission)
    // .then(res => {
    //   console.log('API response:');
    //   console.log(res);
    // })
    // .catch(err => console.log(err));

  }

  render() {

    const { classes } = this.props;

    return (


      <Card className="container">
        <CardTitle title="New Mission" />
        {/* form goes here */}
        {/* <form noValidate autoComplete='off'> */}
          <TextField
            id='missionName'
            label='Mission Name'
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder='Aaron'
          />

        {/* </form> */}
        <FormGroup row>
          <FormControlLabel control={
            <Checkbox
            checked={this.state.checkedU}
            onChange={this.handleCheckChange('checkedU')}
            value="checkedU"
            />
          }
          label='U'
          />

          <FormControlLabel control={
            <Checkbox
            checked={this.state.checkedS}
            onChange={this.handleCheckChange('checkedS')}
            value="checkedS"
            />
          }
          label='S'
          />

          <FormControlLabel control={
            <Checkbox
            checked={this.state.checkedTS}
            onChange={this.handleCheckChange('checkedTS')}
            value="checkedTS"
            />
          }
          label='TS'
          />
        </FormGroup>

        {this.state.checkedU && <p>Unclassified</p>}
        {this.state.checkedS && <p>Secret</p>}
        {this.state.checkedTS && <p>Top Secret</p>}

        <p>Add Mission</p>
        <FloatingActionButton onClick={this.handleAddMission}>
            <ContentAdd />
          </FloatingActionButton>
      </Card>
    )
  }
}

// TextField.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
