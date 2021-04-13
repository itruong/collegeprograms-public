/*global authUi, firebaseui, firebase*/

import React from 'react';
import { 
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import SigninPrompt from 'users/components/SigninPrompt/SigninPrompt';

class Signin extends React.Component{

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h1"
          >
            College Programs
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h2"
          >
            Sign-in:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SigninPrompt/>
        </Grid>
      </Grid>
    )
  }
};

export default Signin;