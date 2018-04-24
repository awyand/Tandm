import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './NewMission.css';
import API from '../../../utils/API.js';
import { Card, CardTitle, CardText } from 'material-ui/Card';

export default class NewMission extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    mission: {
      name: 'Operation Overlord',
      phones: [
        {
          name: 'Medic',
          osVersion: 'Android P',
          containers: [
            {
              name: 'Unclassified',
              networks: ['Wifi', 'Bluetooth'],
              apps: ['Mail', 'First Aid']
            },
            {
              name: 'Secret',
              networks: ['Cellular', 'USB'],
              apps: ['Signal', 'Maps']
            }
          ]
        },
        {
          name: 'Solider',
          osVersion: 'KitKat',
          containers: [
            {
              name: 'Unclassified',
              networks: ['Cellular'],
              apps: ['Signal']
            },
            {
              name: 'Secret',
              networks: ['Wifi', 'Bluetooth'],
              apps: ['Maps', 'Camera']
            }
          ]
        }
      ]
    }
  }


  handleAddMission = event => {
    event.preventDefault();

    API.addMission(this.props.userId, this.state.mission)
    .then(res => {
      console.log('API response:');
      console.log(res);
    })
    .catch(err => console.log(err));

  }

  render() {
    return (

      <Card className="container">
        <CardTitle title="New Mission" />
        {/* form goes here */}
        <FloatingActionButton onClick={this.handleAddMission}>
            <ContentAdd />
          </FloatingActionButton>
      </Card>
    )
  }
}
