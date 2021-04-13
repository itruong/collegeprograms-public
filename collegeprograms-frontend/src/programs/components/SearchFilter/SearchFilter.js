import React from 'react';
import {
  Button,
  Grid
} from '@material-ui/core';
import SearchFilterTrigger from 'programs/components/SearchFilterTrigger/SearchFilterTrigger';


export default class SearchFilter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null,
      isOpen: false
    };
  }

  handleChange = () => {
    this.handleClose();
    this.props.onChange();
  }

  handleOpen = (event) => {
    this.setState({
      isOpen: true,
      anchorEl: event.currentTarget
    });
    this.props.onOpen();
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
      anchorEl: null
    });
  }

  render () {
    return (
      <SearchFilterTrigger
        anchorEl={this.state.anchorEl}
        label={this.props.label}
        displayValue={this.props.displayValue}
        isOpen={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.handleChange}>
              Save
            </Button>
          </Grid>
        </Grid>
      </SearchFilterTrigger>
    );
  }
}
