import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Button from 'material-ui-next/Button';

const styles = {
  welcomeCard: {
    borderRadius: '4px',
    boxShadow: '5px 5px 30px #262626',
    margin: '60px auto 0 auto',
    textAlign: 'center',
    maxWidth: '600px',
    padding: '30px'
  },
  logo: {
    height: '180px'
  },
  welcomeText: {
    fontSize: '20px'
  },
  welcomeBtn: {
    margin: '20px 10px'
  }
}

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <Card className='welcome-card' style={styles.welcomeCard}>
        <img src='images/tandm-logo.png' style={styles.logo} />
          {Auth.isUserAuthenticated() ? (
              <CardText>
                <p style={styles.welcomeText}><strong>Welcome to Tandm</strong></p>
                <p>Interactive Mobile Device Management (MDM) solutions for small teams</p>
                <p><strong>You are already logged in</strong></p>
                <br />
                <Link to="/dashboard" style={styles.welcomeBtn}><Button variant='raised' color='secondary'>Home</Button></Link>
                <Link to="/logout" style={styles.welcomeBtn}><Button variant='raised' color='secondary'>Log Out</Button></Link>
              </CardText>
          ) : (
              <CardText>
                <p style={styles.welcomeText}><strong>Welcome to Tandm</strong></p>
                <p>Interactive Mobile Device Management (MDM) solutions for small teams</p>
                <br />
                <Link to="/login" style={styles.welcomeBtn}><Button variant='raised' color='secondary'>Log in</Button></Link>
                <Link to="/signup" style={styles.welcomeBtn}><Button variant='raised' color='secondary'>Sign Up</Button></Link>
              </CardText>
          )}
      </Card>
    )
  }
};

export default HomePage;
