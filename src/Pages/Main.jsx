import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import classes from '../Styles/MainPage.module.css';

import BurgerActive from '../Components/BurgerActive';
import CarouselModal from '../Components/UI/Carousel/Carousel';
import ModalReact from '../Components/UI/Modal/ModalReact';
import NavBar from '../Components/UI/NavBar/NavBar';

function Main() {
  const mainPageModalMen = true;
  const mainPageModalWomen = true;
  return (
    <>
      <Container fluid>
        <Row>
          <NavBar className={classes.nav} />
        </Row>
      </Container>
      <Container fluid style={{ height: '100vh', overflow: 'hidden', padding: 0 }}>
        <div className="MainPage">
          <Col>
            <div>
              <CarouselModal className={classes.carousel_main}>
                <div className={classes.carousel_main_elem}>
                  <div className={classes.carousel_element}>
                    <div className={classes.carousel_block}>
                      <div className={classes.carousel_block_img}>
                        <ModalReact mainPageModalMen={mainPageModalMen}>
                          <BurgerActive mainPageModalMen={mainPageModalMen} />
                        </ModalReact>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.carousel_main_elem}>
                  <div className={classes.carousel_element}>
                    <div className={classes.carousel_block}>
                      <div className={classes.carousel_block_img}>
                        <ModalReact mainPageModalWomen={mainPageModalWomen}>
                          <BurgerActive mainPageModalWomen={mainPageModalWomen} />
                        </ModalReact>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselModal>
            </div>
          </Col>
        </div>
      </Container>
    </>
  );
}

export default Main;
