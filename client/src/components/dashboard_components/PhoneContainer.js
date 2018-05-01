import React from 'react';
import PropTypes from 'prop-types';

// Material-UI Components
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';

// Network Options
const networkOptions = [
  'WiFi',
  'Bluetooth',
  'Cellular',
  'USB'
];

// App Options
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

// Styles
const cardStyle = {
  width: '80%',
  margin: '10px auto'
}

// Component Export
export default class PhoneContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      networks: [],
      apps: []
    };

    this.handleNetworkAdd = this.handleNetworkAdd.bind(this);
    this.handleAppAdd = this.handleAppAdd.bind(this);
  }



  handleNetworkAdd = event => {
    this.setState({
      networks: event.target.value
    });

    setTimeout(() => this.props.updateContainer(this.state), 1);
  }

  handleAppAdd = event => {
    this.setState({
      apps: event.target.value
    });

    setTimeout(() => this.props.updateContainer(this.state), 1);
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


// <Card className="phoneContainer" style={cardStyle}>
//   <CardTitle title={this.state.name} />
//
//   <FormControl>
//     <InputLabel htmlFor="networks">Networks</InputLabel>
//     <Select
//       multiple
//       value={this.state.networks}
//       onChange={this.handleNetworkAdd}
//       input={<Input id='networks' />}
//     >
//
//       {networkOptions.map(networkOption => (
//         <MenuItem key={networkOption}
//                   value={networkOption}
//                   style={{
//                     fontWeight:
//                       this.state.networks.indexOf(networkOption) === -1
//                         ? 400
//                         : 700
//                   }}>
//           {networkOption}
//         </MenuItem>
//       ))}
//
//     </Select>
//   </FormControl>
//
//   <br />
//
//   <FormControl>
//     <InputLabel htmlFor="apps">Apps</InputLabel>
//     <Select
//       multiple
//       value={this.state.apps}
//       onChange={this.handleAppAdd}
//       input={<Input id='apps' />}
//     >
//
//       {appOptions.map(appOption => (
//         <MenuItem key={appOption}
//                   value={appOption}
//                   style={{
//                     fontWeight:
//                       this.state.apps.indexOf(appOption) === -1
//                         ? 400
//                         : 700
//                   }}>
//           {appOption}
//         </MenuItem>
//       ))}
//
//     </Select>
//   </FormControl>
//
//
// </Card>
