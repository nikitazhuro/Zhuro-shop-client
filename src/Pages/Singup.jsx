import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

import classes from '../Styles/Singup.module.css';

import AfterFooterLang from '../Components/AfterFooterLang';
import Footer from '../Components/Footer';
import NavBar from '../Components/UI/NavBar/NavBar';
import MyInput from '../Components/UI/Input/MyInput';

import { registration } from '../http/userApi';

const Singup = observer(() => {
  const [email, setEmail] = useState();
  const router = useNavigate();
  const [password, setPassword] = useState(() => observable({
    mainPass: '',
    repeatPass: '',
  }));

  const singup = async () => {
    try {
      let data;
      if (password.repeatPass === password.mainPass) {
        await registration(email, password.mainPass);
        router('/Logon');
        alert(data);
      }
    } catch (e) {
      alert('Проверьете правильность вводы логина или пароля: введите существующий email, пароль должен быть длиннее 4-х и короче 10 символов');
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <NavBar className={classes.nav} />
        </Row>
        <Row style={{ padding: '200px 0 0 0' }}>
          <Col md={{ span: 9, offset: 2 }}>
            <div className={classes.Singup}>
              <h1>Личные данные</h1>
              <form className={classes.SingupForm}>
                <MyInput value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Адрес электронной почты" />
                <MyInput
                  value={password.mainPass}
                  onChange={(e) => setPassword({ ...password, mainPass: e.target.value })}
                  type="password"
                  placeholder="Пароль"
                />
                <MyInput
                  value={password.repeatPass}
                  onChange={(e) => setPassword({ ...password, repeatPass: e.target.value })}
                  type="password"
                  placeholder="Повторите пароль"
                />
                {password.repeatPass
                  && password.repeatPass !== password.mainPass
                  && <span className={classes.password}>Пароли не совпадают</span>}
              </form>
              <button
                type="button"
                onClick={singup}
              >
                Создать учетную запись
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
      <AfterFooterLang />
    </>
  );
});
export default Singup;
