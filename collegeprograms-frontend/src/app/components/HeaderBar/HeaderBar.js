import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';
import {
  AppBar,
  Box,
  Divider,
  Grid,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from "prop-types";
import HeaderButton from 'app/components/HeaderButton/HeaderButton';
import HeaderMenu from 'app/components/HeaderMenu/HeaderMenu';
import { scrollTo } from 'app/helpers';
import HeaderTriggerMenu from 'app/components/HeaderTriggerMenu/HeaderTriggerMenu';
// import itLogo from "../img/favicon.png";
import SearchFilterGroup from 'programs/components/SearchFilterGroup/SearchFilterGroup';
import {
  getPrograms,
  getSavedPrograms,
  resetProgramsFilters,
  resetSavedProgramsFilters,
  setProgramsFilters,
  setSavedProgramsFilters
} from 'programs/actions';
import helpers from 'programs/helpers';


const loadingBarStyles = makeStyles(theme => {
  return {
    loader: {
      height: '2px'
    },
    hidden: {
      visibility: 'hidden'
    }
  };
})

function LoadingBar(props) {
  const classes = loadingBarStyles();
  let className;
  if (props.hide) {
    className = `${classes.loader} ${classes.hidden}`;
  } else {
    className = classes.loader;
  }

  return (
    <div>
      <LinearProgress
        className={className}
      />
    </div>
  );
}

const appBarStyles = theme => ({
  appBar: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    color: 'black',
    boxShadow: 'none',
    borderBottom: '1px solid #d3d3d38a',
    outline: 'none',
    //height: 64,
  },
  appBarLogo: {
    margin: "0 12px",
    // backgroundImage: `url(${itLogo})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // backgroundSize: "contain",
    border: '2px solid black',
    backgroundColor: 'transparent',
    "&:hover": {
      backgroundColor: 'transparent',
      border: '2px solid black',
    },
    height: 40,
    width: 40,
  },
  condensedAppBarLogo: {
    margin: "0 12px",
    // backgroundImage: `url(${itLogo})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // backgroundSize: "contain",
    backgroundColor: 'black',
    height: 32,
    width: 32,
  },
  toolbar: {
    minHeight: 'auto'
  },
  toolbarOffset: {
    visibility: 'hidden'
  }
});

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFiltersExpanded: false,
      isSearching: false,
      searchText: props.programsFilters.searchText
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.resetState();
    }
  }

  clearFilters = () => {
    this.handleFiltersChange({
      ...helpers.getInitialProgramFilters(),
      searchText: this.getFilters().searchText
    });
  }

  getFiltersCategory = () => {
    if (this.props.location.pathname === '/saved-programs') {
      return 'savedPrograms';
    } else {
      return 'programs';
    }
  }

  getFilters = () => {
    const filtersCategory = this.getFiltersCategory();
    if (filtersCategory === 'programs') {
      return this.props.programsFilters;
    } else if (filtersCategory === 'savedPrograms') {
      return this.props.savedProgramsFilters;
    }
  }

  handleSearchTextChange = (value) => {
    this.setState({ searchText: value });
  };
  
  updateSearchText = () => {
    this.setState({ isSearching: false });
    this.updateFilters(
      { searchText: this.state.searchText },
      'programs'
    );
  }

  resetState = () => {
    this.setState({
      isFiltersExpanded: false,
      isSearching: false,
      // searchText: this.props.programsFilters.searchText
    });
  }

  toggleExpandFilters = () => {
    this.setState({ isFiltersExpanded: !this.state.isFiltersExpanded });
  };

  handleFiltersChange = (updatedField) => {
    this.updateFilters(updatedField, this.getFiltersCategory());
  }

  handleSearching = () => {
    this.setState({ isSearching: true });
  }

  updateFilters = (updatedField, filtersCategory) => {
    if (filtersCategory === 'programs') {
      this.props.setProgramsFilters(updatedField);
      if (this.props.location.pathname !== '/') {
        this.props.history.push('/');
      } else {
        this.props.getPrograms();
      }
    } else if (filtersCategory === 'savedPrograms') {
      this.props.setSavedProgramsFilters(updatedField);
      this.props.getSavedPrograms();
    }
  }

  renderAppBar = () => {
    const { classes } = this.props;
    return (
      <AppBar id="appBar" className={classes.appBar}>
        {this.renderHeaderBar()}
      </AppBar>
    );
  }

  renderModalAppBar = () => {
    if (this.state.isSearching) {
      return (
        <Modal
          open={true}
          onClose={() => this.setState({ isSearching: false })}
        >
          {this.renderAppBar()}
        </Modal>
      );
    } else {
      return this.renderAppBar();
    }
  }

  renderHeaderBar = () => {
    const filters = this.getFilters();
    return (
      <>
        <HeaderBarWide
          isSearching={this.state.isSearching}
          onSearch={this.updateSearchText}
          onSearching={this.handleSearching}
          handleLogout={this.props.handleLogout}
          onSearchTextChange={this.handleSearchTextChange}
          searchText={this.state.searchText}
          ageFilter={filters.ageFilter}
          excludeApplicationFilter={filters.excludeApplicationFilter}
          classYearFilter={filters.classYearFilter}
          distanceFilter={filters.distanceFilter}
          diversityFilter={filters.diversityFilter}
          endDateFilter={filters.endDateFilter}
          filtersCategory={this.getFiltersCategory()}
          genderFilter={filters.genderFilter}
          GPAFilter={filters.GPAFilter}
          isFiltersExpanded={this.state.isFiltersExpanded}
          onClearFilters={this.clearFilters}
          path={this.props.location.pathname}
          postedDateFilter={filters.postedDateFilter}
          raceFilter={filters.raceFilter}
          startDateFilter={filters.startDateFilter}
          sortByFilter={filters.sortByFilter}
          toggleExpandFilters={this.toggleExpandFilters}
          typeFilter={filters.typeFilter}
          updateFilter={this.handleFiltersChange}
        />
        <LoadingBar hide={!this.props.isLoadingPrograms && !this.props.isLoadingSavedPrograms}/>
      </>
    );
  }

  render() {
    // if (this.props.windowWidth < 600)
    //   return (
    //     <HeaderBarCondensed
    //       handleLogout={this.props.handleLogout}
    //     />
    //   )
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderModalAppBar()}
        <div className={classes.toolbarOffset}>
          {this.renderHeaderBar()}
        </div>
      </div>
    )
  }
}

