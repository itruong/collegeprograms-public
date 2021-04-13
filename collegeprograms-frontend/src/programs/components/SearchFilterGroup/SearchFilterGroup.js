import React from 'react';
import moment from 'moment';
import {
  Button,
  Divider,
  FormControlLabel,
  ClickAwayListener,
  Checkbox,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import constants from 'appConstants/constants';
import SearchFilter from 'programs/components/SearchFilter/SearchFilter';
import SearchFilterTrigger from 'programs/components/SearchFilterTrigger/SearchFilterTrigger';
import helpers from 'helpers';


export default class SearchFilterGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      excludeApplicationFilter: this.props.excludeApplicationFilter,
      ageFilter: this.props.ageFilter,
      classYearFilter: this.props.classYearFilter,
      distanceFilter: this.props.distanceFilter,
      diversityFilter: this.props.diversityFilter,
      endDateFilter: this.props.endDateFilter,
      GPAFilter: this.props.GPAFilter,
      genderFilter: this.props.genderFilter,
      postedDateFilter: this.props.postedDateFilter,
      raceFilter: this.props.raceFilter,
      startDateFilter: this.props.startDateFilter,
      sortByFilter: this.props.sortByFilter,
      typeFilter: this.props.typeFilter
    }
  }

  renderAgeFilter = () => {
    const displayValue = this.props.ageFilter || 'Any age';

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ ageFilter: this.state.ageFilter })}
        label='Age (yrs)'
        displayValue={displayValue}
        onOpen={() => this.setState({ ageFilter: this.props.ageFilter })}
      >
        <ClickAwayListener
          onClickAway={() => {
            if (this.state.ageFilter) {
              let age = Math.max(Math.min(this.state.ageFilter, 120), 1);
              age = Math.floor(age);
              this.setState({ ageFilter: age });
            }
          }}
        >
          <TextField
            inputProps={{ min: 1, max: 120, step: 1}}
            type="number"
            label='Age'
            size='small'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            value={this.state.ageFilter}
            onChange={(event) => this.setState({ ageFilter: event.target.value })}
          />
        </ClickAwayListener>
      </SearchFilter>
    );
  }

  renderExcludeApplicationFilter = () => {
    const { excludeApplicationFilter } = this.props;
    const options = [
      {
        value: 'in_person',
        label: 'Exclude in-person interview'
      },
      {
        value: 'transcript',
        label: 'Exclude transcript'
      },
      {
        value: 'virtual_interview',
        label: 'Exclude virtual interview'
      },
      {
        value: 'written_assessment',
        label: 'Exclude written assessment'
      }
    ];
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    let label = 'Any process';
    if (excludeApplicationFilter.length === 1) {
      label = optionsLabels[excludeApplicationFilter[0]];
    } else if (excludeApplicationFilter.length > 1) {
      label = `${optionsLabels[excludeApplicationFilter[0]]} (+${excludeApplicationFilter.length - 1})`;
    }

    const filterSet = new Set(this.state.excludeApplicationFilter);

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ excludeApplicationFilter: this.state.excludeApplicationFilter })}
        label='Application process'
        displayValue={label}
        onOpen={() => this.setState({ excludeApplicationFilter: this.props.excludeApplicationFilter })}
      >
        <Grid container spacing={1} justify='flex-start' direction='column'>
          {
            options.map((option, i) => {
              return (
                <Grid item key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size='small'
                        checked={this.state.excludeApplicationFilter.includes(option.value)}
                        onChange={event => {
                          event.target.checked ? filterSet.add(option.value) : filterSet.delete(option.value);
                          this.setState({ excludeApplicationFilter: Array.from(filterSet) });
                        }}
                      />
                    }
                    label={option.label}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </SearchFilter>
    );
  }

  renderClassYearFilter = () => {
    const currentYear = moment().year() + 22;
    const displayValue = this.props.classYearFilter || 'Any year';

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ classYearFilter: this.state.classYearFilter })}
        label='Class year'
        displayValue={displayValue}
        onOpen={() => this.setState({ classYearFilter: this.props.classYearFilter })}
      >
        <ClickAwayListener
          onClickAway={() => {
            if (this.state.classYearFilter) {
              let classYear = Math.max(Math.min(this.state.classYearFilter, currentYear), currentYear - 100);
              classYear = Math.floor(classYear);
              this.setState({ classYearFilter: classYear });
            }
          }}
        >
          <TextField
            inputProps={{ min: (currentYear - 100), max: currentYear }}
            type="number"
            label='Class year'
            size='small'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            value={this.state.classYearFilter}
            onChange={(event) => this.setState({ classYearFilter: event.target.value })}
          />
        </ClickAwayListener>
      </SearchFilter>
    );
  }

  renderDiversityFilter = () => {
    const { diversityFilter } = this.props;
    const options = helpers.getOptions(constants.eligibility);
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    let label = 'Any diversity';
    if (diversityFilter.length === 1) {
      label = optionsLabels[diversityFilter[0]];
    } else if (diversityFilter.length > 1) {
      label = `${optionsLabels[diversityFilter[0]]} (+${diversityFilter.length - 1})`;
    }

    const filterSet = new Set(this.state.diversityFilter);

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ diversityFilter: this.state.diversityFilter })}
        label='Diversity'
        displayValue={label}
        onOpen={() => this.setState({ diversityFilter: this.props.diversityFilter })}
      >
        <Grid container spacing={1} justify='flex-start' direction='column'>
          {
            options.map((option, i) => {
              return (
                <Grid item key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size='small'
                        checked={this.state.diversityFilter.includes(option.value)}
                        onChange={event => {
                          event.target.checked ? filterSet.add(option.value) : filterSet.delete(option.value);
                          this.setState({ diversityFilter: Array.from(filterSet) });
                        }}
                      />
                    }
                    label={option.label}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </SearchFilter>
    );
  }

  renderGenderFilter = () => {
    const options = [{ value: '', label: 'Any gender' }].concat(helpers.getOptions(constants.genders));
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    const displayValue = this.props.genderFilter ? optionsLabels[this.props.genderFilter] : 'Any gender';

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ genderFilter: this.state.genderFilter })}
        label='Gender'
        displayValue={displayValue}
        onOpen={() => this.setState({ genderFilter: this.props.genderFilter })}
      >
        <RadioGroup
          onChange={(event) => this.setState({ genderFilter: event.target.value })}
          value={this.state.genderFilter}
        >
          <Grid container spacing={1} justify='flex-start' direction='column'>
            {
              options.map((option, i) => {
                return (
                  <Grid item key={i}>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio size='small'/>}
                      label={option.label}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </RadioGroup>
      </SearchFilter>
    );
  }

  renderGPAFilter = () => {
    const displayValue = this.props.GPAFilter || 'Any GPA';

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ GPAFilter: this.state.GPAFilter })}
        label='GPA'
        displayValue={displayValue}
        onOpen={() => this.setState({ GPAFilter: this.props.GPAFilter })}
      >
        <ClickAwayListener
          onClickAway={() => {
            if (this.state.GPAFilter) {
              let GPA = Math.max(Math.min(this.state.GPAFilter, 4), 0);
              GPA = GPA.toFixed(1);
              this.setState({ GPAFilter: GPA });
            }
          }}
        >
          <TextField
            inputProps={{ min: 0, max: 4, step: 0.1}}
            type="number"
            label='GPA'
            size='small'
            variant='outlined'
            InputLabelProps={{ shrink: true }}
            value={this.state.GPAFilter}
            onChange={(event) => this.setState({ GPAFilter: event.target.value })}
          />
        </ClickAwayListener>
      </SearchFilter>
    );
  }

  renderIndustryFilter = () => {
    return (
      <SearchFilterTrigger
        label='Industry'
      >
        <Grid container spacing={1} justify='flex-start' direction='column'>
          {
            constants.industryPreferences.map(value => {
              return (
                <Grid item key={value}>
                  <FormControlLabel
                    value={value}
                    control={<Checkbox size='small'/>}
                    label={value}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </SearchFilterTrigger>
    );
  }

  renderLocationFilter = () => {
    return (
      <SearchFilter
        label='Location'
        displayValue={'Any location'}
      >
      </SearchFilter>
    );
  }

  renderMatchMyProfile = () => {
    return <Button>Match My Profile</Button>;
  }

  renderPostedDateFilter = () => {
    const options = [
      {
        value: 'day',
        label: 'Past day'
      },
      {
        value: 'week',
        label: 'Past week'
      },
      {
        value: 'month',
        label: 'Past month'
      },
      {
        value: '',
        label: 'Any time'
      }
    ];
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ postedDateFilter: this.state.postedDateFilter })}
        label='Posted date'
        displayValue={optionsLabels[this.props.postedDateFilter]}
        onOpen={() => this.setState({ postedDateFilter: this.props.postedDateFilter })}
      >
        <RadioGroup
          onChange={(event) => this.setState({ postedDateFilter: event.target.value })}
          value={this.state.postedDateFilter}
        >
          <Grid container spacing={1} justify='flex-start' direction='column'>
            {
              options.map((option, i) => {
                return (
                  <Grid item key={i}>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio size='small'/>}
                      label={option.label}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </RadioGroup>
      </SearchFilter>
    );
  }

  renderStartDateFilter = () => {
    const displayValue = this.props.startDateFilter ? moment.utc(this.props.startDateFilter).format('MMMM DD, YYYY') : 'Any start date';

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ startDateFilter: this.state.startDateFilter })}
        label='Start date'
        displayValue={displayValue}
        onOpen={() => this.setState({ startDateFilter: this.props.startDateFilter })}
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk={true}
            variant='inline'
            inputVariant='outlined'
            size='small'
            format='MM/DD/YYYY'
            value={this.state.startDateFilter}
            onChange={(date) => this.setState({ startDateFilter: date ? date.format('MM/DD/YYYY') : date })}
          />
        </MuiPickersUtilsProvider>
      </SearchFilter>
    );
  }

  renderEndDateFilter = () => {
    const displayValue = this.props.endDateFilter ? moment.utc(this.props.endDateFilter).format('MMMM DD, YYYY') : 'Any end date';

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ endDateFilter: this.state.endDateFilter })}
        label='End date'
        displayValue={displayValue}
        onOpen={() => this.setState({ endDateFilter: this.props.endDateFilter })}
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk={true}
            variant='inline'
            inputVariant='outlined'
            size='small'
            format='MM/DD/YYYY'
            value={this.state.endDateFilter}
            onChange={(date) => this.setState({ endDateFilter: date ? date.format('MM/DD/YYYY') : date })}
          />
        </MuiPickersUtilsProvider>
      </SearchFilter>
    );
  }

  renderProgramTypeFilter = () => {
    const { typeFilter } = this.props;
    const options = [
      {
        value: 'program',
        label: 'Program'
      },
      {
        value: 'scholarship',
        label: 'Scholarship'
      }
    ];
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    let label = 'Any type';
    if (typeFilter.length === 1) {
      label = optionsLabels[typeFilter[0]];
    } else if (typeFilter.length > 1) {
      label = `${optionsLabels[typeFilter[0]]} (+${typeFilter.length - 1})`;
    }

    const filterSet = new Set(this.state.typeFilter);

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ typeFilter: this.state.typeFilter })}
        label='Type'
        displayValue={label}
        onOpen={() => this.setState({ typeFilter: this.props.typeFilter })}
      >
        <Grid container spacing={1} justify='flex-start' direction='column'>
          {
            options.map((option, i) => {
              return (
                <Grid item key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size='small'
                        checked={this.state.typeFilter.includes(option.value)}
                        onChange={event => {
                          event.target.checked ? filterSet.add(option.value) : filterSet.delete(option.value);
                          this.setState({ typeFilter: Array.from(filterSet) });
                        }}
                      />
                    }
                    label={option.label}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </SearchFilter>
    );
  }

  renderRaceFilter = () => {
    const options = [{ value: '', label: 'Any race' }].concat(helpers.getOptions(constants.races));
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    const displayValue = this.props.raceFilter ? optionsLabels[this.props.raceFilter] : 'Any race';

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ raceFilter: this.state.raceFilter })}
        label='Race/Ethnicity'
        displayValue={displayValue}
        onOpen={() => this.setState({ raceFilter: this.props.raceFilter })}
      >
        <RadioGroup
          onChange={(event) => this.setState({ raceFilter: event.target.value })}
          value={this.state.raceFilter}
        >
          <Grid container spacing={1} justify='flex-start' direction='column'>
            {
              options.map((option, i) => {
                return (
                  <Grid item key={i}>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio size='small'/>}
                      label={option.label}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </RadioGroup>
      </SearchFilter>
    );
  }

  renderDistanceFilter = () => {
    const options = [
      {
        value: '10',
        label: '10 miles'
      },
      {
        value: '25',
        label: '25 miles'
      },
      {
        value: '50',
        label: '50 miles'
      },
      {
        value: '100',
        label: '100 miles'
      },
      {
        value: '',
        label: 'Any distance'
      }
    ];
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ distanceFilter: this.state.distanceFilter })}
        label='Distance'
        displayValue={optionsLabels[this.props.distanceFilter]}
        onOpen={() => this.setState({ distanceFilter: this.props.distanceFilter })}
      >
        <RadioGroup
          onChange={(event) => this.setState({ distanceFilter: event.target.value })}
          value={this.state.distanceFilter}
        >
          <Grid container spacing={1} justify='flex-start' direction='column'>
            {
              options.map((option, i) => {
                return (
                  <Grid item key={i}>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio size='small'/>}
                      label={option.label}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </RadioGroup>
      </SearchFilter>
    );
  }

  renderSortByFilter = () => {
    const options = [
      {
        value: 'posted_date',
        label: 'Posted date'
      },
      {
        value: 'deadline_date',
        label: 'Deadline date'
      },
      {
        value: 'most_relevant',
        label: 'Most relevant'
      }
    ];
    const optionsLabels = {};
    options.forEach(option => {
      optionsLabels[option.value] = option.label;
    });

    return (
      <SearchFilter
        onChange={() => this.props.handleChange({ sortByFilter: this.state.sortByFilter })}
        label='Sort by'
        displayValue={optionsLabels[this.props.sortByFilter]}
        onOpen={() => this.setState({ sortByFilter: this.props.sortByFilter })}
      >
        <RadioGroup
          onChange={(event) => this.setState({ sortByFilter: event.target.value })}
          value={this.state.sortByFilter}
        >
          <Grid container spacing={1} justify='flex-start' direction='column'>
            {
              options.map((option, i) => {
                return (
                  <Grid item key={i}>
                    <FormControlLabel
                      value={option.value}
                      control={<Radio size='small'/>}
                      label={option.label}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </RadioGroup>
      </SearchFilter>
    );
  }

  renderFilterButtons = () => {
    return (
      <Grid container spacing={1} justify='flex-end' alignItems='center'>
        <Grid item>
          <Button
            onClick={this.props.onClear}
            size='small'
          >
            Clear
          </Button>
        </Grid>
        <Grid item>
          <Button
            size='small'
            onClick={this.props.toggleExpand}
          >
            {this.props.isExpanded ? 'Less' : 'More'}
          </Button>
        </Grid>
      </Grid>
    )
  }

  renderExpandedFilters = () => {
    return (
      <Grid item xs container spacing={2}>
        <Grid item xs container spacing={1} alignItems='center'>
          <Grid item xs={12} container justify='flex-start'>
            <Grid item>
              <Typography variant='caption'>
                General
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {this.renderSortByFilter()}
          </Grid>
          <Grid item>
            {this.renderPostedDateFilter()}
          </Grid>
          {/* <Grid item>
            {this.renderLocationFilter()}
          </Grid> */}
          <Grid item>
            {this.renderDistanceFilter()}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        <Grid item xs={12} container spacing={1} alignItems='center'>
          <Grid item xs={12} container justify='flex-start'>
            <Grid item>
              <Typography variant='caption'>
                Program Details
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {this.renderProgramTypeFilter()}
          </Grid>
          <Grid item>
            {this.renderStartDateFilter()}
          </Grid>
          <Grid item>
            {this.renderEndDateFilter()}
          </Grid>
          {/* <Grid item>
            {this.renderIndustryFilter()}
          </Grid> */}
          <Grid item>
            {this.renderExcludeApplicationFilter()}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        <Grid item xs={12} container spacing={1} alignItems='center'>
          <Grid item xs={12} container justify='flex-start'>
            <Grid item>
              <Typography variant='caption'>
                Student Details
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {this.renderGPAFilter()}
          </Grid>
          <Grid item>
            {this.renderAgeFilter()}
          </Grid>
          <Grid item>
            {this.renderGenderFilter()}
          </Grid>
          <Grid item>
            {this.renderRaceFilter()}
          </Grid>
          <Grid item>
            {this.renderDiversityFilter()}
          </Grid>
          <Grid item>
            {this.renderClassYearFilter()}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        <Grid item xs>
          {this.renderFilterButtons()}
        </Grid>
      </Grid>
    );
  }

  renderCondensedFilters = () => {
    return (
      <Grid item xs container spacing={1} alignItems='center'>
        <Grid item>
          {this.renderSortByFilter()}
        </Grid>
        <Grid item>
          {this.renderPostedDateFilter()}
        </Grid>
        {/* <Grid item>
          {this.renderLocationFilter()}
        </Grid> */}
        <Grid item>
          {this.renderDistanceFilter()}
        </Grid>
        <Grid item xs>
          {this.renderFilterButtons()}
        </Grid>
      </Grid>
    );
  }

  render () {
    return (
      <>
        {this.props.isExpanded ? this.renderExpandedFilters() : this.renderCondensedFilters()}
      </>
    );
  }
}
