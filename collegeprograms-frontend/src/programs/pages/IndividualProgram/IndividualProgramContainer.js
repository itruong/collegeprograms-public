import React from 'react';
import config from 'config/config';
import Page from 'app/components/Page/Page';
import IndividualProgram from './IndividualProgram'
import NotFoundPage from 'app/pages/NotFoundPage/NotFoundPage';


export default class IndividualProgramContainer extends React.Component {
  state = {
    isLoading: true,
    program: null
  };

  componentDidMount () {
    this.getProgram();
  };

  deleteProgram = async (programId) => {
    const data = { programId };
    const res = await fetch(
      `${config.SERVER_BASE_URL}/programs/savedPrograms`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    const result = await res.json();
    if (res.status !== 200) {
      console.log(result.error)
    }
    this.setState({
      program: {
        ...this.state.program,
        isSaved: false
      }
    });
  }

  saveProgram = async (programId) => {
    const data = { programId };
    const res = await fetch(
      `${config.SERVER_BASE_URL}/programs/savedPrograms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    const result = await res.json();
    if (res.status !== 200) {
      console.log(result.error);
    }
    this.setState({
      program: {
        ...this.state.program,
        isSaved: true
      }
    });
  }

  getProgram = async () => {
    this.setState(
      { isLoading: true }
    );
    const res = await fetch(`${config.SERVER_BASE_URL}/programs/single-program?id=${this.props.programId}`);
    const result = await res.json();
    console.log(result)
    this.setState({
      isLoading: false,
      program: result.data
    });
  }

  renderLoading = () => {
    return null;
  }

  render () {
    const {
      isLoading,
      program
    } = this.state;

    return isLoading ? this.renderLoading() : (
      program ? (
        <Page title={`${program.name} | ${program.organization}`}>
          <IndividualProgram
            program={program}
            saveProgram={this.saveProgram}
            deleteProgram={this.deleteProgram}
          />
        </Page>
      ) : <NotFoundPage/>
    );
  };
}
