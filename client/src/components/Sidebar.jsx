import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  // handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <Drawer open={this.state.open}>
          <MenuItem><Link to='/dashboard'>Dashboard</Link></MenuItem>
          <MenuItem><Link to='/new'>New Mission</Link></MenuItem>
          <MenuItem><Link to='/inactive'>Inactive Missions</Link></MenuItem>
          <MenuItem><Link to='/active'>Active Missions</Link></MenuItem>
          <MenuItem><Link to='/reports'>Reports</Link></MenuItem>
          <MenuItem><Link to='/map'>Map</Link></MenuItem>
          <MenuItem><Link to='/inventory'>Inventory</Link></MenuItem>
          <MenuItem><Link to='/contact'>Contact</Link></MenuItem>
          <MenuItem><Link to='/help'>Help</Link></MenuItem>
        </Drawer>
      </div>
    );
  }
}
