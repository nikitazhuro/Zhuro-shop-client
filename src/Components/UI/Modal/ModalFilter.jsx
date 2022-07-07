import React from 'react';

import classes from './ModalFilter.module.css';

function ModalFilter({ children, isVisible, setIsVisible }) {
  const mixStyles = [classes.ModalFilter];

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
        className={classes.ModalFilter_Content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalFilter;
