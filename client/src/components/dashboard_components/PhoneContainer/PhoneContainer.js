import React from 'react';
// import styles from './PhoneContainer.css';
import PropTypes from 'prop-types';

import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';

// Selection Options
const networkOptions = [
  'WiFI',
  'Bluetooth',
  'Cellular',
  'USB'
];
const appOptions = [
  'Mail',
  'Maps',
  'Browser',
  'Camera',
  'Signal',
  'Weather',
  'First Aid',
  'MilGPS',
  'Tactical NAV',
  'Evidence Cam',
  'Cargo Decoder',
  'Radio'
];

const cardStyle = {
  width: '80%',
  margin: '10px auto'
}

export default class PhoneContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: this.props.name,
    networks: [],
    apps: []
  }

  handleNetworkAdd = event => {
    this.setState({
      networks: event.target.value
    });
  }

  handleAppAdd = event => {
    this.setState({
      apps: event.target.value
    });
  }



  render() {
    return (
    <Card className="phoneContainer" style={cardStyle}>
      <CardTitle title={this.state.name} />

      <FormControl>
        <InputLabel htmlFor="networks">Networks</InputLabel>
        <Select
          multiple
          value={this.state.networks}
          onChange={this.handleNetworkAdd}
          input={<Input id='networks' />}
        >

          {networkOptions.map(networkOption => (
            <MenuItem key={networkOption}
                      value={networkOption}
                      style={{
                        fontWeight:
                          this.state.networks.indexOf(networkOption) === -1
                            ? 400
                            : 700
                      }}>
              {networkOption}
            </MenuItem>
          ))}

        </Select>
      </FormControl>

      <br />

      <FormControl>
        <InputLabel htmlFor="apps">Apps</InputLabel>
        <Select
          multiple
          value={this.state.apps}
          onChange={this.handleAppAdd}
          input={<Input id='apps' />}
        >

          {appOptions.map(appOption => (
            <MenuItem key={appOption}
                      value={appOption}
                      style={{
                        fontWeight:
                          this.state.apps.indexOf(appOption) === -1
                            ? 400
                            : 700
                      }}>
              {appOption}
            </MenuItem>
          ))}

        </Select>
      </FormControl>


    </Card>

    )
  }
}
