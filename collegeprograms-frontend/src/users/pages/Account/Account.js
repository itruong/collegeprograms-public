import React from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import {
  withStyles
} from '@material-ui/core/styles';
import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';


const AccountStyles = theme => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'none',
    border: '1px solid #d3d3d38a'
  },
})

class Account extends React.Component {
  state = {
    isEmailModalOpen: false,
    isPasswordModalOpen: false
  };

  render () {
    const { classes } = this.props;
    return this.props.isLoading ? null : (
      <>
      <Box mt={2} mb={2}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} container justify='space-between'>
              <Grid item>
                <Typography variant='h5'>
                  My Account
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems='center' spacing={1}>
              <Grid item xs={6} container justify='flex-end'>
                <Grid item>
                  <Button onClick={() => this.setState({ isEmailModalOpen: true })}>
                    Change Email
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='body1'>
                  {this.props.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems='center' spacing={1}>
              <Grid item xs={6} container justify='flex-end'>
                <Grid item>
                  <Button onClick={() => this.setState({ isPasswordModalOpen: true })}>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <ChangeEmailModal
        open={this.state.isEmailModalOpen}
        onSave={this.props.refreshData}
        onClose={() => this.setState({ isEmailModalOpen: false })}
      />
      <ChangePasswordModal
        open={this.state.isPasswordModalOpen}
        onClose={() => this.setState({ isPasswordModalOpen: false })}
      />
      </>
    );
  }
}

Account = withStyles(AccountStyles)(Account);

export default Account;
