import React from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Divider
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import constants from 'appConstants/constants';
import AutocompleteSelector from 'components/AutocompleteSelector/AutocompleteSelector';
import ChipsArray from 'components/ChipsArray/ChipsArray';
import helpers from 'helpers';


const ProfileStyles = theme => ({
  paper: {
    padding: theme.spacing(4),
    boxShadow: 'none',
    border: '1px solid #d3d3d38a'
  },
})

class Signup extends React.Component {
  renderPersonalInformation = () => {
    const {
      birthday,
      firstName,
      lastName,
      gender,
      race
    } = this.props;
    return (
      <Grid container alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Personal Information
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            First Name:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            error={!firstName}
            label={'Required'}
            variant='outlined'
            size='small'
            value={firstName}
            onChange={(event) => this.props.onChange({ firstName: event.target.value })}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            Last Name:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            error={!lastName}
            label={'Required'}
            size='small'
            value={lastName}
            variant='outlined'
            onChange={(event) => this.props.onChange({ lastName: event.target.value })}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            Gender:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            select
            size='small'
            value={gender || 'N'}
            onChange={(event) => this.props.onChange({ gender: event.target.value !== 'N' ? event.target.value : ''})}
            variant="outlined"
          >
            {
              [
                {
                  value: 'N',
                  label: 'Not Specified'
                },
                {
                  value: 'M',
                  label: 'Male'
                },
                {
                  value: 'F',
                  label: 'Female'
                },
                {
                  value: 'O',
                  label: 'Other'
                }
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            Birthday:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              autoOk={true}
              variant='inline'
              inputVariant='outlined'
              size='small'
              format='MM/DD/YYYY'
              value={birthday}
              onChange={(date) => this.props.onChange({ birthday: date ? date.format('MM/DD/YYYY') : date })}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            Race/Ethnicity
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            select
            size='small'
            value={race || 'N'}
            onChange={(event) => this.props.onChange({ race: event.target.value !== 'N' ? event.target.value : ''})}
            variant="outlined"
          >
            {
              [
                {
                  value: 'N',
                  label: 'Not Specified'
                },
                {
                  value: 'asian',
                  label: 'Asian'
                },
                {
                  value: 'O',
                  label: 'Other'
                }
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
          </TextField>
        </Grid>
      </Grid>
    );
  }

  renderSchoolInformation = () => {
    const {
      classYear,
      GPA,
      majors,
      minors,
      schoolName
    } = this.props;
    const currentYear = moment().year() + 22;
    return (
      <Grid container alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            School Information
          </Typography>
        </Grid>
        {/* <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            School Name:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            variant='outlined'
            size='small'
            value={schoolName}
            onChange={(event) => this.props.onChange({ schoolName: event.target.value })}
          />
        </Grid> */}
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            Class Year:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <ClickAwayListener
            onClickAway={() => {
              if (classYear) {
                let newClassYear = Math.max(Math.min(classYear, currentYear), currentYear - 100);
                newClassYear = Math.floor(newClassYear);
                this.props.onChange({ classYear: newClassYear });
              }
            }}
          >
            <TextField
              inputProps={{ min: (currentYear - 100), max: currentYear }}
              type="number"
              size='small'
              variant='outlined'
              value={classYear}
              onChange={(event) => this.props.onChange({ classYear: event.target.value })}
            />
          </ClickAwayListener>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            GPA:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <ClickAwayListener
            onClickAway={() => {
              if (GPA) {
                let newGPA = Math.max(Math.min(GPA, 4), 0);
                newGPA = newGPA.toFixed(1);
                this.props.onChange({ GPA: newGPA });
              }
            }}
          >
            <TextField
              inputProps={{ min: 0, max: 4, step: 0.1}}
              type="number"
              size='small'
              variant='outlined'
              value={GPA}
              onChange={(event) => this.props.onChange({ GPA: event.target.value })}
            />
          </ClickAwayListener>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
           Majors:
          </Typography>
        </Grid>
        <Grid item xs={9} container spacing={1} alignItems='center'>
          <Grid item>
            <ChipsArray
              data={majors}
              options={constants.degreePrograms}
              onChange={(value) => this.props.onChange({ majors: value })}
            />
          </Grid>
          <Grid item>
            <AutocompleteSelector
              onChange={option => this.props.onChange({ majors: [...majors, option.value] })}
              options={helpers.getOptions(constants.degreePrograms)}
              getOptionLabel={option => option.label}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
           Minors:
          </Typography>
        </Grid>
        <Grid item xs={9} container spacing={1} alignItems='center'>
          <Grid item>
            <ChipsArray
              data={minors}
              options={constants.degreePrograms}
              onChange={(value) => this.props.onChange({ minors: value })}
            />
          </Grid>
          <Grid item>
            <AutocompleteSelector
              onChange={option => this.props.onChange({ majors: [...minors, option.value] })}
              options={helpers.getOptions(constants.degreePrograms)}
              getOptionLabel={option => option.label}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderIndustryInformation = () => {
    const {
      eligibility,
      industryPreferences
    } = this.props;
    return (
      <Grid container alignItems='center' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Preferences
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
           Eligibility:
          </Typography>
        </Grid>
        <Grid item xs={9} container spacing={1} alignItems='center'>
          <Grid item>
            <ChipsArray
              data={eligibility}
              options={constants.eligibility}
              onChange={(value) => this.props.onChange({ eligibility: value })}
            />
          </Grid>
          <Grid item>
            <AutocompleteSelector
              onChange={option => this.props.onChange({ eligibility: [...eligibility, option.value] })}
              options={helpers.getOptions(constants.eligibility)}
              getOptionLabel={option => option.label}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            Industry Preferences:
          </Typography>
        </Grid>
        <Grid item xs={9} container spacing={1} alignItems='center'>
          <Grid item>
            <ChipsArray
              data={industryPreferences}
              options={constants.industryPreferences}
              onChange={(value) => this.props.onChange({ industryPreferences: value })}
            />
          </Grid>
          <Grid item>
            <AutocompleteSelector
              onChange={option => this.props.onChange({ industryPreferences: [...industryPreferences, option.value] })}
              options={helpers.getOptions(constants.industryPreferences)}
              getOptionLabel={option => option.label}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render () {
    const { classes } = this.props;
    return (
      <Box mt={2} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} container justify='space-between'>
                  <Grid item>
                    <Typography variant='h5' gutterBottom>
                      Create My Profile
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {this.renderPersonalInformation()}
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
                <Grid item xs={12}>
                  {this.renderSchoolInformation()}
                </Grid>
                <Grid item xs={12}><Divider/></Grid>
                <Grid item xs={12}>
                  {this.renderIndustryInformation()}
                </Grid>
                <Grid item xs={12} container justify='flex-end'>
                  <Grid item>
                    <Button onClick={this.props.onSave}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

Signup = withStyles(ProfileStyles)(Signup);
export default Signup;