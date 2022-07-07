import React, {
  useContext, useMemo, useState, useEffect,
} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import classes from '../Styles/Goods.module.css';

import ModalFilterActive from '../Components/ModalFilterActive';
import MyInput from '../Components/UI/Input/MyInput';
import GoodsList from '../Components/GoodsList';
import NavBar from '../Components/UI/NavBar/NavBar';
import Footer from '../Components/Footer';
import AfterFooterLang from '../Components/AfterFooterLang';
import ModalReact from '../Components/UI/Modal/ModalReact';

import { Context } from '../Context';
import cross from '../Img/cross2.svg';
import { useSearchAndFilter, useSearchAndFilterSex } from '../Hooks/useSearchAndFilterGoods';
import { getAll } from '../http/goodApi';

const trends = ['Куртка', 'Платье', 'Свитер', 'Пальто'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const filterModal = true;

const Search = observer(() => {
  const { filter, goods } = useContext(Context);

  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortedAndFilterGoods = useSearchAndFilter(filter, size, color);
  const searchAndFilterSex = useSearchAndFilterSex(filter);

  const arrOfColors = useMemo(() => (
    sortedAndFilterGoods.map((elem) => elem.colors)
  ), [searchAndFilterSex]);

  const renderColors = () => {
    const newFilteredColors = new Set();
    for (let i = 0; i < arrOfColors.length; i += 1) {
      for (let n = 0; n < arrOfColors[i].length; n += 1) {
        newFilteredColors.add(arrOfColors[i][n]);
      }
    }
    return newFilteredColors;
  };

  const colors = useMemo(() => [...new Set(renderColors())], [arrOfColors]);

  const onChangeSize = (value, activeSizes) => {
    setSize(
      (!size.includes(value) && activeSizes.includes(value))
        ? [...size, value]
        : size.filter((elem) => elem !== value),
    );
  };

  const onChangeColor = (value, activeColors) => {
    setColor(
      (!color.includes(value) && activeColors.includes(value))
        ? [...color, value]
        : color.filter((elem) => elem !== value),
    );
  };

  useEffect(async () => {
    await getAll().then((data) => {
      goods.setGoods(data);
    }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <NavBar className={classes.nav} />
    );
  }
  return (
    <>
      <Container fluid>
        <Row>
          <NavBar className={classes.nav} />
        </Row>
        <Row className="position-fixed w-100" style={{ padding: '120px 0 0 0', background: 'white' }}>
          <Col md={{ span: 10, offset: 2 }}>
            <div className={classes.Goods_input}>
              <MyInput value={filter.search} onChange={(e) => filter.setSearch(e.target.value)} type="text" placeholder="ВВедите запрос для поиска" />
              <div aria-hidden onClick={() => filter.setSearch('')}>
                <img className={classes.cross} src={cross} alt="cross" />
              </div>
            </div>
          </Col>
          {filter.search
            && (
            <Col md={{ span: 10, offset: 2 }}>
              <div className={classes.Filter}>
                <div style={{ display: 'flex' }}>
                  <span className={classes.searchResult}>
                    {sortedAndFilterGoods.length}
                    {' '}
                    Результаты
                  </span>
                  <ul className={classes.sexFilter}>
                    <li
                      aria-hidden
                      style={filter.sex === 'male' ? { borderBottom: '1px solid black' } : { border: 'none' }}
                      onClick={() => filter.setSex('male')}
                    >
                      Мужская
                    </li>
                    <li
                      aria-hidden
                      style={filter.sex === 'female' ? { borderBottom: '1px solid black' } : { border: 'none' }}
                      onClick={() => filter.setSex('female')}
                    >
                      Женская
                    </li>
                  </ul>
                </div>
                <ModalReact filterModal={filterModal}>
                  <ModalFilterActive
                    color={color}
                    size={size}
                    onChangeSize={onChangeSize}
                    onChangeColor={onChangeColor}
                    colors={colors}
                    sizes={sizes}
                  />
                </ModalReact>
              </div>
            </Col>
            )}
        </Row>
        <Row style={{ padding: '200px 0 0 0' }}>
          {filter.search === ''
            ? (
              <Col md={{ span: 10, offset: 2 }}>
                <div className={classes.Goods_trends}>
                  <h1>Тенденции</h1>
                  <ul>
                    {trends.map((e) => (
                      <li
                        aria-hidden
                        key={e}
                        onClick={() => filter.setSearch(e)}
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            )
            : (
              <Col>
                <div className={classes.Goods}>
                  <GoodsList widthStyle={classes.widthGoodItem} goods={sortedAndFilterGoods} />
                </div>
              </Col>
            )}
          {!sortedAndFilterGoods.length
            && filter.search !== ''
            && (
              <div className={classes.nothing}>
                По вашему запросу ничего не найдено
              </div>
            )}
        </Row>
      </Container>
      <Footer />
      <AfterFooterLang />
    </>
  );
});
export default Search;
