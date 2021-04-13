import React from 'react';
import { connect } from 'react-redux';
import SavedPrograms from './SavedPrograms';
import {
  getSavedPrograms,
  setSavedProgramsPage,
  unsaveProgram
} from 'programs/actions';


class SavedProgramsContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount = async () => {
    await this.props.getSavedPrograms();
    this.setState({ isLoading: false });
  }

  handlePageChange = async (event, value) => {
    this.props.setSavedProgramsPage(value);
  }

  deleteProgram = async (programId) => {
    const res = await this.props.deleteProgram(programId);
    this.props.getSavedPrograms();
  }

  render () {
    return (
      <SavedPrograms
        deleteProgram={this.deleteProgram}
        handlePageChange={this.handlePageChange}
        isLoading={this.state.isLoading}
        page={this.props.page}
        programs={this.props.programs}
        searchText={this.props.filters.searchText}
        totalCount={this.props.totalCount}
        totalPages={this.props.totalPages}
      />
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    filters: state.savedPrograms.filters,
    isLoadingPrograms: state.savedPrograms.isFetching,
    programs: state.savedPrograms.data,
    page: state.savedPrograms.page,
    totalCount: state.savedPrograms.totalCount,
    totalPages: state.savedPrograms.totalPages
  };
};

const mapDispatchToProps = {
  deleteProgram: unsaveProgram,
  getSavedPrograms,
  setSavedProgramsPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedProgramsContainer);
