import React from 'react';
import { connect } from 'react-redux';
import Page from 'app/components/Page/Page';
import Profile from './Profile';
import {
  updateUser
} from 'users/actions';


class ProfileContainer extends React.Component {
  state = {
    isLoading: true,
    user: {}
  }

  componentDidMount () {
    this.setInitialUserState();
    this.setState({ isLoading: false });
  }

  setInitialUserState = () => {
    this.setState({
      user: {
        firstName: '',
        lastName: '',
        email: '',
        userType: 'student',
        gender: '',
        birthday: null,
        race: '',
        eligibility: [],
        schoolId: '',
        classYear: '',
        majors: [],
        minors: [],
        GPA: '',
        industryPreferences: [],
        ...this.props.user,
      }
    });
  }

  onChange = (data) => {
    this.setState({
      user: {
        ...this.state.user,
        ...data
      }
    });
  };

  updateUser = async () => {
    await this.props.updateUser(this.state.user);
    this.setInitialUserState();
  };

  render () {
    return (
      <Page title='Profile'>
        <Profile
          isLoading={this.state.isLoading}
          resetUser={this.setInitialUserState}
          onChange={this.onChange}
          updateUser={this.updateUser}
          user={this.state.user}
        />
      </Page>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user.profile
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
