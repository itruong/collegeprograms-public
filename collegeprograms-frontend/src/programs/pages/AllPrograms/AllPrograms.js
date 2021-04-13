import React from 'react';
import moment from 'moment';
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import {
  Pagination
} from '@material-ui/lab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import helpers from 'programs/helpers';


const searchStyles = (theme) => ({
  pagination: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  resultsHeader: {
    color: 'gray'
  }
});

class AllPrograms extends React.Component {
  getResultSummaryText = () => {
    const countSummaryText = `Found ${
      this.props.totalCount
    } ${
      this.props.totalCount === 1 ? 'result' : 'results'
    }`;
    let searchSummaryText = ''
    if (this.props.searchText) {
      searchSummaryText = `for "${this.props.searchText}"`;
    }
    const suffixText = 'in all programs';
    return [
      countSummaryText,
      searchSummaryText,
      suffixText
    ].join(' ');
  }

  renderResults () {
    const results = this.props.programs.map(program => {
      return (
        <Grid key={program.id} item xs={12}>
          <SearchResult
            program={program}
            saveProgram={this.props.saveProgram}
            deleteProgram={this.props.deleteProgram}
          />
        </Grid>
      );
    });
    return (
      <Grid container spacing={1}>
        {results}
      </Grid>
    );
  }

  render () {
    const { classes } = this.props;
    return this.props.isLoading ? null : (
      <Grid
        container
      >
        <Grid item xs={12}>
          <Box pt={1}>
            <Grid container>
              <Grid item xs>
                <Typography
                  align='left'
                  className={classes.resultsHeader}
                  variant='body2'
                >
                  {this.getResultSummaryText()} 
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pt={2}>
            <Grid
              container
              spacing={2}
            >
              {
                this.props.totalPages ? (
                  <>
                    <Grid item xs={12} container>
                      {this.renderResults()}
                    </Grid>
                    <Grid item xs={12} container justify='center'>
                      <Grid item>
                        <Pagination
                          className={classes.pagination}
                          count={this.props.totalPages}
                          page={this.props.page}
                          onChange={this.props.handlePageChange}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <EmptyPrograms/>
                  </Grid>
                )
              }
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

AllPrograms.propTypes = {
  classes: PropTypes.object.isRequired,
};

AllPrograms = withStyles(searchStyles)(AllPrograms);

const useEmptyProgramsStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    boxShadow: 'none',
    border: '1px solid #d3d3d38a'
  },
}));

function EmptyPrograms () {
  const classes = useEmptyProgramsStyle();
  return (
    <Box m={2} fontStyle='italic'>
      <Paper className={classes.paper}>
        <Typography variant='body1'>
          You have no saved opportunities.
        </Typography>
      </Paper>
    </Box>
  );
}


const searchResultStyles = theme => ({
  button: {
    borderColor: 'black',//'#0068b3',
    color: 'black',//'#0068b3'
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'none',
    border: '1px solid #d3d3d38a',
    '&:hover': {
      boxShadow: '0px 0px 5px lightgrey',
      cursor: 'pointer'
    }
  },
  buttonText: {
    transition: "opacity 0.2s",
    // "&:hover": {
    //   opacity: "0.5",
    // },
    fontWeight: "500",
    textTransform: "none",
  },
});

class SearchResult extends React.Component {
  state = {
    isLoadingSaveButton: false,
    shouldRedirect: false
  };

  handleSave = () => {
    this.setState(
      { isLoadingSaveButton: true },
      () => {
        this.props.saveProgram(this.props.program.id)
        .then(() => this.setState({ isLoadingSaveButton: false }));
      }
    )
  };

  handleDelete = () => {
    this.setState(
      { isLoadingSaveButton: true },
      () => {
        this.props.deleteProgram(this.props.program.id)
        .then(() => this.setState({ isLoadingSaveButton: false }));
      }
    )
  };

  renderSaveButton = () => {
    const { classes } = this.props;
    return (
      <Button
        disableElevation
        variant="outlined"
        size="medium"
        className={classes.button}
        onClick={event => {
          event.stopPropagation();
          this.props.program.isSaved ? this.handleDelete() : this.handleSave()
        }}
        disabled={this.state.isLoadingSaveButton}
      >
        <Typography variant='body1' className={classes.buttonText}>
          {this.props.program.isSaved ? 'Remove' : 'Save'}
        </Typography>
      </Button>
    );
  };

  render () {
    const { classes } = this.props;
    return this.state.shouldRedirect ? <Redirect push to={`/program/${this.props.program.id}`}/> : (
      <Paper 
        onClick={() => this.setState({ shouldRedirect: true })}
        className={classes.paper}
      >
        <Grid item xs={12} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant='subtitle1' gutterBottom>
                {this.props.program.name}
              </Typography>
              <Typography variant='body2'>
                {this.props.program.organization}
              </Typography>
              <Typography variant='body2'>
                {this.props.program.city}, {this.props.program.state}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant='body2'>
                {`Class Year: ${this.props.program.classYear}`}
              </Typography>
              <Typography variant='body2'>
                {`Eligibility: ${this.props.program.eligibility}`}
              </Typography>
              <Typography variant='body2'>
                Not Eligible:
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm container direction="column" spacing={1} alignItems='flex-end'>
            <Grid item xs>
              {
                this.props.program.deadlineDate ? (
                  <Typography variant='body2'>
                    {`Apply by ${moment.utc(this.props.program.deadlineDate).format('MMMM DD, YYYY')}`}
                  </Typography>
                ) : null
              }
            </Grid>
            <Grid item>
              {this.renderSaveButton()}
            </Grid>
            <Grid item>
              <Typography variant="body2" color='textSecondary'>
                {helpers.getTextPastDate(moment(this.props.program.postedDate))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

SearchResult = withStyles(searchResultStyles)(SearchResult);

export default AllPrograms;
