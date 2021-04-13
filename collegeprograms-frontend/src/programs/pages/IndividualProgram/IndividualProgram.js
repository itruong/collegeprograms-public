import React from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import helpers from 'programs/helpers';


const IndividualProgramStyles = theme => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'none',
    border: '1px solid #d3d3d38a'
  },
})

class IndividualProgram extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ProgramHeader
                    program={this.props.program}
                    saveProgram={this.props.saveProgram}
                    deleteProgram={this.props.deleteProgram}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider/>
                </Grid>
                <Grid item xs={12}>
                  <ProgramRequirements
                    program={this.props.program}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider/>
                </Grid>
                <Grid item xs={12}>
                  <ProgramDescription
                    program={this.props.program}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider/>
                </Grid>
                <Grid item xs={12}>
                  <ProgramApplication
                    program={this.props.program}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider/>
                </Grid>
                <Grid item xs={12}>
                  <ProgramExternalInfo
                    program={this.props.program}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>
              {this.props.program.id}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };
}

IndividualProgram = withStyles(IndividualProgramStyles)(IndividualProgram);

const headerCardStyles = theme => ({
  button: {
    borderColor: 'black',
    color: 'black',
  },
  buttonText: {
    transition: "opacity 0.2s",
    fontWeight: "500",
    textTransform: "none",
  },
});

class ProgramHeader extends React.Component {
  state = {
    isLoadingSaveButton: false
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
        onClick={this.props.program.isSaved ? this.handleDelete : this.handleSave}
        disabled={this.state.isLoadingSaveButton}
      >
        <Typography variant='body1' className={classes.buttonText}>
          {this.props.program.isSaved ? 'Remove' : 'Save'}
        </Typography>
      </Button>
    );
  };

  render () {
    return (
      <Grid container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant='h6' gutterBottom>
              {this.props.program.name}
            </Typography>
            <Typography variant='subtitle1'>
              {this.props.program.organization}
            </Typography>
            <Typography variant='subtitle1'>
              {this.props.program.city}, {this.props.program.state}
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
              Posted {helpers.getTextPastDate(moment(this.props.program.postedDate))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };
};

ProgramHeader = withStyles(headerCardStyles)(ProgramHeader);

class ProgramRequirements extends React.Component {
  render () {
    const { program } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>
              Requirements
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Class Year: {program.classYear}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Eligibility: {program.eligibility}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Not Eligible: {program.ineligibility}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Minimum GPA: {program.GPA}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
};

class ProgramDescription extends React.Component {
  render () {
    return (
      <Grid container>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>
              Description
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2'>
              {this.props.program.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };
};

class ProgramApplication extends React.Component {
  render () {
    const { program } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>
              Application
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Fee: {program.fee}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Process: {program.process}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Deadline: {program.deadlineDate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                Decision: {program.decisionDate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

class ProgramExternalInfo extends React.Component {
  render () {
    const { program } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>
              More Information
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Typography variant='body2'>
                {program.url}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default IndividualProgram;
