import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import classes from './NavBar.module.css';

import ModalReact from '../Modal/ModalReact';
import BurgerActive from '../../BurgerActive';

import logoDark from '../Images/logo_dark.svg';
import { logout } from '../../../http/userApi';
import { Context } from '../../../Context';

const burgerModal = true;

const NavBar = observer(({ children, ...props }) => {
  const router = useNavigate();

  const { user } = useContext(Context);

  const exit = async () => {
    try {
      await logout().then(() => {
        user.setIsAuth(false);
        user.setUser({});
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <Container fluid>
      <Row>
        <div {...props}>
          <Col md={2}>
            <ModalReact burgerModal={burgerModal}><BurgerActive exit={exit} /></ModalReact>
          </Col>
          <Col md={10}>
            <div className={classes.NavBar}>
              <div className={classes.NavBar_imgs}>
                <Link to="/">
                  <img
                    alt="logo"
                    style={{ marginTop: '-20px', width: '100%' }}
                    src={logoDark}
                  />
                </Link>
              </div>
              {children}
              <div className={classes.NavBar_search}>
                <Link to="/Goods"><span>Поиск</span></Link>
                {user.isAuth
                  && (
                  <>
                    {user.user.role === 'admin'
                      && (
                        <div
                          aria-hidden
                          className={classes.admin}
                          onClick={() => router('/admin-page')}
                        >
                          АДМИН
                        </div>
                      )}
                    <button
                      type="button"
                      onClick={() => router(`/Basket/${user.user.id}`)}
                    >
                      Корзина
                    </button>
                    <Link to="/">
                      <button
                        type="button"
                        onClick={exit}
                      >
                        Выйти
                      </button>
                    </Link>
                  </>
                  )}
              </div>
            </div>
          </Col>
        </div>
      </Row>
    </Container>
  );
});

export default NavBar;
