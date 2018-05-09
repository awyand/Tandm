// Dependencies
import React from 'react';
import Chart from 'chart.js';

// Material-UI Components
import { Card, CardTitle, CardText } from 'material-ui/Card';

// Project Files
import API from '../../utils/API.js';

const styles = {
  chartCardStyle: {
    display: 'inline-block',
    height: '280px',
    width: '40%',
    lineHeight: 0,
    textAlign: 'center',
    margin: '10px 20px'
  },
  chartsContainer: {
    width: '95%',
    margin: '50px auto',
    textAlign: 'center'
  }
}


export default class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.makeCharts = this.makeCharts.bind(this);
    this.getAppUseTotals = this.getAppUseTotals.bind(this);
    this.getNetworkUseTotals = this.getNetworkUseTotals.bind(this);
    this.getOsUseTotals = this.getOsUseTotals.bind(this);
  }

  componentDidMount() {
    // Call API getMissions methods and pass userId
    API.getMissions(this.props.userId)
    .then(res => {
      // Send mission to makeCharts method
      this.makeCharts(res.data.missions);
    })
    .catch(err => console.log(err));
  }

  getAppUseTotals = (missions, app) => {
    let count = 0;
    missions.map(mission => {
      count += mission.phones.filter(phone => phone.apps.includes(app)).length;
    });
    return count;
  }

  getNetworkUseTotals = (missions, network) => {
    let count = 0;
    missions.map(mission => {
      count += mission.phones.filter(phone => phone.networks.includes(network)).length;
    });
    return count;
  }

  getOsUseTotals = (missions, os) => {
    let count = 0;
    missions.map(mission => {
      count += mission.phones.filter(phone => phone.osVersion === os).length;
    });
    return count;
  }


  makeCharts = missions => {

    const ctActive = document.getElementById("activePieChart");
    const activePieChart = new Chart(ctActive, {
      type: 'doughnut',
      data: {
        datasets: [{ data: [missions.filter(mission => mission.active).length,
                            missions.filter(mission => !mission.active).length],
                     backgroundColor: ['#003c8f', '#ffeb3b']
                   }],
        labels: ['Active', 'Inactive']
      }
    });

    // Times each app was used (bar chart)
    const ctAppUse = document.getElementById('appUseBarChart');
    const appUseBarChart = new Chart(ctAppUse, {
      type: 'bar',
      data: {
        datasets: [{ data: [this.getAppUseTotals(missions,'mail'),
                            this.getAppUseTotals(missions,'chrome'),
                            this.getAppUseTotals(missions,'messages'),
                            this.getAppUseTotals(missions,'camera'),
                            this.getAppUseTotals(missions,'maps'),
                            this.getAppUseTotals(missions,'weather'),
                            this.getAppUseTotals(missions,'aid'),
                            this.getAppUseTotals(missions,'survival'),
                            this.getAppUseTotals(missions,'radar')],
                     backgroundColor: ['#40407a', '#ff5252', '#218c74', '#ff793f', '#ffb142', '#34ace0', '#cc8e35', '#2c2c54', '#33d9b2']
                   }],
        labels: ['Mail', 'Chrome', 'Chat', 'Camera', 'Maps', 'Weather', 'First Aid', 'Survival', 'Radar']
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // Times each network was used (bar chart)
    const ctNetworkUse = document.getElementById('networkUseBarChart');
    const networkUseBarChart = new Chart(ctNetworkUse, {
      type: 'bar',
      data: {
        datasets: [{ data: [this.getNetworkUseTotals(missions,'bluetooth'),
                            this.getNetworkUseTotals(missions,'usb'),
                            this.getNetworkUseTotals(missions,'wifi'),
                            this.getNetworkUseTotals(missions,'cell')],
                     backgroundColor: ['#EA2027', '#009432', '#0652DD', '#6F1E51']
                   }],
        labels: ['Bluetooth', 'USB', 'Wifi', 'Cellular']
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // OS Versions
    const ctOsUse = document.getElementById('osUseDonutChart');
    const osUseDonutChart = new Chart(ctOsUse, {
      type: 'doughnut',
      data: {
        datasets: [{ data: [this.getOsUseTotals(missions,'Android P'),
                            this.getOsUseTotals(missions,'Oreo'),
                            this.getOsUseTotals(missions,'Nougat'),
                            this.getOsUseTotals(missions,'Marshmallow'),
                            this.getOsUseTotals(missions,'Lollipop'),
                            this.getOsUseTotals(missions,'KitKat')],
                     backgroundColor: ['#0097e6', '#c23616', '#e1b12c', '#718093', '#44bd32', '#8c7ae6']
                   }],
        labels: ['Android P', 'Oreo', 'Nougat', 'Marshmallow', 'Lollipop', 'KitKat'],
        options: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  render() {
    return (
      <div style={styles.chartsContainer}>
        <Card style={styles.chartCardStyle}>
          <h2>Active State</h2>
          <canvas id='activePieChart' height='140'></canvas>
        </Card>
        <Card style={styles.chartCardStyle}>
          <h2>Total App Usage</h2>
          <canvas id='appUseBarChart' height='140'></canvas>
        </Card>
        <Card style={styles.chartCardStyle}>
          <h2>Total Network Usage</h2>
          <canvas id='networkUseBarChart' height='140'></canvas>
        </Card>
        <Card style={styles.chartCardStyle}>
          <h2>Total OS Usage</h2>
          <canvas id='osUseDonutChart' height='140'></canvas>
        </Card>
      </div>
    )
  }


}
