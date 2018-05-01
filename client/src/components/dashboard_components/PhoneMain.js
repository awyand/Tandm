import React from 'react';

// Material-UI Components
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';
import TextField from 'material-ui-next/TextField';
import Checkbox from 'material-ui-next/Checkbox';

// Project Components
import PhoneContainer from './PhoneContainer'

const cardStyle = {
  width: '80%',
  margin: '10px auto',
  padding: '10px'
}

const osOptions = [
  'Android P',
  'Oreo',
  'Nougat',
  'Marshmallow',
  'Lollipop',
  'KitKat'
];

export default class PhoneMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      osVersion: '',
      checkedU: false,
      checkedS: false,
      checkedTS: false,
      containers: []
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOsChange = this.handleOsChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.updateContainer = this.updateContainer.bind(this);
  }



  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });

    setTimeout(() => this.props.updatePhone(this.state), 1);
  }

  handleOsChange = event => {
    this.setState({
      osVersion: event.target.value
    });

    setTimeout(() => this.props.updatePhone(this.state), 1);
  }

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });

    setTimeout(() => this.props.updatePhone(this.state), 1);
  }

  updateContainer = containerState => {
    // Search existing container array for a container object with a matching name (classification)
    let match = this.state.containers.find(obj => obj.name === containerState.name);
    // If there is a match
    if (match) {
      // Grab index of matched object
      const matchedIndex = this.state.containers.indexOf(match);
      // Update state with new container object state
      this.state.containers[matchedIndex] = containerState;
      // Force update
      this.forceUpdate();
    } else {
      // Otherwise, there is no match
      // Add container to existing container array
      const newContainerArr = this.state.containers.concat(containerState);
      this.setState({
        containers: newContainerArr
      })
    }

    setTimeout(() => this.props.updatePhone(this.state), 1);
  }



  render() {
    return (
    <Card className="phoneMain" style={cardStyle}>
      <CardTitle title={this.state.name} />



      <TextField
        id={this.props.name}
        label='Phone Name'
        value={this.state.name}
        onChange={this.handleNameChange}
        placeholder='Medic'
      />

      <FormControl>
        <InputLabel htmlFor="osVersion">OS Version</InputLabel>

        <Select
          value={this.state.osVersion}
          onChange={this.handleOsChange}
          placeholder='Oreo'
          input={<Input id='osVersion' />}
        >

          {osOptions.map(osOption => (
            <MenuItem key={osOption}
                      value={osOption}
            >
              {osOption}
            </MenuItem>
          ))}

        </Select>
      </FormControl>

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

      {this.state.checkedU && <PhoneContainer id='U'
                                              name='Unclassified'
                                              updateContainer={this.updateContainer} />}
      {this.state.checkedS && <PhoneContainer id='S'
                                              name='Secret'
                                              updateContainer={this.updateContainer} />}
      {this.state.checkedTS && <PhoneContainer id='TS'
                                               name='Top Secret'
                                               updateContainer={this.updateContainer} />}


    </Card>
  )
  }
}
