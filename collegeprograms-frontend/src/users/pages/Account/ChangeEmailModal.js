/* global firebase */
import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import {
  withStyles
} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';


const changeModalStyles = theme => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'none',
    border: '1px solid #d3d3d38a',
    '&:focus': {
      outline: 'none',
    },
    width: 700,
    margin: 'auto',
    top: '50%'
  }
})

class ChangeEmailModal extends React.Component {
  state = {
    email: '',
    hasEmailError: false,
    hasPasswordError: false,
    isLoading: true,
    password: ''
  };

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSave();
    }
  }

  componentDidMount () {
    this.getInitialData();
  }

  getInitialData = () => {
    const authUser = firebase.auth().currentUser;
    this.setState({
      email: authUser.email,
      isLoading: false
    });
  }

  onSave = async () => {
    console.log(this.state.email)
    const authUser = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      authUser.email, 
      this.state.password
    );
    try {
      await authUser.reauthenticateWithCredential(credential);
    } catch (error) {
      console.log(error);
      this.setState({ hasPasswordError: true });
      return
    }
    try {
      await authUser.updateEmail(this.state.email)
    } catch (error) {
      console.log(error);
      this.setState({ hasEmailError: true });
      return
    }
    this.props.onSave();
    this.props.onClose();
  };

  onEmailChange = (event) => {
    const email = event.target.value;
    const hasEmailError = email ? false : true;
    this.setState({
      hasEmailError,
      email
    });
  }

  onPasswordChange = (event) => {
    const password = event.target.value;
    const hasPasswordError = password ? false : true;
    this.setState({
      hasPasswordError,
      password
    });
  }

  renderEditButtons = () => {
    return (
      <Grid container justify='center'>
        <Grid item>
          <Button
            onClick={this.onSave}
          >
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={this.props.onClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderNonEditButton = () => {
    return (
      <IconButton
        component="span"
        onClick={() => this.setState({ isEditing: true })}
      >
        <EditIcon />
      </IconButton>
    );
  }

  render () {
    const { classes } = this.props;
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        {
          this.props.isLoading ? null : (
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} container justify='space-between'>
                  <Grid item>
                    <Typography variant='h5'>
                      Change Account Email
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} container alignItems='center' spacing={1}>
                  <Grid item xs={6}>
                    <Typography align='right' variant='body1'>
                      Email:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={this.state.hasEmailError}
                      onChange={this.onEmailChange}
                      onKeyDown={this.onKeyDown}
                      variant='outlined'
                      size='small'
                      value={this.state.email}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} container alignItems='center' spacing={1}>
                  <Grid item xs={6}>
                    <Typography align='right' variant='body1'>
                      Password:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={this.state.hasPasswordError}
                      onChange={this.onPasswordChange}
                      onKeyDown={this.onKeyDown}
                      type='password'
                      variant='outlined'
                      size='small'
                      value={this.state.password}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {this.renderEditButtons()}
                </Grid>
              </Grid>
            </Paper>
          )
        }
      </Modal>
    );
  }
}

ChangeEmailModal = withStyles(changeModalStyles)(ChangeEmailModal);

export default ChangeEmailModal;
