// Dependencies
import React from 'react';

// Project Files
import API from '../../utils/API.js';

// Material-UI Components
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui-next/Table';
import Button from 'material-ui-next/Button';
import { withStyles } from 'material-ui-next/styles';

// Component Export
export default class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AndroidP: 0,
      Oreo: 0,
      Nougat: 0,
      Marshmallow: 0,
      Lollipop: 0,
      KitKat: 0
    };

    this.handlePurhcase = this.handlePurhcase.bind(this);
  }

  // When InactiveMissions component mounts
  componentDidMount() {
    // Call API getMissions methods and pass userId
    API.getInventory(this.props.userId)
    .then(res => {
      // Push inventory object from API response to state
      this.setState({
        AndroidP: res.data.inventory[0],
        Oreo: res.data.inventory[1],
        Nougat: res.data.inventory[2],
        Marshmallow: res.data.inventory[3],
        Lollipop: res.data.inventory[4],
        KitKat: res.data.inventory[5]
      });
    })
    .catch(err => console.log(err));
  }

  handlePurhcase = osIndex => {
    event.preventDefault();
    API.addInventory(this.props.userId, osIndex)
    .then(res => {
      this.setState({
        AndroidP: res.data.inventory.inventory[0],
        Oreo: res.data.inventory.inventory[1],
        Nougat: res.data.inventory.inventory[2],
        Marshmallow: res.data.inventory.inventory[3],
        Lollipop: res.data.inventory.inventory[4],
        KitKat: res.data.inventory.inventory[5]
      });
    })
    .catch(err => console.log(err));
  }

  render() {

    return (
      <Card className="container">
        <CardTitle title="Inventory" style={{fontWeight: 'bold'}} />

        <Table>
            <TableHead>
              <TableRow style={{backgroundColor: '#003b8e'}}>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}>OS Version</TableCell>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}>Phones in Stock</TableCell>
                <TableCell style={{color: '#FFF', textAlign: 'center'}}>Order 10 More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{backgroundColor: 'none'}}>
                <TableCell style={{textAlign: 'center'}}>Android P</TableCell>
                <TableCell style={{textAlign: 'center'}}>{this.state.AndroidP}</TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  <Button variant="raised" color="primary" onClick={() => this.handlePurhcase(0)}>Order</Button>
                </TableCell>
              </TableRow>
              <TableRow style={{backgroundColor: 'rgba(21,100,191,0.05)'}}>
                <TableCell style={{textAlign: 'center'}}>Oreo</TableCell>
                <TableCell style={{textAlign: 'center'}}>{this.state.Oreo}</TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  <Button variant="raised" color="primary" onClick={() => this.handlePurhcase(1)}>Order</Button>
                </TableCell>
              </TableRow>
              <TableRow style={{backgroundColor: 'none'}}>
                <TableCell style={{textAlign: 'center'}}>Nougat</TableCell>
                <TableCell style={{textAlign: 'center'}}>{this.state.Nougat}</TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  <Button variant="raised" color="primary" onClick={() => this.handlePurhcase(2)}>Order</Button>
                </TableCell>
              </TableRow>
              <TableRow style={{backgroundColor: 'rgba(21,100,191,0.05)'}}>
                <TableCell style={{textAlign: 'center'}}>Marshmallow</TableCell>
                <TableCell style={{textAlign: 'center'}}>{this.state.Marshmallow}</TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  <Button variant="raised" color="primary" onClick={() => this.handlePurhcase(3)}>Order</Button>
                </TableCell>
              </TableRow>
              <TableRow style={{backgroundColor: 'none'}}>
                <TableCell style={{textAlign: 'center'}}>Lollipop</TableCell>
                <TableCell style={{textAlign: 'center'}}>{this.state.Lollipop}</TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  <Button variant="raised" color="primary" onClick={() => this.handlePurhcase(4)}>Order</Button>
                </TableCell>
              </TableRow>
              <TableRow style={{backgroundColor: 'rgba(21,100,191,0.05)'}}>
                <TableCell style={{textAlign: 'center'}}>KitKat</TableCell>
                <TableCell style={{textAlign: 'center'}}>{this.state.KitKat}</TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  <Button variant="raised" color="primary" onClick={() => this.handlePurhcase(5)}>Order</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

      </Card>
    )
  }
}
