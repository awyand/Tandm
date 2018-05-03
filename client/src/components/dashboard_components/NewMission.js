// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Project Files
import API from '../../utils/API.js';

// Project Components
import PhoneMain from './PhoneMain'

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
  addMissionBtn: {
    margin: '10px auto'
  }
}

// Component Export
export default class NewMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      missionData: {
        numPhones: 0,
        name: '',
        phones: [],
        active: false
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumPhonesChange = this.handleNumPhonesChange.bind(this);
    this.handleAddMission = this.handleAddMission.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
  }

  handleNameChange = event => {
    this.setState({
      missionData: { ...this.state.missionData, name: event.target.value }
    });
  }

  handleNumPhonesChange = event => {
    this.setState({
      missionData: { ...this.state.missionData, numPhones: event.target.value },
    });
  }

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

  updatePhone = phoneState => {
    let match = this.state.missionData.phones.find(obj => obj.id === phoneState.id);

    if (match) {
      const matchedIndex = this.state.missionData.phones.indexOf(match);
      this.state.missionData.phones[matchedIndex] = phoneState;
      this.forceUpdate();
    } else {
      const newPhoneArr = this.state.missionData.phones.concat(phoneState);
      // this.setState({
      //   phones: newPhoneArr
      // });
      this.setState({
        missionData: { ...this.state.missionData, phones: newPhoneArr }
      });
    }
  }

  render() {

    // initialize array to hold to hold phoneMain components based on state
    let numPhoneArr = [];
    // construct an array of numbers from 1 to the number of phones in mission
    for (let i = 1; i < this.state.missionData.numPhones + 1; i++) {
      numPhoneArr.push(i);
    }
    // construct an array of PhoneMain components based on numPhoneArr
    let phoneMainList = numPhoneArr.map(numPhone => (
      <PhoneMain id={`Phone${numPhone}`}
                 key={`Phone-${numPhone}`}
                 name={`Phone ${numPhone}`}
                 updatePhone={this.updatePhone}/>
    ));

    // If redirect is true, redirect to inactive view
    if (this.state.redirect === true) {
      return <Redirect push to='/inactive' />
    }

    return (


      <Card className="container">
        <CardTitle title="New Mission" className='test' />

        <img src='images/wireframe.svg' />

          <TextField
            id='missionName'
            label='Mission Name'
            value={this.state.missionData.name}
            onChange={this.handleNameChange}
            placeholder='Op Midnight'
          />

          <FormControl>
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

        {phoneMainList}

        <br />

        <FloatingActionButton onClick={this.handleAddMission} style={styles.addMissionBtn}>
            <ContentAdd />
          </FloatingActionButton>
      </Card>
    )
  }
}
