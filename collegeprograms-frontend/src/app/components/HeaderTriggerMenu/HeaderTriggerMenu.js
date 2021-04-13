import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Menu
} from '@material-ui/core';
import HeaderButton from 'app/components/HeaderButton/HeaderButton';


let DropdownMenu = (props) => {
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  );
};

DropdownMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(DropdownMenu);

export default function HeaderTriggerMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <HeaderButton
        onClick={handleClick}
      >
        {props.buttonContent}
      </HeaderButton>
      <DropdownMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div onClick={handleClose}>
          {props.children}
        </div>
        
      </DropdownMenu>
    </>
  );
}
