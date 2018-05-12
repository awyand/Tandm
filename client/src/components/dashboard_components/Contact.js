import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui-next/TextField';
import { FormControl } from 'material-ui-next/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui-next/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import Comment from '@material-ui/icons/Comment';
import PropTypes from 'prop-types';
import Button from 'material-ui-next/Button';
import green from 'material-ui-next/colors/green';
import { CircularProgress } from 'material-ui-next/Progress';
import Snackbar from 'material-ui-next/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from 'material-ui-next/IconButton';

const styles = {
  contactCard: {
    width: '60%',
    margin: '100px auto 0 auto',
    textAlign: 'center'
  },
  textField: {
    margin: '15px auto',
    width: '50%'
  },
  logo: {
    height: '140px'
  },
  contactSubmit: {
    marginBottom: '15px'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '35%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    position: 'relative'
  }
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: '',
      contactEmail: '',
      contactComments: '',
      loading: false,
      success: false,
      snackbarOpen: false,
      snackbarText: 'Success!'
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleNameChange = event => {
    this.setState({ contactName: event.target.value });
  }

  handleEmailChange = event => {
    this.setState({ contactEmail: event.target.value });
  }

  handleCommentsChange = event => {
    this.setState({ contactComments: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.contactName || !this.state.contactEmail || !this.state.contactComments) {
      this.setState({ snackbarText: 'Please fill out entire form.'});
      setTimeout(() => this.handleSnackbarOpen(), 1);
      return;
    }

    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
              snackbarText: 'Success!',
              contactName: '',
              contactEmail: '',
              contactComments: ''
            });
            this.handleSnackbarOpen()
          }, 2000);
        },
      );
    }
  };

  // Snackbar open/close handling
  handleSnackbarOpen = () => {
    this.setState({ snackbarOpen: true });
  }
  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  }

  timer = undefined;

  render() {
    const { loading, success } = this.state;
    return (
      <div>
        <Card style={styles.contactCard}>
          <CardTitle title="Contact" style={{fontWeight: 'bold'}} />

            <img src='images/tandm-logo.png' style={styles.logo} />

            <br />

            <TextField
              id="contactName"
              label="Your Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              value={this.state.contactName}
              onChange={this.handleNameChange}
              style={styles.textField}
            />

            <br />

            <TextField
              id="contactEmail"
              label="Your Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              value={this.state.contactEmail}
              onChange={this.handleEmailChange}
              style={styles.textField}
            />

            <br />

            <TextField
              id="contactComments"
              label="Your Comments"
              style={styles.textField}
              multiline
              rowsMax="6"
              value={this.state.contactComments}
              onChange={this.handleCommentsChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Comment />
                  </InputAdornment>
                ),
              }}
            />

            <br />

            <div style={styles.wrapper}>
              <Button variant="raised"
                      color="primary"
                      id='contactSubmit'
                      onClick={this.handleSubmit}
                      style={styles.contactSubmit}
                      disabled={loading}
              >
                Submit
              </Button>
              {loading && <CircularProgress size={24} style={styles.buttonProgress} />}
            </div>

        </Card>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
            ContentProps={{
              'aria-describedby': 'snack-message-id',
            }}
            message={<span id="snack-message-id">{this.state.snackbarText}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                onClick={this.handleSnackbarClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      </div>
    );
  }
}
