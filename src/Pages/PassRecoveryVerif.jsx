import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import classes from '../Styles/Logon.module.css';

import AfterFooterLang from '../Components/AfterFooterLang';
import Footer from '../Components/Footer';
import NavBar from '../Components/UI/NavBar/NavBar';
import MyInput from '../Components/UI/Input/MyInput';

import { passRecoveryVerif } from '../http/userApi';

const PassRecoveryVerif = observer(() => {
  const router = useNavigate();
  const email = localStorage.getItem('recoveryEmail');
  const [password, setPassword] = useState(() => observable({
    mainPass: '',
    repeatPass: '',
  }));

  const recovery = async (e) => {
    e.preventDefault();
    try {
      if (password.mainPass === password.repeatPass) {
        await passRecoveryVerif(email, password.mainPass);
        router('/Logon');
      }
    } catch (error) {
      alert('Проверьете правильность вводы логина или пароля: пароль должен быть длиннее 4-х и короче 10 символов');
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <NavBar className={classes.nav} />
        </Row>
        <Row style={{ padding: '200px 0' }}>
          <Col md={{ span: 2, offset: 2 }}>
            <form className={classes.LogonForm}>
              <h1>
                Восстановления доступа к аккаунту
                {' '}
                {email}
              </h1>
              <MyInput
                value={password.mainPass}
                onChange={(e) => setPassword({ ...password, mainPass: e.target.value })}
                type="password"
                placeholder="Введите новый пароль"
              />
              <MyInput
                value={password.repeatPass}
                onChange={(e) => setPassword({ ...password, repeatPass: e.target.value })}
                type="password"
                placeholder="Повторите пароль"
              />
              {password.repeatPass
                && password.repeatPass !== password.mainPass
                && (
                  <span className={classes.password}>Пароли не совпадают</span>
                )}
              <button type="button" onClick={recovery}>Начать сеанс</button>
            </form>
          </Col>
        </Row>
      </Container>
      <Footer />
      <AfterFooterLang />
    </>
  );
});
export default PassRecoveryVerif;
