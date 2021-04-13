import React from 'react';
import {
  Button,
  ClickAwayListener,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import config from 'config/config';
import { states } from 'programs/constants';


class ProgramForm extends React.Component {
  state = {
    name: '',
    organization: '',
    city: '',
    state: '',
    classYears: '',
    eligibility: [],
    ineligibility: [],
    GPA: '',
    type: '',
    startDate: null,
    endDate: null,
    cost: '',
    travelCoverage: '',
    description: '',
    applicationFee: '',
    applicationProcess: [],
    deadlineDate: null,
    decisionDate: null,
    url: ''
  };

  currentYear = moment().year() + 22;

  createProgram = async () => {
    const data = {};
    for (const [key, value] of Object.entries(this.state)) {
      if (value) {
        data[key] = value;
      }
    }
    const res = await fetch(
      `${config.SERVER_BASE_URL}/programs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    if (res.status === 200) {
      console.log(result)
    } else {
      console.log(result.errors)
      alert(result.errors.map(error => {
        return `field: ${error.param}, ${error.msg}`;
      }));
    }
  }

  render () {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h2'>
              Add Program
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Program Name:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                value={this.state.name}
                onChange={(event) => this.setState({ name: event.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Organization Name:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                value={this.state.organization}
                onChange={(event) => this.setState({ organization: event.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                City:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                value={this.state.city}
                onChange={(event) => this.setState({ city: event.target.value })}
              />
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                State:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                select
                value={this.state.state}
                onChange={(event) => this.setState({ state: event.target.value })}
              >
                {states.map((state) => (
                  <MenuItem key={state.abbreviation} value={state.abbreviation}>
                    {state.abbreviation}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Class Year:
              </Typography>
            </Grid>
            <Grid item>
              {/* <ClickAwayListener
                onClickAway={() => {
                  if (this.state.classYear) {
                    let classYear = Math.max(Math.min(this.state.classYear, this.currentYear), this.currentYear - 100);
                    classYear = Math.floor(classYear);
                    this.setState({ classYear });
                  }
                }}
              >
                <TextField
                  inputProps={{ min: (this.currentYear - 100), max: this.currentYear }}
                  type="number"
                  value={this.state.classYear}
                  onChange={(event) => this.setState({ classYear: event.target.value })}
                />
              </ClickAwayListener> */}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Eligibility:
              </Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Ineligibility:
              </Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                GPA:
              </Typography>
            </Grid>
            <Grid item>
              <ClickAwayListener
                onClickAway={() => {
                  if (this.state.GPA) {
                    let GPA = Math.max(Math.min(this.state.GPA, 4), 0);
                    GPA = GPA.toFixed(1);
                    this.setState({ GPA });
                  }
                }}
              >
                <TextField
                  inputProps={{ min: 0, max: 4, step: 0.1}}
                  type="number"
                  value={this.state.GPA}
                  onChange={(event) => this.setState({ GPA: event.target.value })}
                />
              </ClickAwayListener>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Program Type:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                select
                value={this.state.type}
                onChange={(event) => this.setState({ type: event.target.value })}
              >
                {
                  [
                    {
                      value: 'program',
                      label: 'Program'
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
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Start Date:
              </Typography>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk={true}
                  variant='inline'
                  format='MM/DD/YYYY'
                  value={this.state.startDate ? moment(this.state.startDate, 'MM/DD/YYYY') : null}
                  onChange={(date) => this.setState({ startDate: date ? date.format('MM/DD/YYYY') : date })}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                End Date:
              </Typography>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk={true}
                  variant='inline'
                  format='MM/DD/YYYY'
                  value={this.state.endDate ? moment(this.state.endDate, 'MM/DD/YYYY') : null}
                  onChange={(date) => this.setState({ endDate: date ? date.format('MM/DD/YYYY') : date })}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Cost:
              </Typography>
            </Grid>
            <Grid item>
              <ClickAwayListener
                onClickAway={() => {
                  let cost = parseFloat(this.state.cost);
                  this.setState({ cost: isNaN(cost) ? '' : cost.toFixed(2) });
                }}
              >
                <TextField
                  type="number"
                  value={this.state.cost}
                  onChange={(event) => this.setState({ cost: event.target.value })}
                />
              </ClickAwayListener>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Travel Coverage:
              </Typography>
            </Grid>
              <TextField
                select
                value={this.state.travelCoverage}
                onChange={(event) => this.setState({ travelCoverage: event.target.value })}
              >
                {
                  [
                    {
                      value: 'no',
                      label: 'No'
                    },
                    {
                      value: 'partial',
                      label: 'Partial'
                    },
                    {
                      value: 'yes',
                      label: 'Yes'
                    }
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              </TextField>
            <Grid item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Description:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                multiline
                rows={4}
                variant='filled'
                value={this.state.description}
                onChange={(event) => this.setState({ description: event.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Application Fee:
              </Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Application Process:
              </Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Application Deadline:
              </Typography>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk={true}
                  variant='inline'
                  format='MM/DD/YYYY'
                  value={this.state.deadlineDate ? moment(this.state.deadlineDate, 'MM/DD/YYYY') : null}
                  onChange={(date) => this.setState({ deadlineDate: date ? date.format('MM/DD/YYYY') : date })}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                Application Decision Date:
              </Typography>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk={true}
                  variant='inline'
                  format='MM/DD/YYYY'
                  value={this.state.decisionDate ? moment(this.state.decisionDate, 'MM/DD/YYYY') : null}
                  onChange={(date) => this.setState({ decisionDate: date ? date.format('MM/DD/YYYY') : date })}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1'>
                External Link:
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                value={this.state.url}
                onChange={(event) => this.setState({ url: event.target.value })}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.createProgram}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </>
    )
  };
};

export default ProgramForm;
