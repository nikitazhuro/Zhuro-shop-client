import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import classes from '../Styles/Logon.module.css';

import AfterFooterLang from '../Components/AfterFooterLang';
import Footer from '../Components/Footer';
import NavBar from '../Components/UI/NavBar/NavBar';

import { Context } from '../Context';
import { login } from '../http/userApi';

const Logon = observer(() => {
  const router = useNavigate();

  const { user } = useContext(Context);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      user.setUser(data);
      user.setIsAuth(true);
      router('/');
      console.log(user.user.id);
    } catch (error) {
      alert(e);
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <NavBar className={classes.nav} />
        </Row>
        <Row className={classes.mainRow}>
          <Col className={classes.mainCol} md={{ span: 2, offset: 2 }}>
            <form className={classes.LogonForm}>
              <h1>Начать сеанс</h1>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Адрес электронной почты"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Пaроль"
              />
              <Link className={classes.forgetPass} to="/Logon/passRecovery">Забыли пароль</Link>
              <button type="button" onClick={isLogin}>Начать сеанс</button>
            </form>
          </Col>
          <Col className={classes.mainCol} md={{ span: 2, offset: 2 }}>
            <form className={classes.LogonForm}>
              <h1>Зарегистрируйтесь</h1>
              <p>
                ЕСЛИ У ВАС ЕЩЕ НЕТ АККАУНТА ПОЛЬЗОВАТЕЛЯ ZHURO,/
                ИСПОЛЬЗУЙТЕ ЭТУ ОПЦИЮ ДЛЯ ДОСТУПА К ФОРМУЛЯРУ РЕГИСТРАЦИИ.
              </p>
              <p>МЫ ЗАПРОСИМ У ВАС ИНФОРМАЦИЮ, НЕОБХОДИМУЮ ДЛЯ УСКОРЕНИЯ ПРОЦЕССА ПОКУПКИ.</p>
              <Link to="/Singup">
                <button type="button">Создать аккаунт</button>
              </Link>
            </form>
          </Col>
        </Row>
      </Container>
      <Footer />
      <AfterFooterLang />
    </>
  );
});

export default Logon;
