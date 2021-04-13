/* global firebase */
import React from 'react';
import Page from 'app/components/Page/Page';
import Account from './Account';


export default class AccountContainer extends React.Component {
  state = {
    email: null,
    isLoading: true
  }

  componentDidMount = () => {
    this.getInitialData();
  }

  getInitialData = () => {
    const authUser = firebase.auth().currentUser;
    this.setState({
      email: authUser.email,
      isLoading: false
    });
  }

  render () {
    return (
      <Page title='Account'>
        <Account
          email={this.state.email}
          isLoading={this.state.isLoading}
          refreshData={this.getInitialData}
        />
      </Page>
    );
  }
}
