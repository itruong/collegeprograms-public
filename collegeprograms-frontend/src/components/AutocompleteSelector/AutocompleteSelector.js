import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';


const autocompleteStyles = theme => ({
  autocomplete: {
    width: '195px'
  }
});

class AutocompleteSelector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      inputValue: '',
      value: null
    };
  };

  handleInputChange = (event, newValue) => {
    console.log(newValue)
    this.setState({ inputValue: newValue });
  };

  handleChange = (event, newValue) => {
    if (newValue) {
      if (this.props.onChange) {
        this.props.onChange(newValue);
        this.setState({ inputValue: '', value: null });
      }
    }
  };

  render () {
    const { classes } = this.props;
    return (
      <Autocomplete
        className={classes.autocomplete}
        freeSolo
        disabled={this.props.disabled}
        value={this.state.value}
        inputValue={this.state.inputValue}
        options={this.props.options}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        getOptionLabel={this.props.getOptionLabel}
        renderInput={(params) => <TextField {...params} label='Search' size='small' variant="outlined" />}
      />
    );
  }
}

export default withStyles(autocompleteStyles)(AutocompleteSelector);
