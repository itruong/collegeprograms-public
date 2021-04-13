import React from 'react';
import {
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
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
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
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

class Profile extends React.Component {
  state = {
    isEditing: false
  }

  handleSave = () => {
    this.setState({ isEditing: false });
    this.props.updateUser();
  }

  handleCancel = () => {
    this.setState({ isEditing: false });
    this.props.resetUser();
  }

  renderEditButtons = () => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <IconButton
            component="span"
            onClick={this.handleSave}
          >
            <DoneIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton
            component="span"
            onClick={this.handleCancel}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  renderNonEditButton = () => {
    return (
      <IconButton
        component="span"
        onClick={() => this.setState({ isEditing: true })}
      >
        <EditIcon />
      </IconButton>
    );
  }

  renderPersonalInformation = () => {
    const { user } = this.props;
    const { isEditing } = this.state;
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
            disabled={!isEditing}
            error={!user.firstName}
            label={isEditing ? 'Required' : null}
            variant='outlined'
            size='small'
            value={user.firstName}
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
            disabled={!isEditing}
            error={!user.lastName}
            label={isEditing ? 'Required' : null}
            size='small'
            value={user.lastName}
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
            disabled={!isEditing}
            select
            size='small'
            value={user.gender || 'N'}
            onChange={(event) => this.props.onChange({ gender: event.target.value !== 'N' ? event.target.value : ''})}
            variant="outlined"
          >
            {
              helpers.getOptions(constants.genders).map((option) => (
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
              disabled={!isEditing}
              autoOk={true}
              variant='inline'
              inputVariant='outlined'
              size='small'
              format='MM/DD/YYYY'
              value={user.birthday}
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
            disabled={!isEditing}
            select
            size='small'
            value={user.race || 'N'}
            onChange={(event) => this.props.onChange({ race: event.target.value !== 'N' ? event.target.value : ''})}
            variant="outlined"
          >
            {
              helpers.getOptions(constants.races).map((option) => (
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
    const { user } = this.props;
    const { isEditing } = this.state;
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
            disabled={!isEditing}
            variant='outlined'
            size='small'
            value={user.schoolName}
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
              if (user.classYear) {
                let classYear = Math.max(Math.min(user.classYear, currentYear), currentYear - 100);
                classYear = Math.floor(classYear);
                this.props.onChange({ classYear });
              }
            }}
          >
            <TextField
              disabled={!isEditing}
              inputProps={{ min: (currentYear - 100), max: currentYear }}
              type="number"
              size='small'
              variant='outlined'
              value={user.classYear}
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
              if (user.GPA) {
                let GPA = Math.max(Math.min(user.GPA, 4), 0);
                GPA = GPA.toFixed(1);
                this.props.onChange({ GPA });
              }
            }}
          >
            <TextField
              disabled={!isEditing}
              inputProps={{ min: 0, max: 4, step: 0.1}}
              type="number"
              size='small'
              variant='outlined'
              value={user.GPA}
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
              data={user.majors}
              options={constants.degreePrograms}
              onChange={(value) => this.props.onChange({ majors: value })}
              disabled={!isEditing}
            />
          </Grid>
          {isEditing && 
            <Grid item>
              <AutocompleteSelector
                onChange={option => this.props.onChange({ majors: [...user.majors, option.value] })}
                options={helpers.getOptions(constants.degreePrograms)}
                getOptionLabel={option => option.label}
              />
            </Grid>
          }
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
           Minors:
          </Typography>
        </Grid>
        <Grid item xs={9} container spacing={1} alignItems='center'>
          <Grid item>
            <ChipsArray
              data={user.minors}
              options={constants.degreePrograms}
              onChange={(value) => this.props.onChange({ minors: value })}
              disabled={!isEditing}
            />
          </Grid>
          {isEditing && 
            <Grid item>
              <AutocompleteSelector
                onChange={option => this.props.onChange({ minors: [...user.minors, option.value] })}
                options={helpers.getOptions(constants.degreePrograms)}
                getOptionLabel={option => option.label}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    );
  }

  renderIndustryInformation = () => {
    const { user } = this.props;
    const { isEditing } = this.state;
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
              data={user.eligibility}
              options={constants.eligibility}
              onChange={(value) => this.props.onChange({ eligibility: value })}
              disabled={!isEditing}
            />
          </Grid>
          {isEditing && 
            <Grid item>
              <AutocompleteSelector
                onChange={option => this.props.onChange({ eligibility: [...user.eligibility, option.value] })}
                options={helpers.getOptions(constants.eligibility)}
                getOptionLabel={option => option.label}
              />
            </Grid>
          }
        </Grid>
        <Grid item xs={3}>
          <Typography align='right' variant='body1'>
            Industry Preferences:
          </Typography>
        </Grid>
        <Grid item xs={9} container spacing={1} alignItems='center'>
          <Grid item>
            <ChipsArray
              data={user.industryPreferences}
              options={constants.industryPreferences}
              onChange={(value) => this.props.onChange({ industryPreferences: value })}
              disabled={!isEditing}
            />
          </Grid>
          {isEditing && 
            <Grid item>
              <AutocompleteSelector
                onChange={option => this.props.onChange({ industryPreferences: [...user.industryPreferences, option.value] })}
                options={helpers.getOptions(constants.industryPreferences)}
                getOptionLabel={option => option.label}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    );
  }

  render () {
    const { classes } = this.props;
    return this.props.isLoading ? null : (
      <Box mt={2} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} container justify='space-between'>
                  <Grid item>
                    <Typography variant='h5' gutterBottom>
                      My Profile
                    </Typography>
                  </Grid>
                  <Grid item>
                    {this.state.isEditing ? this.renderEditButtons() : this.renderNonEditButton()}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

Profile = withStyles(ProfileStyles)(Profile);

export default Profile;
