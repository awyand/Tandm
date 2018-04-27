import React from 'react';
import './PhoneMain.css';

import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';
import TextField from 'material-ui-next/TextField';
import Checkbox from 'material-ui-next/Checkbox';

// Project Components
import PhoneContainer from '../PhoneContainer'

const cardStyle = {
  width: '80%',
  margin: '10px auto'
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
  }

  state = {
    name: this.props.name,
    osVersion: '',
    checkedU: false,
    checkedS: false,
    checkedTS: false,
    containers: []
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleOsChange = event => {
    this.setState({
      osVersion: event.target.value
    })
  }

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  render() {
    return (
    <Card className="phoneMain" style={cardStyle}>
      <CardTitle title={this.state.name} />



      <TextField
        id={this.state.name}
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

      {this.state.checkedU && <PhoneContainer name='Unclassified' />}
      {this.state.checkedS && <PhoneContainer name='Secret' />}
      {this.state.checkedTS && <PhoneContainer name='Top Secret' />}


    </Card>
  )
  }
}
