import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';

import classes from '../Styles/Admin_UpdateGoodMenu.module.css';

import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';

import {
  addData, removeOne, updateOne, getOneGood,
} from '../http/goodApi';

const UpdateGoodMenu = observer(({ setIsVisible }) => {
  const { id } = useParams();

  const router = useNavigate();

  const [showDiscritionWindow, setShowDiscritionWindow] = useState(false);
  const [newGood, setNewGood] = useState({
    category: '',
    title: '',
    discription: '',
  });
  const [dataSize, setDataSize] = useState('');
  const [img, setImg] = useState([]);
  const [data, setData] = useState(() => observable({
    size: [],
    color: '',
    price: '',
    img: [],
  }));
  const [show, setShow] = useState(false);

  const addNewData = async () => {
    const formData = new FormData();

    formData.append('size', JSON.stringify(data.size));
    formData.append('color', `${data.color}`);
    formData.append('price', `${data.price}`);

    for (let i = 0; i < img.length; i += 1) {
      data.img.push(img[i]);
      formData.append('img', data.img[i]);
    }

    await addData(id, formData);

    alert('Данные добавлены!');

    router(`/Goods/${id}`);
  };

  const addFiles = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      setImg([...img, e.target.files[i]]);
    }
  };

  const remove = async () => {
    if (window.confirm('Вы уверены что хотите удалить данный товар из базы данных?')) {
      await removeOne(id).then(() => {
        alert('Товар удален');
        setIsVisible(false);
        router('/Goods');
      });
    }
  };

  const updateGood = async () => {
    await updateOne(id, newGood).then(() => {
      alert('Товар обновлен!');
      router(`/Goods/${id}`);
    });
  };

  useEffect(async () => {
    await getOneGood(id).then((res) => {
      setNewGood(res);
    });
  }, []);

  return (
    <div className={classes.UpdateGoodMenu}>
      <div className={classes.UpdateGoodMenu_header}>
        <h1>Меню изменения товара</h1>
        <span
          aria-hidden
          className={classes.span}
          onClick={() => setIsVisible(false)}
        >
          Закрыть
        </span>
      </div>
      <div className={classes.UpdateGoodMenu_body}>
        <div className={classes.UpdateGoodMenu_body_block1}>
          <span
            aria-hidden
            className={classes.span}
            onClick={() => (setShowDiscritionWindow(true))}
          >
            Изменить описание товара
          </span>
          {showDiscritionWindow
            && (
            <div className={classes.table1}>
              <span
                aria-hidden
                className={classes.span}
                onClick={() => (setShowDiscritionWindow(false))}
              >
                Закрыть окно
              </span>
              <MyInput
                type="text"
                value={newGood.category}
                onChange={(e) => setNewGood({ ...newGood, category: e.target.value })}
                placeholder="Укажите категорию товара"
              />
              <MyInput
                type="text"
                value={newGood.title}
                onChange={(e) => setNewGood({ ...newGood, title: e.target.value })}
                placeholder="Укажите заголовок для товара"
              />
              <MyInput
                type="text"
                value={newGood.discription}
                onChange={((e) => setNewGood({ ...newGood, discription: e.target.value }))}
                placeholder="Укажите описание для товара"
              />
              <div className={classes.UpdateGoodMenu_footer_sendBtn}>
                <MyButton onClick={updateGood}>Отправить форму</MyButton>
              </div>
            </div>
            )}
        </div>
        <div className={classes.UpdateGoodMenu_body_block2}>
          <span
            aria-hidden
            className={classes.span}
            onClick={() => setShow(true)}
          >
            Добавить другие цвета
          </span>
          {show && (
          <div className={classes.table2}>
            <span
              aria-hidden
              className={classes.span}
              onClick={() => setShow(false)}
            >
              Закрыть форму
            </span>
            <MyInput
              type="text"
              value={data.color}
              onChange={(e) => setData({ ...data, color: e.target.value })}
              placeholder="Укажите дополнительный цвет"
            />
            <select
              onChange={(e) => setDataSize(e.target.value)}
            >
              <option selected disabled>Укажите размеры для данного цвета</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <div>
              {data.size.map((e) => <span key={e + Math.random()} style={{ marginRight: '10px' }}>{e}</span>)}
            </div>
            <div className={classes.createGoodMenu_body_buttons}>
              <MyButton
                onClick={() => (dataSize && data.size.push(dataSize))}
              >
                Добавить размер
              </MyButton>
              <MyButton onClick={() => data.size.pop()}>Удалить последний размер</MyButton>
            </div>
            <input
              type="file"
              multiple
              onChange={addFiles}
            />
            <MyInput
              type="number"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              placeholder="Укажите цену товара для указанного цвета"
            />
            <div className={classes.UpdateGoodMenu_footer_sendBtn}>
              <MyButton onClick={addNewData}>Отправить форму</MyButton>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className={classes.UpdateGoodMenu_footer}>
        <span
          aria-hidden
          onClick={remove}
          className={classes.UpdateGoodMenu_footer_removeOne}
        >
          Удалить товар
        </span>
      </div>
    </div>
  );
});

export default UpdateGoodMenu;
