import React from 'react';
import './Inventory.css';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Inventory = () => (
  <Card className="container">
    <CardTitle title="Inventory" />
    {/* need to add inventory to user object in database and dynamically update based on missions */}
  </Card>
)

export default Inventory;
