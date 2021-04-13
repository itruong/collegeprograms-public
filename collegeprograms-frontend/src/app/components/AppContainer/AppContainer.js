/* global firebase */

import React from 'react';
import {
  Box,
  Container
} from '@material-ui/core';
import HeaderBar from 'app/components/HeaderBar/HeaderBar';


class AppContainer extends React.Component {
  state = {
    width: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
    });
  }

  handleLogout = () => {
    firebase.auth().signOut();
  }

  render () {
    return (
      <>
        <HeaderBar
          windowWidth={this.state.width}
          handleLogout={this.handleLogout}
        />
        <Box>
          <Container>
            {this.props.children}
          </Container>
        </Box>
      </>
    );
  }
};

export default AppContainer;