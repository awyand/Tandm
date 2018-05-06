import React from 'react';

// Material-UI Components
import Button from 'material-ui-next/Button';
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';

const styles = {
  svgStyle: {
    enableBackground:'new 0 0 101.001 101.001',
    margin: '0 auto'
  }
}

const osOptions = [
  'Android P',
  'Oreo',
  'Nougat',
  'Marshmallow',
  'Lollipop',
  'KitKat'
];

// Component Export
export default class Phone extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.savedState || {
        name: this.props.name,
        networks: [],
        apps: [],
        osVersion: '',
      };

    this.handleAppClick = this.handleAppClick.bind(this);
    this.handleNetworkClick = this.handleNetworkClick.bind(this);
    this.handleOsChange = this.handleOsChange.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.savedState) {
  //     this.setState({
  //       name: newProps.savedState.name,
  //       apps: newProps.savedState.apps,
  //       networks: newProps.savedState.networks,
  //       osVersion: newProps.savedState.osVersion
  //     });
  //   } else {
  //     this.setState({
  //       name: newProps.name,
  //       apps: [],
  //       networks: [],
  //       osVersion: ''
  //     });
  //   }
  // }

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

  handleOsChange = event => {
    this.setState({
      osVersion: event.target.value
    });
  }

  savePhoneState = event => {

    // Validation
    if (this.state.apps.length < 1) {
      console.log('Please select at least one app');
    } else if (this.state.networks.length < 1) {
      console.log('Please select at least one network');
    } else if (!this.state.osVersion) {
      console.log('Please select OS Version');
    } else {
      // If form is filled out sufficiently
      // Construct newPhone object
      const newPhone = {
        name: event.target.name,
        apps: this.state.apps,
        networks: this.state.networks,
        osVersion: this.state.osVersion
      }
      // Call NewMission's handleSavePhone method, passing newPhone object
      setTimeout(() => this.props.handleSavePhone(newPhone), 1);
    }
  }

  render() {
    return (

      <div>

      <svg version="1.1" id="Capa_1" x="0px" y="0px" width="512px"
           height="512px" viewBox="0 0 101.001 101.001"
           style={styles.svgStyle}>

        <path d="M66.132,0H34.87c-5.692,0-10.306,4.614-10.306,10.307v80.387c0,
          5.692,4.614,10.307,10.306,10.307h31.262   c5.691,0,10.306-4.614,
          10.306-10.307V10.306C76.438,4.614,71.823,0,66.132,0z M65.188,
          6.25c0.759,0,1.375,0.615,1.375,1.375   c0,0.76-0.616,1.375-1.375,
          1.375s-1.375-0.615-1.375-1.375C63.813,6.865,64.429,6.25,65.188,
          6.25z M60.063,7.25   c0.414,0,0.75,0.336,0.75,0.75c0,0.414-0.336,
          0.75-0.75,0.75s-0.75-0.336-0.75-0.75C59.313,7.586,59.648,7.25,
          60.063,7.25z    M57.626,7.25c0.414,0,0.75,0.336,0.75,0.75c0,
          0.414-0.336,0.75-0.75,0.75s-0.75-0.336-0.75-0.75   C56.876,7.586,
          57.212,7.25,57.626,7.25z M44.75,4.5h11.5c0.345,0,0.625,0.279,0.625,
          0.625c0,0.346-0.28,0.625-0.625,0.625h-11.5   c-0.345,
          0-0.625-0.279-0.625-0.625C44.125,4.779,44.405,4.5,44.75,
          4.5z M54.884,98.309h-8.766c-1.446,0-2.617-1.172-2.617-2.617h14
          C57.501,97.137,56.329,98.309,54.884,98.309z
          M73.056,90.229h-45.11V10.77h45.11V90.229z" fill="#575b5e"/>

          <image id='cell'
                 onClick={this.handleNetworkClick}
                 className='hover-pointer'
                 xlinkHref={`images/app-icons/cell-${this.state.networks.includes('cell') ? 'color' : 'bw'}.png`}
                 height='5'
                 width='5'
                 x='67'
                 y='11'
          />

          <image id='wifi'
                 onClick={this.handleNetworkClick}
                 className='hover-pointer'
                 xlinkHref={`images/app-icons/wifi-${this.state.networks.includes('wifi') ? 'color' : 'bw'}.png`}
                 height='5'
                 width='5'
                 x='60'
                 y='11'
          />

          <image id='usb'
                 onClick={this.handleNetworkClick}
                 className='hover-pointer'
                 xlinkHref={`images/app-icons/usb-${this.state.networks.includes('usb') ? 'color' : 'bw'}.png`}
                 height='5'
                 width='5'
                 x='53'
                 y='11'
          />

          <image id='bluetooth'
                 onClick={this.handleNetworkClick}
                 className='hover-pointer'
                 xlinkHref={`images/app-icons/bluetooth-${this.state.networks.includes('bluetooth') ? 'color' : 'bw'}.png`}
                 height='5'
                 width='5'
                 x='46'
                 y='11'
          />

          <g>
            <image id='mail'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/mail-${this.state.apps.includes('mail') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='30'
                   y='20'
            />

            <text x='33' y='35' fontFamily='Roboto' fontSize='3px'>Mail</text>
          </g>

          <g>
            <image id='messages'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/messages-${this.state.apps.includes('messages') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='44.5'
                   y='20'
            />

            <text x='47.25' y='35' fontFamily='Roboto' fontSize='3px'>Chat</text>
          </g>

          <g>
            <image id='chrome'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/chrome-${this.state.apps.includes('chrome') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='59'
                   y='20'
            />

            <text x='59.75' y='35' fontFamily='Roboto' fontSize='3px'>Chrome</text>
          </g>

          <g>
            <image id='camera'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/camera-${this.state.apps.includes('camera') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='30'
                   y='42'
            />

            <text x='31' y='57' fontFamily='Roboto' fontSize='3px'>Camera</text>
          </g>

          <g>
            <image id='maps'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/maps-${this.state.apps.includes('maps') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='44.5'
                   y='42'
            />

            <text x='46.8' y='57' fontFamily='Roboto' fontSize='3px'>Maps</text>
          </g>

          <g>
            <image id='weather'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/weather-${this.state.apps.includes('weather') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='59'
                   y='42'
            />

            <text x='59.5' y='57' fontFamily='Roboto' fontSize='3px'>Weather</text>
          </g>

          <g>
            <image id='aid'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/aid-${this.state.apps.includes('aid') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='30'
                   y='64'
            />

            <text x='30.65' y='79' fontFamily='Roboto' fontSize='3px'>First Aid</text>
          </g>

          <g>
            <image id='survival'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/survival-${this.state.apps.includes('survival') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='44.5'
                   y='64'
            />

            <text x='45.4' y='79' fontFamily='Roboto' fontSize='3px'>Survival</text>
          </g>

          <g>
            <image id='radar'
                   onClick={this.handleAppClick}
                   className='hover-pointer'
                   xlinkHref={`images/app-icons/radar-${this.state.apps.includes('radar') ? 'color' : 'bw'}.png`}
                   height='12'
                   width='12'
                   x='59'
                   y='64'
            />

            <text x='61' y='79' fontFamily='Roboto' fontSize='3px'>Radar</text>
          </g>

          <text x='43.5' y='86' fontFamily='Roboto' fontSize='4px'>{this.props.name}</text>

      </svg>

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

      <Button variant="raised"
              color="primary"
              key={this.props.name}
              name={this.props.name}
              onClick={this.savePhoneState}>
        Save Phone
      </Button>

    </div>
    )
  }
}
