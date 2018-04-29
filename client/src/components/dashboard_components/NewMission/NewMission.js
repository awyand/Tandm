// Modules
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

// Styles
const styles = {
  addMissionBtn: {
    margin: '10px auto'
  }
}

// Component Export
export default class NewMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numPhones: 0,
      name: '',
      phones: []
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumPhonesChange = this.handleNumPhonesChange.bind(this);
    this.handleAddMission = this.handleAddMission.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
  }

  // Methods
  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  }

  handleNumPhonesChange = event => {
    this.setState({
      numPhones: event.target.value,
    });

    // Add appropriate number of blank phone objects to phones array in state
    // for (let i = 1; i < event.target.value + 1; i++) {
    //   const newPhoneArr = this.state.phones.concat({
    //     id: '',
    //     name: '',
    //     osVersion: '',
    //     containers: []
    //   });
    //
    //   this.setState({
    //     phones: newPhoneArr
    //   });
    // }

  }

  handleAddMission = event => {
    event.preventDefault();

    // Check to see if there's a mission with the same name in the database
    // If so, alert user
    // If not, add mission

    API.addMission(this.props.userId, this.state)
    .then(res => {
      console.log('API response:');
      console.log(res);
    })
    .catch(err => console.log(err));
  }

  updatePhone = phoneState => {
    let match = this.state.phones.find(obj => obj.id === phoneState.id);

    if (match) {
      const matchedIndex = this.state.phones.indexOf(match);
      this.state.phones[matchedIndex] = phoneState;
      this.forceUpdate();
    } else {
      const newPhoneArr = this.state.phones.concat(phoneState);
      this.setState({
        phones: newPhoneArr
      });
    }
  }

  render() {



    // initialize array to hold to hold phoneMain components based on state
    let numPhoneArr = [];
    // construct an array of numbers from 1 to the number of phones in mission
    for (let i = 1; i < this.state.numPhones + 1; i++) {
      numPhoneArr.push(i);
    }
    // construct an array of PhoneMain components based on numPhoneArr
    let phoneMainList = numPhoneArr.map(numPhone => (
      <PhoneMain id={`Phone${numPhone}`}
                 key={`Phone-${numPhone}`}
                 name={`Phone ${numPhone}`}
                 updatePhone={this.updatePhone}/>
    ));


    return (


      <Card className="container">
        <CardTitle title="New Mission" className='test' />

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

        {phoneMainList}

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
