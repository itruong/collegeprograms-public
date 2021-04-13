import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';


const chipsArrayStyles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    boxShadow: 'none',
    border: '1px solid #c1c1c1',
    width: '300px',//'max-content',
    maxWidth: '300px',
    minWidth: '195px',
    minHeight: '40px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});

class ChipsArray extends React.Component {
  handleDelete = (chipToDelete) => {
    const deletedValue = this.props.getOptionValue ? this.props.getOptionValue(chipToDelete) : chipToDelete;
    this.props.onChange(
      this.props.data.filter(
        (chip) => {
          const value = this.props.getOptionValue ? this.props.getOptionValue(chip) : chip;
          return value !== deletedValue;
        }
      )
    );
  };

  render () {
    const { classes } = this.props;
    return (
      <Paper component="ul" className={classes.root}>
        {this.props.data.map((data, index) => {
          return (
            <li key={index}>
              <Chip
                disabled={this.props.disabled}
                size='small'
                label={this.props.options[data]}
                onDelete={this.props.disabled ? undefined : () => this.handleDelete(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
    );
  }
}

export default withStyles(chipsArrayStyles)(ChipsArray);
