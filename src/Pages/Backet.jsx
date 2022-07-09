/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import classes from '../Styles/Backet.module.css';

import Footer from '../Components/Footer';
import AfterFooterLang from '../Components/AfterFooterLang';
import NavBar from '../Components/UI/NavBar/NavBar';
import MyButton from '../Components/UI/Button/MyButton';
import BasketGoodElem from '../Components/BasketGoodElem';
import { getOneGood } from '../http/goodApi';

import { basket } from '../http/userApi';

const Backet = observer(() => {
  const { id } = useParams();
  const [basketGoods, setBasketGoods] = useState({
    goods: [],
    activeColors: [],
    activePrices: [],
    activeSizes: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const removeFromBtn = (uuid) => {
    setBasketGoods({
      ...basketGoods,
      goods: [...basketGoods.goods.filter((e) => e._id !== uuid)],
    });
  };

  useEffect(async () => {
    await basket(id).then(async (basketData) => {
      const dataArr = [];
      const colorsArr = [];
      const sizesArr = [];
      const pricesArr = [];

      for (let i = 0; i < basketData.good.length; i += 1) {
        const data = await getOneGood(basketData.good[i]);
        dataArr.push(data);
        colorsArr.push(basketData.activeColors[i]);
        sizesArr.push(basketData.activeSizes[i]);
        pricesArr.push(basketData.activePrices[i]);
      }
      setBasketGoods({
        ...basketGoods,
        goods: [...dataArr],
        activeColors: [...colorsArr],
        activeSizes: [...sizesArr],
        activePrices: [...pricesArr],
      });
    }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <NavBar className={classes.nav} />;
  }
  return (
    <>
      <Container fluid>
        <Row>
          <NavBar className={classes.nav} />
        </Row>
        <Row style={{ padding: '120px 0 0 0' }}>
          <div className={classes.title_basket}>
            <h1>Корзина</h1>
          </div>
        </Row>
        {basketGoods.goods.length
          ? (
            <Row className={classes.mainRow}>
              <Col className={classes.goodsList} md={9}>
                {basketGoods.goods.map((good, index) => (
                  <BasketGoodElem
                    key={good._id + Math.random()}
                    number={index}
                    good={good}
                    removeFromBtn={removeFromBtn}
                    price={basketGoods.activePrices[basketGoods.goods.indexOf(good)]}
                    size={basketGoods.activeSizes[basketGoods.goods.indexOf(good)]}
                    color={basketGoods.activeColors[basketGoods.goods.indexOf(good)]}
                  />
                ))}
              </Col>
              <Col md={3}>
                <div className={classes.payList}>
                  <div>
                    <h1>Сумма заказа</h1>
                  </div>
                  <div className={classes.goodsAndDelivery}>
                    <div className={classes.goodsAndDelivery_goods}>
                      <p>Товары</p>
                      <p>{`${basketGoods.activePrices.reduce((a, b) => +a + +b)} BYN`}</p>
                    </div>
                    <div className={classes.goodsAndDelivery_delivery}>
                      <p>Доставка</p>
                      <p>0 BYN</p>
                    </div>
                  </div>
                  <div className={classes.totalCostBlock}>
                    <div className={classes.totalCost}>
                      <p>Итого</p>
                      <p>{`${basketGoods.activePrices.reduce((a, b) => +a + +b)} BYN`}</p>
                    </div>
                    <div className={classes.totalCost_btn}>
                      <MyButton>Перейти к оплате</MyButton>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )
          : <p className={classes.alt_title}>Ваша корзина пуста</p>}
      </Container>
      <Footer />
      <AfterFooterLang />
    </>
  );
});
export default Backet;
