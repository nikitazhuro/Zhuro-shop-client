/* eslint-disable no-underscore-dangle */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classes from '../Styles/Basket_GoodElem.module.css';

import { removeFromBasket } from '../http/userApi';

const BasketGoodElem = observer(({
  good,
  number,
  color,
  size,
  price,
}) => {
  const { id } = useParams();

  const router = useNavigate();

  const remove = async () => {
    await removeFromBasket(id, number);
  };

  return (
    <div className={classes.Basket_GoodElem}>
      <div
        aria-hidden
        className={classes.img}
        onClick={() => router(`/Goods/${good._id}`)}
      >
        <img src={`https://zhuro-shop-server.herokuapp.com/${good.img[good.colors.indexOf(color)][0]}`} alt="img" />
      </div>
      <div className={classes.discription}>
        <h1
          aria-hidden
          className={classes.disc_title}
          onClick={() => router(`/Goods/${good._id}`)}
        >
          {good.title}
        </h1>
        <p className={classes.disc_body}>
          {good.discription}
        </p>
      </div>
      <div className={classes.price}>
        {`${price} BYN`}
      </div>
      <div>
        <div className={classes.size}>
          Размер:
          {' '}
          {size}
        </div>
      </div>
      <form>
        <button
          type="button"
          onClick={remove}
          className={classes.close_btn}
        >
          Убрать из корзины
        </button>
      </form>
    </div>
  );
});

export default BasketGoodElem;