HeaderBar = withStyles(appBarStyles)(HeaderBar)
HeaderBar = withRouter(HeaderBar)

class HeaderBarCondensed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    }
  }

  toggleDrawer(isOpen) {
    this.setState({
      isMenuOpen: isOpen,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar id="appBar" className={classes.appBar}>
          <Toolbar>
            <IconButton 
              className={classes.condensedAppBarLogo}
              disableRipple
              component={Link}
              to='/'
            />
            <div className="app-bar-button-group"> 
              <IconButton
                aria-label="menu"
                onClick={() => this.toggleDrawer(true)}
              >
                <MenuIcon/>
              </IconButton>
              <HeaderMenu
                open={this.state.isMenuOpen}
                onClick={(href) => {
                  this.toggleDrawer(false);
                  if(Boolean(href)){
                    setTimeout(() => {
                      scrollTo(href);
                    }, 0);
                  }
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

HeaderBarCondensed.propTypes = {
  classes: PropTypes.object.isRequired,
};

HeaderBarCondensed = withStyles(appBarStyles)(HeaderBarCondensed)

class HeaderBarWide extends React.Component {
  handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      this.props.onSearch();
    }
  }

  renderHeaderButtons = () => {
    return (
      <Box display='flex' justifyContent='flex-end'>
        <HeaderButtonGroup
          handleLogout={this.props.handleLogout}
          path={this.props.path}
        />
      </Box>
    );
  }

  renderLogo = () => {
    const { classes } = this.props;
    return (
      <IconButton 
        disableRipple
        className={classes.appBarLogo}
        component={Link}
        to='/'
      />
    );
  }

  renderSearchBar = () => {
    let placeholder;
    if (this.props.filtersCategory === 'programs') {
      placeholder = 'Search all programs';
    } else if (this.props.filtersCategory === 'savedPrograms') {
      placeholder = 'Search saved programs';
    }

    return (
      <TextField
        autoFocus={this.props.isSearching}
        onChange={event => this.props.onSearchTextChange(event.target.value)}
        onFocus={this.props.onSearching}
        onKeyDown={this.handleKeyPress}
        placeholder={placeholder}
        type="search"
        value={this.props.searchText}
        variant="outlined"
        size='small'
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
            >
              <IconButton
                onClick={this.props.onSearch}
                size='small'
              >
                <SearchIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  renderSearchFilterSection = () => {
    if (this.props.path === '/' || this.props.path === '/saved-programs') {
      return (
        <>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item xs={12}>
            <SearchFilterGroup
              ageFilter={this.props.ageFilter}
              excludeApplicationFilter={this.props.excludeApplicationFilter}
              classYearFilter={this.props.classYearFilter}
              distanceFilter={this.props.distanceFilter}
              diversityFilter={this.props.diversityFilter}
              endDateFilter={this.props.endDateFilter}
              genderFilter={this.props.genderFilter}
              GPAFilter={this.props.GPAFilter}
              handleChange={this.props.updateFilter}
              isExpanded={this.props.isFiltersExpanded}
              onClear={this.props.onClearFilters}
              postedDateFilter={this.props.postedDateFilter}
              raceFilter={this.props.raceFilter}
              startDateFilter={this.props.startDateFilter}
              sortByFilter={this.props.sortByFilter}
              toggleExpand={this.props.toggleExpandFilters}
              typeFilter={this.props.typeFilter}
            />
          </Grid>
        </>
      );
    } else {
      return null;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.toolbar}>
        <Box mt={1} mb={1} width={1}>
          <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12} container spacing={2} alignItems='center'>
              <Grid item>
                {this.renderLogo()}
              </Grid>
              <Grid item xs>
                {this.renderSearchBar()}
              </Grid>
              <Grid item xs>
                {this.renderHeaderButtons()}
              </Grid>
            </Grid>
            {this.renderSearchFilterSection()}
          </Grid>
        </Box>
      </Toolbar>
    );
  }
}

HeaderBarWide.propTypes = {
  classes: PropTypes.object.isRequired,
};

HeaderBarWide = withStyles(appBarStyles)(HeaderBarWide)

const makeHeaderButtonGroupStyles = makeStyles(theme => {
  return {
    selectedIcon: {
      // borderBottom: '2px solid black'
    }
  };
});

function HeaderButtonGroup (props) {
  const classes = makeHeaderButtonGroupStyles();
  return (
    <>
      <HeaderButton
        component={Link}
        to='/'
      >
        {
          props.path === '/' ? (
            <HomeIcon className={classes.selectedIcon}/>
          ) : (
            <HomeOutlinedIcon/>
          )
        }
      </HeaderButton>
      <HeaderButton
        component={Link}
        to='/saved-programs'
      >
        {
          props.path === '/saved-programs' ? (
            <LibraryBooksIcon className={classes.selectedIcon}/>
          ) : (
            <LibraryBooksOutlinedIcon/>
          )
        }
      </HeaderButton>
      <HeaderTriggerMenu
        buttonContent={
          props.path === '/account' || props.path === '/profile' ? (
            <PersonIcon className={classes.selectedIcon}/>
          ) : (
            <PersonOutlineIcon/>
          )
        }
      >
        <MenuItem
          component={Link}
          to='/profile'
        >
          <Typography variant='body2' component='div'>
              <Box fontStyle='normal'>
                My Profile
              </Box>
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to='/account'
        >
          <Typography variant='body2' component='div'>
            <Box fontStyle='normal'>
              My Account
            </Box>
          </Typography>
        </MenuItem>
        <MenuItem onClick={props.handleLogout}>
          <Typography variant='body2' component='div'>
            <Box fontStyle='normal'>
              Sign Out
            </Box>
          </Typography>
        </MenuItem>
      </HeaderTriggerMenu>
      <HeaderTriggerMenu
        buttonContent={<NotificationsNoneIcon/>}
      >
        <MenuItem>
          <Typography variant='body2' component='div'>
            <Box fontStyle='italic'>
              No notifications
            </Box>
          </Typography>
        </MenuItem>
      </HeaderTriggerMenu>
      <HeaderButton>
        <HelpOutlineIcon/>
      </HeaderButton>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    programsFilters: state.programs.filters,
    savedProgramsFilters: state.savedPrograms.filters,
    isLoadingPrograms: state.programs.isFetching,
    isLoadingSavedPrograms: state.savedPrograms.isFetching
  };
};

const mapDispatchToProps = {
  getPrograms,
  getSavedPrograms,
  resetProgramsFilters,
  resetSavedProgramsFilters,
  setProgramsFilters,
  setSavedProgramsFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);
