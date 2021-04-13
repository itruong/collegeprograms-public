import React from 'react';
import {
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


const SearchFilterStyles = theme => ({
  // button: {
  //   borderColor: 'black',//'#0068b3',
  //   color: 'black',//'#0068b3'
  // },
  button: {
    border: 'none',
    padding: '7px 6px 7px 9px'
  },
  buttonText: {
    transition: "opacity 0.2s",
    fontWeight: "500",
    textTransform: "none",
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'none',
    border: '1px solid #d3d3d38a'
  },
  legend: {
    transform: 'translate(0, -60%)',
    fontSize: 'smaller',
    margin: '0 12px',
    width: 'max-content',
    height: 'min-content',
    padding: 0,
  },
  hiddenLegend: {
    height: 0,
    visibility: 'hidden',
    fontSize: 'smaller',
    margin: '0 10px',
  },
  fieldset: {
    position: 'relative',
    padding: 0,
    margin: 0,
    marginTop: '6px',
    borderRadius: '4px',
    border: `1px solid black`,
  },
  div: {
    position: 'absolute',
    width: '100%',
    height: 0
  },
  icon: {
    verticalAlign: 'middle'
  },
  container: {
    padding: '7px',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  }
});

class SearchFilterTrigger extends React.Component {
  handleClick = event => {
    this.props.isOpen ? this.props.onClose() : this.props.onOpen(event);
  }

  render () {
    const { classes } = this.props;
    return (
      <>
        <fieldset className={classes.fieldset}>
          <legend align='left' className={classes.hiddenLegend}>
            {this.props.label}
          </legend>
          <div className={classes.div}>
            <legend align='left' className={classes.legend}>
              {this.props.label}
            </legend>
          </div>
            <Grid container alignItems='center' className={classes.container} onClick={this.handleClick}>
              <Grid item xs>
                <Typography variant='body1' className={classes.buttonText}>
                  {this.props.displayValue}
                </Typography>
              </Grid>
              <Grid item>
                {this.props.isOpen ? <ExpandLessIcon className={classes.icon}/> : <ExpandMoreIcon className={classes.icon}/>}
              </Grid>
            </Grid>
        </fieldset>
        <Popper
          open={this.props.isOpen}
          anchorEl={this.props.anchorEl}
          placement='bottom-start'
          modifiers={{
            flip: {
              enabled: false
            }
          }}
          style={{ zIndex: 1300 }}
        >
          <ClickAwayListener
            onClickAway={this.props.onClose}
          >
            <Paper className={classes.paper}>
              {this.props.children}
            </Paper>
          </ClickAwayListener>
        </Popper>
      </>
    )
  }
}

export default withStyles(SearchFilterStyles)(SearchFilterTrigger);
