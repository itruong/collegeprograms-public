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

class ChangePasswordModal extends React.Component {
  state = {
    hasPasswordError: false,
    hasNewPasswordError: false,
    isLoading: true,
    currentPassword: '',
    newPassword: '',
  };

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSave();
    }
  }

  onSave = async () => {
    console.log(this.state.email)
    const authUser = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      authUser.email, 
      this.state.currentPassword
    );
    try {
      await authUser.reauthenticateWithCredential(credential);
    } catch (error) {
      console.log(error);
      this.setState({ hasPasswordError: true });
      return
    }
    try {
      await authUser.updatePassword(this.state.newPassword)
    } catch (error) {
      console.log(error);
      this.setState({ hasNewPasswordError: true });
      return
    }
    this.props.onClose();
  };

  onPasswordChange = (event, field, errorField) => {
    const password = event.target.value;
    const hasPasswordError = password ? false : true;
    this.setState({
      [field]: password,
      [errorField]: hasPasswordError
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
                      Change Account Password
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} container alignItems='center' spacing={1}>
                  <Grid item xs={6}>
                    <Typography align='right' variant='body1'>
                      Current Password:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={this.state.hasPasswordError}
                      onChange={(event) => this.onPasswordChange(event, 'currentPassword', 'hasPasswordError')}
                      onKeyDown={this.onKeyDown}
                      type='password'
                      variant='outlined'
                      size='small'
                      value={this.state.currentPassword}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} container alignItems='center' spacing={1}>
                  <Grid item xs={6}>
                    <Typography align='right' variant='body1'>
                      New Password:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={this.state.hasNewPasswordError}
                      onChange={(event) => this.onPasswordChange(event, 'newPassword', 'hasNewPasswordError')}
                      onKeyDown={this.onKeyDown}
                      type='password'
                      variant='outlined'
                      size='small'
                      value={this.state.newPassword}
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

ChangePasswordModal = withStyles(changeModalStyles)(ChangePasswordModal);

export default ChangePasswordModal;
