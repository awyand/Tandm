import React from 'react';
import PropTypes from 'prop-types';

// Material-UI Components
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';


// Styles
const styles = {
  rosterImg: {
    height: '100px'
  },
  phoneRosterItem: {
    // float: 'left'
    display: 'inline-block'
  },
  roster: {
    justifyContent: 'space-evenly'
  }
}


// Component Export
export default class PhoneRoster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numPhones: this.props.numPhones,
      phoneStatus: []
    };

    this.setPhoneStatuses = this.setPhoneStatuses.bind(this);
  }

  componentDidMount() {
    this.setPhoneStatuses();
  }

  componentWillReceiveProps(newProps) {
    this.setState({ numPhones: newProps.numPhones });
    setTimeout(() => this.setPhoneStatuses(), 1);
  }

  setPhoneStatuses() {
    let phoneStatus = [];
    for (let i = 1; i <= this.state.numPhones; i++) {
      if (this.props.savedPhones && this.props.savedPhones.includes(`Phone-${i}`)) {
        phoneStatus.push('green');
      } else {
        phoneStatus.push('red')
      }
    }

    setTimeout(() => {
      this.setState({
        phoneStatus: phoneStatus
      });
    }, 1);
  }

  render() {

    let roster = [];
    for (let i = 1; i <= this.state.numPhones; i++) {
      roster.push(
        <div style={styles.phoneRosterItem}
             key={`Phone-${i}`}>
          <img id={`Phone-${i}`}
               name={`Phone-${i}`}
               src={`images/wireframe-${this.state.phoneStatus[i-1]}.svg`}
               style={styles.rosterImg}
               className='hover-pointer'
               onClick={this.props.handleRosterPhoneClick}
          />
          <p>{`Phone-${i}`}</p>
        </div>
      )
    }

    return (
      <div style={styles.roster}>
        {roster}
      </div>
    )
  }
}
