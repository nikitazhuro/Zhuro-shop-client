import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import classes from '../Styles/Admin-page.module.css';

import NavBar from '../Components/UI/NavBar/NavBar';
import ModalAdmin from '../Components/UI/Modal/ModalAdmin';
import AdminCreateGoodMenu from '../Components/Admin_CreateGoodMenu';
import MyButton from '../Components/UI/Button/MyButton';
import MyInput from '../Components/UI/Input/MyInput';

import {
  createCategoryMen, createCategoryWomen, removeCategoryMen, removeCategoryWomen,
} from '../http/categoriesApi';
import { Context } from '../Context';

const AdminPage = observer(() => {
  const { goods } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState({
    men: '',
    women: '',
  });
  const [removeCategories, setRemoveCategories] = useState({
    men: '',
    women: '',
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const addCategoryMen = async () => {
    await createCategoryMen(categories.men).then(() => {
      alert('Категория добавлена');
      setCategories({ ...categories, men: '' });
    });
  };
  const addCategoryWomen = async () => {
    await createCategoryWomen(categories.women).then(() => {
      alert('Категория добавлена');
      setCategories({ ...categories, women: '' });
    });
  };
  const deleteCategoryMen = async () => {
    await removeCategoryMen(removeCategories.men).then(() => {
      alert('Категория удалена');
      setCategories({ ...categories, men: '' });
    });
  };
  const deleteCategoryWomen = async () => {
    await removeCategoryWomen(removeCategories.women).then(() => {
      alert('Категория удалена');
      setCategories({ ...categories, men: '' });
    });
  };
  return (
    <Container fluid>
      <Row>
        <NavBar className={classes.nav} />
      </Row>
      <Row style={{ padding: '120px 0 0 0' }}>
        <Col md={{ offset: 2 }}>
          <div>
            <span
              aria-hidden
              onClick={() => setIsVisible(true)}
              className={classes.createGoodWindow}
            >
              Окно создания товара
            </span>
          </div>
          <div style={{ marginRight: '25px' }}>Чтобы изменить конкретный товар, перейдите на страницу с этим товаром</div>
          <hr />
          <div className={classes.addAndRemoveCategories}>
            <div>
              <span
                aria-hidden
                onClick={() => setShowAdd(true)}
              >
                Добавить категорию товаров
              </span>
              {showAdd
                && (
                <div>
                  <div className={classes.addAndRemoveCategories_block}>
                    <MyInput
                      placeholder="Для мужчин"
                      value={categories.men}
                      onChange={(e) => setCategories({ ...categories, men: e.target.value })}
                    />
                    <MyButton onClick={addCategoryMen}>Добавить категорию</MyButton>
                  </div>
                  <div className={classes.addAndRemoveCategories_block}>
                    <MyInput
                      placeholder="Для женщин"
                      value={categories.women}
                      onChange={(e) => setCategories({ ...categories, women: e.target.value })}
                    />
                    <MyButton onClick={addCategoryWomen}>Добавить категорию</MyButton>
                  </div>
                </div>
                ) }
            </div>
            <div>
              <span
                aria-hidden
                className={classes.rightBlock_p}
                onClick={() => setShowRemove(true)}
              >
                Удалить категорию товаров
              </span>
              {showRemove
                && (
                <div>
                  <div className={classes.addAndRemoveCategories_block}>
                    <select
                      onChange={(e) => setRemoveCategories({
                        ...removeCategories, men: e.target.value,
                      })}
                    >
                      <option selected disabled>Для мужчин</option>
                      {goods.menCategories.map((e) => (
                        <option key={e}>{e}</option>
                      ))}
                    </select>
                    <MyButton onClick={deleteCategoryMen}>Удалить категорию</MyButton>
                  </div>
                  <div className={classes.addAndRemoveCategories_block}>
                    <select
                      onChange={(e) => setRemoveCategories({
                        ...removeCategories, women: e.target.value,
                      })}
                    >
                      <option selected disabled>Для женщин</option>
                      {goods.womenCategories.map((e) => (
                        <option key={e}>{e}</option>
                      ))}
                    </select>
                    <MyButton onClick={deleteCategoryWomen}>Удалить категорию</MyButton>
                  </div>
                </div>
                ) }
            </div>
          </div>
        </Col>
        <ModalAdmin isVisible={isVisible} setIsVisible={setIsVisible}>
          <AdminCreateGoodMenu setIsVisible={setIsVisible} />
        </ModalAdmin>
      </Row>
    </Container>
  );
});

export default AdminPage;
