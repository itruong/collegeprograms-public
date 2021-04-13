/*global firebase*/

import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  BrowserRouter,
  Switch
} from 'react-router-dom';
import {
  CircularProgress,
  CssBaseline
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SigninPage from 'users/pages/SigninPage/SigninPage';
import SignupContainer from 'users/pages/Signup/SignupContainer';
import ProfileContainer from 'users/pages/Profile/ProfileContainer';
import AccountContainer from 'users/pages/Account/AccountContainer';
import AppContainer from 'app/components/AppContainer/AppContainer';
import AllProgramsPage from 'programs/pages/AllPrograms/AllProgramsPage';
import CreateProgramPage from 'programs/pages/CreateProgramPage/CreateProgramPage';
import SavedProgramsPage from 'programs/pages/SavedProgramsPage/SavedProgramsPage';
import IndividualProgramContainer from 'programs/pages/IndividualProgram/IndividualProgramContainer';
import NotFoundPage from 'app/pages/NotFoundPage/NotFoundPage';
import {
  setAuthStatus
} from 'users/actions';


const loaderStyles = makeStyles(theme => ({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: "fixed",
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
}));

function Loader() {
  const classes = loaderStyles();
  return (
    <div className={classes.loaderContainer}>
      <CircularProgress/>
    </div>
    
  )
}

const appStyles = (theme) => ({
  appContainer: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

class Main extends React.Component {
  constructor (props) {
    super(props);
    firebase.auth().onAuthStateChanged(this.handleAuthStateChanged);
    this.state = {
      isLoading: true
    };
  }

  handleAuthStateChanged = async (user) => {
    this.setState({ isLoading: true });
    await this.props.setAuthStatus(user);
    this.setState({ isLoading: false });
  }

  render () {
    const { classes } = this.props;
    if (this.state.isLoading) return <Loader/>
    return (
      <>
        <CssBaseline/>
        <BrowserRouter>
          {
            !this.props.user.isSignedIn ? <SigninPage/> : (
              <AppContainer
                className={classes.appContainer}
              >
                {
                  !this.props.user.profile ? <SignupContainer setUser={this.setUser}/> : (
                    <Switch>
                      <Route exact path='/account' render={props => <AccountContainer/>}/>
                      <Route exact path='/add-program' render={props => <CreateProgramPage/>}/>
                      <Route exact path='/profile' render={props => <ProfileContainer/>}/>
                      <Route exact path='/saved-programs' render={props => <SavedProgramsPage/>}/>
                      <Route exact path='/' render={props => <AllProgramsPage/>}/>
                      <Route path='/program/:programId' render={props => <IndividualProgramContainer programId={props.match.params.programId}/>}/>
                      <Route component={NotFoundPage}/>
                    </Switch>
                  )
                }
              </AppContainer>
            )
          }
        </BrowserRouter>
      </>
    )
  }
}

Main = withStyles(appStyles)(Main);

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setAuthStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
