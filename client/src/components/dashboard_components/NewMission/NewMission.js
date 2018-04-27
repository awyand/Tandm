import React from 'react';
import PropTypes from 'prop-types';

// Project Files
import './NewMission.css';
import API from '../../../utils/API.js';

// Project Components
import PhoneMain from '../PhoneMain'

// Material-UI Components
import TextField from 'material-ui-next/TextField';

import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';

const styles = {
  addMissionBtn: {
    margin: '10px auto'
  }
}

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
    numPhones: 0,
    osVersion: '',
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

  handleNumPhonesChange = event => {
    this.setState({
      numPhones: event.target.value
    })
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

    let phoneBoxes = [];
    for (let i = 1; i < this.state.numPhones + 1; i++) {
      phoneBoxes.push(i);
    }


    let phoneBoxList = phoneBoxes.map(phoneBox => (
      <PhoneMain key={`Phone-${phoneBox}`} name={`Phone ${phoneBox}`}/>
    ));


    return (


      <Card className="container">
        <CardTitle title="New Mission" />

          <TextField
            id='missionName'
            label='Mission Name'
            value={this.state.name}
            onChange={this.handleNameChange}
            placeholder='Op Midnight'
          />

          <FormControl>
            <InputLabel htmlFor="numPhones">Phones</InputLabel>
            <Select
              value={this.state.numPhones}
              onChange={this.handleNumPhonesChange}
              inputProps={{
                name: 'numPhones',
                id: 'numPhones',
              }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>

        {phoneBoxList}

        <br />

        <FloatingActionButton onClick={this.handleAddMission} style={styles.addMissionBtn}>
            <ContentAdd />
          </FloatingActionButton>
      </Card>
    )
  }
}

// TextField.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
