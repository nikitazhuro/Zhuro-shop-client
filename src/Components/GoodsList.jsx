/* eslint-disable no-underscore-dangle */
import React from 'react';

import classes from '../Styles/GoodList.module.css';

import GoodItem from './GoodItem';

function GoodsList({ goods, widthStyle }) {
  return (
    <div className={classes.GoodsList}>
      <div className={classes.GoodsList_content}>
        {goods.map((good) => <GoodItem key={good._id} good={good} widthStyle={widthStyle} />)}
      </div>
    </div>
  );
}

export default GoodsList;
