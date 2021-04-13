import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

const menuStyles = theme => ({
  list: {
    width: 250,
  },
  text: {
    fontWeight: "300",
  }
})

class HeaderMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        anchor="right"
        open={this.props.open}
        onClose={() => this.props.onClick()}
      >
        <div
          className={classes.list}
          role="presentation"
        >
          <List>
            {['Home', 'About', 'Projects', 'Contact'].map((text, index) => (
              <ListItem 
                button 
                component="a" 
                key={text} 
                onClick={() => this.props.onClick(''.concat('#', text.toLowerCase()))}
              >
                <ListItemText 
                  disableTypography
                  primary={
                    <Typography 
                      variant='h6'
                      className={classes.text}
                    >
                      {text}
                    </Typography>
                  }/>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    );
  }
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HeaderMenu = withStyles(menuStyles)(HeaderMenu)