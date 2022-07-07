/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import classes from '../Styles/Footer.module.css';

import MyButton from './UI/Button/MyButton';
import MyInput from './UI/Input/MyInput';

const socials = ['Instagram', 'VK', 'Facebook', 'Twitter', 'Youtube', 'Github'];

function Footer() {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
    setIsVisible(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 10, offset: 2 }}>
          <div className={classes.Footer}>
            <form className={classes.Footer_form}>
              <h1>ПОДПИШИТЕСЬ НА НАШУ НОВОСТНУЮ РАССЫЛКУ</h1>
              <MyInput
                style={{ width: '80%' }}
                type="text"
                value={email}
                onChange={onChange}
                placeholder="Укажите свой адрес электронной почты"
              />
              <div style={isVisible ? { display: 'block' } : { display: 'none' }} className={classes.Footer_form_hideContent}>
                <h2>Интересующие вас разделы</h2>
                <div style={{ display: 'flex', margin: '20px 0 40px 0' }}>
                  <label>
                    <input type="checkbox" />
                    Женский
                  </label>
                  <label style={{ marginLeft: '10px' }}>
                    <input type="checkbox" />
                    Мужской
                  </label>
                </div>
                <label>
                  <input type="checkbox" />
                  СОГЛАСЕН (СОГЛАСНА) С ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ
                </label>
                <MyButton style={{ width: '80%' }}>Подписывайся</MyButton>
              </div>
            </form>
            <div>
              <ul className={classes.socials}>
                {socials.map((el) => <li key={el}>{el}</li>)}
              </ul>
            </div>
            <div>
              <ul className={classes.links}>
                <li>Cookies Settings</li>
                <li>|</li>
                <li>Политика конфиденциальности и использования файлов cookie</li>
                <li>|</li>
                <li>Условия покупки</li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
