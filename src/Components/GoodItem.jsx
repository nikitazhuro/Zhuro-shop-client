/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../Styles/GoodItem.module.css';

function GoodItem({ ...props }) {
  const router = useNavigate();
  return (
    <div
      aria-hidden
      className={props.widthStyle}
      style={{ cursor: 'pointer' }}
      onClick={() => router(`/Goods/${props.good._id}`)}
    >
      <div className={classes.GoodItem_content}>
        <div>
          <img
            className={classes.GoodItem_img}
            src={`https://zhuro-shop-server.herokuapp.com/${props.good.img[0][0]}`}
            alt="img"
          />
        </div>
        <div className={classes.discription}>
          <span>
            {props.good.title}
          </span>
          <p>
            {`${props.good.prices[0]} BYN`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoodItem;
