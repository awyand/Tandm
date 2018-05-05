// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Project Files
import API from '../../utils/API.js';

// Project Components
import PhoneMain from './PhoneMain';
import Phone from './Phone';
import PhoneRoster from './PhoneRoster';

// Material-UI Components
import TextField from 'material-ui-next/TextField';
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';
import Button from 'material-ui-next/Button';

// Styles
const styles = {
  missionInfoContainer: {
    padding: '8px',
    margin: '100px 0 0 60px',
    textAlign: 'center',
    width: '40%'
  },
  missionField: {
    margin: '5px auto'
  },
  phoneListContainer: {
    width: '40%',
    float: 'left'
  },
  phoneRosterContainer: {
    clear: 'left'
  }
}

// Component Export
export default class NewMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      activateOnSave: false,
      missionData: {
        numPhones: 0,
        name: '',
        phones: [],
        active: false,
        location: ''
      },
      apps: [],
      networks: [],
      activePhone: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNumPhonesChange = this.handleNumPhonesChange.bind(this);
    this.handleRosterPhoneClick = this.handleRosterPhoneClick.bind(this);
    this.handleAddMission = this.handleAddMission.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.handleAppClick = this.handleAppClick.bind(this);
    this.handleNetworkClick = this.handleNetworkClick.bind(this);
  }

  // Mission Information box change handlers
  handleNameChange = event => {
    this.setState({
      missionData: { ...this.state.missionData, name: event.target.value }
    });
  }

  handleLocationChange = event => {
    this.setState({
      missionData: { ...this.state.missionData, location: event.target.value }
    })
  }

  handleNumPhonesChange = event => {
    this.setState({
      missionData: { ...this.state.missionData, numPhones: event.target.value }
    });
    this.forceUpdate();
  }

  // Roster click handler
  handleRosterPhoneClick = event => {
    this.setState({
      activePhone: event.target.id
    });
  }

  // Submit Mission button click handler
  handleAddMission = event => {
    event.preventDefault();

    API.addMission(this.props.userId, this.state.missionData)
    .then(res => {
      console.log('API response:');
      console.log(res);
      // add logic for good status res
      this.setState({
        redirect: true
      });
    })
    .catch(err => console.log(err));
  }

  // App click handler
  handleAppClick = event => {
    const clickedIcon = event.target.id;
    const indexOfClickedIcon = this.state.apps.indexOf(clickedIcon);

    if (indexOfClickedIcon !== -1) {
      this.setState({apps: this.state.apps.filter(app => app !== clickedIcon)})
    } else {
      this.setState({apps: this.state.apps.concat(clickedIcon)})
    }
  }

  // Network click hanlder
  handleNetworkClick = event => {
    const clickedIcon = event.target.id;
    const indexOfClickedIcon = this.state.networks.indexOf(clickedIcon);

    if (indexOfClickedIcon !== -1) {
      this.setState({networks: this.state.networks.filter(network => network !== clickedIcon)})
    } else {
      this.setState({networks: this.state.networks.concat(clickedIcon)})
    }
  }

  // Add Phone click handler

  updatePhone = phoneState => {
    let match = this.state.missionData.phones.find(obj => obj.id === phoneState.id);

    if (match) {
      const matchedIndex = this.state.missionData.phones.indexOf(match);
      this.state.missionData.phones[matchedIndex] = phoneState;
      this.forceUpdate();
    } else {
      const newPhoneArr = this.state.missionData.phones.concat(phoneState);
      this.setState({
        missionData: { ...this.state.missionData, phones: newPhoneArr }
      });
    }
  }

  render() {

    let phoneArray = [];
    for (let i = 1; i < this.state.missionData.numPhones + 1; i++) {
      phoneArray.push(i);
    }
    let phoneList = phoneArray.map(phone => (
      <Phone id={`Phone-${phone}`}
             key={`Phone-${phone}`}
             name={`Phone-${phone}`}
      />
    ));

    // If redirect is true, redirect to appropriate view
    // This is used when user submits a mission
    if (this.state.redirect === true) {
      if (this.state.activateOnSave === false) {
        return <Redirect push to='/inactive' />
      }

      if (this.state.activateOnSave === true) {
        return <Redirect push to='/active' />
      }
    }

    return (

      <div>

      <Card style={styles.missionInfoContainer}>
        <CardTitle title="Mission Information" />

          <TextField
            id='missionName'
            label='Mission Name'
            value={this.state.missionData.name}
            onChange={this.handleNameChange}
            placeholder='Op Midnight'
            style={styles.missionField}
          />

          <br />

          <TextField
            id='missionLocation'
            label='Location'
            value={this.state.missionData.location}
            onChange={this.handleLocationChange}
            placeholder='Baghdad, Iraq'
            style={styles.missionField}
          />

          <br />

          <FormControl style={styles.missionField}>
            <InputLabel htmlFor="numPhones">Phones</InputLabel>
            <Select
              value={this.state.missionData.numPhones}
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
      </Card>

      <Card style={styles.phoneRosterContainer}>
        {
          this.state.missionData.numPhones > 0 &&
            <PhoneRoster handleRosterPhoneClick={this.handleRosterPhoneClick}
                         numPhones={this.state.missionData.numPhones}
            />
        }
      </Card>



      <Button variant="raised" color="primary" onClick={this.handleAddMission}>Add Mission</Button>

      {/* {phoneList} */}

      <Card style={styles.phoneListContainer}>
        { phoneList.filter(phone => phone.props.id === this.state.activePhone)}
      </Card>




    </div>
    )
  }
}
