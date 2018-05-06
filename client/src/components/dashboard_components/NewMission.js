// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Redirect } from 'react-router-dom';

// Project Files
import API from '../../utils/API.js';

// Project Components
import Phone from './Phone';
import PhoneRoster from './PhoneRoster';

// Material-UI Components
import TextField from 'material-ui-next/TextField';
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';
import Button from 'material-ui-next/Button';

// Styles
const styles = {
  newMissionContainer: {
    width: '90%',
    marginTop: '100px'
  },
  missionInfoAndRosterContainer: {
    width: '45%',
    float: 'left'
  },
  missionInfoCard: {
    padding: '8px',
    textAlign: 'center',
    width: '100%'
  },
  missionField: {
    margin: '5px auto'
  },
  phoneRosterCard: {
    width: '100%',
    marginTop: '30px',
    textAlign: 'center'
  },
  phoneConfigContainer: {
    marginLeft: '10px'
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
      activePhone: '',
      activePhoneSavedState: {},
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNumPhonesChange = this.handleNumPhonesChange.bind(this);
    this.handleRosterPhoneClick = this.handleRosterPhoneClick.bind(this);
    this.handleSavePhone = this.handleSavePhone.bind(this);
    this.handleAddMission = this.handleAddMission.bind(this);
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

    const phoneName = event.target.name;
    // Check to see if phone is already in phone array
    const match = this.state.missionData.phones.find(phone => phone.name === event.target.name);

    this.setState({
      activePhoneSavedState: match
    });

    this.setState({
      activePhone: event.target.name
    });


  }

  // Handle save phone click handler
  handleSavePhone = newPhone => {
    const match = this.state.missionData.phones.find(phone => phone.name === newPhone.name);

    if (match) {
      const matchedIndex = this.state.missionData.phones.indexOf(match);
      this.state.missionData.phones[matchedIndex] = newPhone;
    } else {
      const updatedPhonesArray = this.state.missionData.phones.concat(newPhone);
      this.setState({
        missionData: { ...this.state.missionData, phones: updatedPhonesArray}
      });
    }

    this.forceUpdate();
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



  render() {

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

      <div style={styles.newMissionContainer}>

        <div style={styles.missionInfoAndRosterContainer}>

          <Card style={styles.missionInfoCard}>
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



          {
            this.state.missionData.numPhones > 0 &&
            <Card style={styles.phoneRosterCard}>
              <CardTitle title="Phone Roster" />
                <PhoneRoster handleRosterPhoneClick={this.handleRosterPhoneClick}
                             numPhones={this.state.missionData.numPhones}
                />

                <br />

                <Button variant="raised" color="primary" onClick={this.handleAddMission}>Add Mission</Button>
              </Card>
          }

        </div>

        <div style={styles.phoneConfigContainer}>
          {
            this.state.activePhone &&
              <Card>
                <Phone id={this.state.activePhone}
                       name={this.state.activePhone}
                       handleSavePhone={this.handleSavePhone}
                       savedState={this.activePhoneSavedState}
                       key={this.state.activePhone}
                />
              </Card>
          }
        </div>


    </div>
    )
  }
}
