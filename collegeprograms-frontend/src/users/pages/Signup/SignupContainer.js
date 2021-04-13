import React from 'react';
import { connect } from 'react-redux';
import Page from 'app/components/Page/Page';
import Signup from './Signup';
import config from 'config/config';
import {
  createUser
} from 'users/actions';


class SignupContainer extends React.Component{
  state = {
    firstName: '',
    lastName: '',
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
    industryPreferences: []
  };

  createUser = async () => {
    this.props.createUser(this.state);
  }

  render () {
    return (
      <Page title='Sign up'>
        <Signup
          onChange={(field) => this.setState(field)}
          onSave={this.createUser}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          gender={this.state.gender}
          birthday={this.state.birthday}
          race={this.state.race}
          eligibility={this.state.eligibility}
          schoolId={this.state.schoolId}
          classYear={this.state.classYear}
          majors={this.state.majors}
          minors={this.state.minors}
          GPA={this.state.GPA}
          industryPreferences={this.state.industryPreferences}
        />
      </Page>
    );
  }
}

const mapDispatchToProps = {
  createUser
};

export default connect(
  null,
  mapDispatchToProps
)(SignupContainer);
