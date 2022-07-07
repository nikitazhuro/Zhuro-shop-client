import React from 'react';

import classes from './MyButton.module.css';

function MyButton({ children, ...props }) {
  return (
    <button type="button" className={classes.MyButton} {...props}>
      {children}
    </button>
  );
}

export default MyButton;
