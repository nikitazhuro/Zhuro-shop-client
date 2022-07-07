import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import AfterFooterLang from '../Components/AfterFooterLang';
import Footer from '../Components/Footer';
import NavBar from '../Components/UI/NavBar/NavBar';
import classes from '../Styles/Logon.module.css';
import MyInput from '../Components/UI/Input/MyInput';
import { passRecovery } from '../http/userApi';

const PassRecovery = observer(() => {
  const [email, setEmail] = useState('');

  const recovery = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await passRecovery(email);
      localStorage.setItem('recoveryEmail', email);
      alert(data);
    } catch (error) {
      alert(e.response.data);
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
              <h1>Восстановления доступа к аккаунту</h1>
              <MyInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Адрес электронной почты"
              />
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

export default PassRecovery;
