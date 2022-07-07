import React from 'react';
import { observer } from 'mobx-react-lite';

import classes from './MyInput.module.css';

const MyInput = observer(({ ...props }) => (
  <input className={classes.MyInput} {...props} />
));

export default MyInput;
