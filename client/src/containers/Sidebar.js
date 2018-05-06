// Dependencies
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui-next/List';
import { Link } from 'react-router-dom';

// Icons
import AddIcon from '@material-ui/icons/AddCircleOutline';
import InactiveIcon from '@material-ui/icons/PhonePaused';
import ActiveIcon from '@material-ui/icons/PhoneForwarded';
import PieIcon from '@material-ui/icons/PieChart';
import MapIcon from '@material-ui/icons/Map';
import StorageIcon from '@material-ui/icons/Storage';
import EmailIcon from '@material-ui/icons/Email';
import HelpIcon from '@material-ui/icons/Help';

export const newMissionItems = (
  <div>
      <ListItem button>
        <Link to='/new'>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
        </Link>
        <Link to='/new'>
          <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;New Mission" />
        </Link>
      </ListItem>
  </div>
)


export const missionItems = (
  <div>
    <ListItem button>
      <Link to='/inactive'>
        <ListItemIcon>
          <InactiveIcon />
        </ListItemIcon>
      </Link>
      <Link to='/inactive'>
        <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Inactive Missions" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to='/active'>
        <ListItemIcon>
          <ActiveIcon />
        </ListItemIcon>
      </Link>
      <Link to='/active'>
        <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Active Missions" />
      </Link>
    </ListItem>
  </div>
)

export const reportItems = (
  <div>
    <ListItem button>
      <Link to='/reports'>
        <ListItemIcon>
          <PieIcon />
        </ListItemIcon>
      </Link>
        <Link to='/reports'>
      <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Reports"
                    secondary="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Active Missions"/>
      </Link>
    </ListItem>
    <ListItem button>
      <Link to='/map'>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
      </Link>
      <Link to='/map'>
        <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Map"
                      secondary="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Active Missions"/>
      </Link>
    </ListItem>
  </div>
)

export const inventoryItems = (
  <div>
    <ListItem button>
      <Link to='/inventory'>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
      </Link>
      <Link to='/inventory'>
        <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Inventory" />
      </Link>
    </ListItem>
  </div>
)

export const miscItems = (
  <div>
    <ListItem button>
      <Link to='/contact'>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
      </Link>
      <Link to='/contact'>
        <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Contact" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to='help'>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
      </Link>
      <Link to='/help'>
        <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Help" />
      </Link>
    </ListItem>
  </div>
)
