import React from 'react';

import classes from './ModalAdmin.module.css';

function ModalAdmin({ children, isVisible, setIsVisible }) {
  const mixStyles = [classes.ModalAdmin];

  if (isVisible) {
    mixStyles.push(classes.Active);
  }

  return (
    <div
      aria-hidden
      className={mixStyles.join(' ')}
      onClick={() => setIsVisible(false)}
    >
      <div
        aria-hidden
        className={classes.ModalAdmin_Content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalAdmin;
