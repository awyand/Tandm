import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui-next/Button';

const styles = {
  signupCard: {
    borderRadius: '4px',
    boxShadow: '5px 5px 30px #262626',
    margin: '60px auto 0 auto',
    textAlign: 'center',
    maxWidth: '600px',
    padding: '30px'
  },
  logo: {
    height: '150px'
  },
  welcomeText: {
    fontSize: '20px'
  },
  welcomeBtn: {
    margin: '0 10px'
  },
  floatingLabelFocusStyle: {
    color: '#5e91f2'
  },
  underlineStyle: {
    borderColor: '#5e91f2'
  }
}

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card style={styles.signupCard}>
    <img src='images/tandm-logo.png' style={styles.logo} />
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {/* {errors.summary && <p className="error-message">{errors.summary}</p>} */}

      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          underlineFocusStyle={styles.underlineStyle}
          name="username"
          errorText={errors.username}
          onChange={onChange}
          value={user.username}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          underlineFocusStyle={styles.underlineStyle}
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <Button type='submit' variant='raised' color='secondary'>Sign Up</Button>
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link>.</CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
