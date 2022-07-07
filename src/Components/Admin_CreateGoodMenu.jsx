import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { observable } from 'mobx';

import classes from '../Styles/Admin_CreateGoodMenu.module.css';

import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';

import { createGood } from '../http/goodApi';
import { Context } from '../Context';

const CreateGoodMenu = observer(({ setIsVisible }) => {
  const { goods } = useContext(Context);

  const [newGood, setNewGood] = useState(() => observable({
    category: '',
    title: '',
    discription: '',
    size: [],
    color: '',
    sex: '',
    price: '',
    img: [],
  }));
  const [size, setSize] = useState('');
  const [showMen, setShowMen] = useState(false);
  const [showWomen, setShowWomen] = useState(false);
  const [img, setImg] = useState([]);

  const createNewGood = async () => {
    const formData = new FormData();
    formData.append('category', `${newGood.category}`);
    formData.append('title', `${newGood.title}`);
    formData.append('discription', `${newGood.discription}`);
    formData.append('size', JSON.stringify(newGood.size));
    formData.append('color', `${newGood.color}`);
    formData.append('sex', `${newGood.sex}`);
    formData.append('price', `${newGood.price}`);

    for (let i = 0; i < img.length; i += 1) {
      newGood.img.push(img[i]);
      formData.append('img', newGood.img[i]);
    }
    await createGood(formData);
    setIsVisible(false);
    alert('Товар создан!');
  };

  const addFiles = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      setImg([...img, e.target.files[i]]);
    }
  };
  return (
    <div className={classes.createGoodMenu}>
      <div className={classes.createGoodMenu_header}>
        <h1>Меню создания товара</h1>
        <span
          aria-hidden
          style={{ cursor: 'pointer' }}
          onClick={() => setIsVisible(false)}
        >
          Закрыть
        </span>
      </div>
      <div className={classes.createGoodMenu_body}>
        <div style={{ border: '2px solid black', padding: '15px', marginRight: '10px' }}>
          <p>Укажите категорию тавара</p>
          <div className={classes.showCategories}>
            <span
              aria-hidden
              onClick={() => { setShowMen(true); setShowWomen(false); }}
            >
              Мужские
            </span>
            <span
              aria-hidden
              onClick={() => { setShowMen(false); setShowWomen(true); }}
            >
              Женские
            </span>
          </div>
          {showMen
                && (
                <select
                  onChange={(e) => setNewGood({ ...newGood, category: e.target.value })}
                >
                  <option selected disabled>Для мужчин</option>
                  {goods.menCategories.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
                )}
          {showWomen
                && (
                <select
                  onChange={(e) => setNewGood({ ...newGood, category: e.target.value })}
                >
                  <option selected disabled>Для женщин</option>
                  {goods.womenCategories.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
                )}
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
          <select
            onChange={(e) => setNewGood({ ...newGood, sex: e.target.value })}
          >
            <option selected disabled>Укажите пол</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

          <div />
          <MyInput
            type="text"
            value={newGood.color}
            onChange={(e) => setNewGood({ ...newGood, color: e.target.value })}
            placeholder="Укажите основной цвет"
          />
          <select
            onChange={(e) => setSize(e.target.value)}
          >
            <option selected disabled>Укажите размеры для данного цвета</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <div>
            {newGood.size.map((e) => <span key={e + Math.random()} style={{ marginRight: '10px' }}>{e}</span>)}
          </div>
          <div className={classes.createGoodMenu_body_buttons}>
            <MyButton
              onClick={() => (size && newGood.size.push(size))}
            >
              Добавить размер
            </MyButton>
            <MyButton onClick={() => newGood.size.pop()}>Удалить размер</MyButton>
          </div>
          <input
            type="file"
            multiple
            onChange={addFiles}
          />
          <MyInput
            type="number"
            value={newGood.price}
            onChange={(e) => setNewGood({ ...newGood, price: e.target.value })}
            placeholder="Укажите цену товара для указанного цвета"
          />
          <div className={classes.createGoodMenu_footer}>
            <MyButton onClick={createNewGood}>Создать</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateGoodMenu;
