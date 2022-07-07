import React, {
  useEffect, useContext, useRef, useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import classes from '../Styles/GoodsCategoryPage.module.css';

import GoodsList from '../Components/GoodsList';
import NavBar from '../Components/UI/NavBar/NavBar';
import Footer from '../Components/Footer';
import AfterFooterLang from '../Components/AfterFooterLang';

import { Context } from '../Context';
import { getAllCategorySort } from '../http/goodApi';
import getPageCount from '../Utils/getPageCount';
import useObserver from '../Hooks/useObserver';

const GoodsCategoryPage = observer(() => {
  const { sexId, category } = useParams();

  const { goods } = useContext(Context);

  const observableElem = useRef();

  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useObserver(observableElem, isLoading, totalPages);

  useEffect(async () => {
    await getAllCategorySort(sexId, category, goods.page, limit).then((data) => {
      goods.setGoodsCategoryPage(data);
      goods.setTotalCount(30);
      setTotalPages(getPageCount(goods.totalCount, limit));
    }).finally(() => setIsLoading(false));
  }, [category, goods.page, limit]);

  if (isLoading) {
    return (
      <NavBar className={classes.nav} />
    );
  }

  return (
    <>
      <Container fluid>
        <Row>
          <NavBar className={classes.nav}>
            <div className={classes.slider_block}>
              <div className={classes.slider}>
                <div className={classes.btns}>
                  <button
                    type="button"
                    style={{ paddingRight: '25%' }}
                    onClick={() => {
                      setCurrentNumber(0);
                      setLimit(4);
                      goods.setPage(1);
                      goods.setGoodsCategoryPageReplace([]);
                    }}
                  />
                  <button
                    type="button"
                    style={{ padding: '0 25%' }}
                    onClick={() => {
                      setCurrentNumber(2.75);
                      setLimit(6);
                      goods.setPage(1);
                      goods.setGoodsCategoryPageReplace([]);
                    }}
                  />
                  <button
                    type="button"
                    style={{ paddingLeft: '25%' }}
                    onClick={() => {
                      setCurrentNumber(5.5);
                      setLimit(8);
                      goods.setPage(1);
                      goods.setGoodsCategoryPageReplace([]);
                    }}
                  />
                </div>
                <span style={{ transform: `translateX(${currentNumber}vw)` }} className={classes.ball} />
              </div>
            </div>
          </NavBar>
        </Row>
        <Row style={{ padding: '120px 0 0 0' }}>
          <div className={classes.Goods}>
            <GoodsList
              widthStyle={
                (limit === 4 && classes.limit_4)
                || (limit === 6 && classes.limit_6)
                || (limit === 8 && classes.limit_8)
              }
              goods={goods.goodsCategoryPage}
            />
          </div>
          <div ref={observableElem} />
        </Row>
      </Container>
      <Footer />
      <AfterFooterLang />
    </>
  );
});
export default GoodsCategoryPage;
