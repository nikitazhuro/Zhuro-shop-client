import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Carousel, Col, Container, Row,
} from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

import classes from '../Styles/GoodItemPage.module.css';

import NavBar from '../Components/UI/NavBar/NavBar';
import Footer from '../Components/Footer';
import AfterFooterLang from '../Components/AfterFooterLang';
import ModalAdmin from '../Components/UI/Modal/ModalAdmin';
import AdminUpdateGoodMenu from '../Components/Admin_UpdateGoodMenu';

import { Context } from '../Context';
import { getOneGood } from '../http/goodApi';
import { addToBasket } from '../http/userApi';

const GoodItemPage = observer(() => {
  const { id } = useParams();
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [good, setGood] = useState({});
  const [basketData, setBasketData] = useState(() => observable({
    activeColor: '',
    activeSize: '',
    activePrice: '',
  }));

  const addGoodToBasket = () => {
    if (!basketData.activeSize) {
      alert('Укажите размер');
      throw new Error('Ошибка, укажите размер');
    }
    addToBasket(id, basketData).then(() => alert('Товар добавлен в корзину'));
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(async () => {
    await getOneGood(id).then((data) => {
      setGood(data);
      setBasketData({ ...basketData, activeColor: data.colors[0] });
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
        <Row style={{ padding: '100px 0 0 0' }}>
          <Col className={classes.block1} style={{ width: '38%' }} md={5}>
            {user.user.role === 'admin' && (
              <div
                aria-hidden
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setIsVisible(true)}
              >
                Изменить
              </div>
            )}
            <ModalAdmin isVisible={isVisible} setIsVisible={setIsVisible}>
              <AdminUpdateGoodMenu setIsVisible={setIsVisible} />
            </ModalAdmin>
            <div className={classes.LeftBlock}>
              <div className={classes.material_content}>
                <h1>Материалы и уход за изделием</h1>
                <p>
                  TRF HEAT PWR/Товар прошел лабораторные испытания/
                  на устойчивость к низким температурам от -5 до -20 ºC
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <Carousel
                className={classes.carousel}
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
              >
                {good.img[good.colors.indexOf(basketData.activeColor)].map((img) => (
                  <Carousel.Item key={img}>
                    <img
                      className="d-block w-100"
                      src={`https://zhuro-shop-server.herokuapp.com/${img}`}
                      alt={img}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col style={{ width: '28.4%' }} md={3}>
            <div className={classes.LeftBlock}>
              <div className={classes.RigthBlock_content}>
                <h1>{good.title}</h1>
                <p>{good.discription}</p>
                <p>
                  {good.prices[good.colors.indexOf(basketData.activeColor)]}
                  {' '}
                  BYN
                </p>
                {good.sizes.length
                  ? (
                    <p>
                      Размеры:
                      {good.sizes[good.colors.indexOf(basketData.activeColor)].map((size) => (
                        <span
                          aria-hidden
                          onClick={() => setBasketData({
                            ...basketData,
                            activeSize: size,
                            activePrice: good.prices[good.colors.indexOf(basketData.activeColor)],
                          })}
                          key={size}
                          className={size === basketData.activeSize && classes.activeSizeSpan}
                        >
                          {size}
                        </span>
                      ))}
                    </p>
                  )
                  : <p>Нет в наличии</p>}
                <p>
                  Цвет:
                  {' '}
                  {good.colors.map((color) => (
                    <span
                      key={color}
                      aria-hidden
                      onClick={() => {
                        setBasketData({ activeColor: color });
                        setIndex(0);
                      }}
                      className={color === basketData.activeColor && classes.activeColorSpan}
                    >
                      {color}
                    </span>
                  ))}

                </p>
                <div className={classes.RigthBlock_content_btns}>
                  <button type="button" onClick={addGoodToBasket}>Добавить в корзину</button>
                  <button type="button" style={{ marginLeft: '10px' }}>Купить</button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row />
      </Container>
      <Footer />
      <AfterFooterLang />
    </>
  );
});

export default GoodItemPage;
