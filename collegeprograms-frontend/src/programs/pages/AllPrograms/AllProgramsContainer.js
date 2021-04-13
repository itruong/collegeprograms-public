import React from 'react';
import { connect } from 'react-redux';
import AllPrograms from './AllPrograms';
import {
  getPrograms,
  saveProgram,
  setProgramsPage,
  unsaveProgram
} from 'programs/actions';


class AllProgramsContainer extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount = async () => {
    await this.props.getPrograms();
    this.setState({ isLoading: false });
  }

  deleteProgram = async (programId) => {
    const response = await this.props.deleteProgram(programId);
    if (response.status !== 200) {
      this.props.getPrograms();
    }
  }

  handlePageChange = async (event, value) => {
    this.props.setProgramsPage(value);
  }

  saveProgram = async (programId) => {
    const response = await this.props.saveProgram(programId);
    if (response.status !== 200) {
      this.props.getPrograms();
    }
  }

  render () {
    return (
      <AllPrograms
        deleteProgram={this.deleteProgram}
        handlePageChange={this.handlePageChange}
        isLoading={this.state.isLoading}
        page={this.props.page}
        programs={this.props.programs}
        saveProgram={this.saveProgram}
        searchText={this.props.filters.searchText}
        totalCount={this.props.totalCount}
        totalPages={this.props.totalPages}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.programs.filters,
    isLoadingPrograms: state.programs.isFetching,
    programs: state.programs.data,
    page: state.programs.page,
    totalCount: state.programs.totalCount,
    totalPages: state.programs.totalPages
  };
};

const mapDispatchToProps = {
  deleteProgram: unsaveProgram,
  getPrograms,
  saveProgram,
  setProgramsPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProgramsContainer);
