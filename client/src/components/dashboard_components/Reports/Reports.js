import React from 'react';
import './Reports.css';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Reports = () => (
  <Card className="container">
    <CardTitle title="Active Missions Reports" />
    {/* this will be a full blown component populated by active missions */}
  </Card>
)

export default Reports;
