import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import classes from '../Styles/AfterFooterLang.module.css';

function AfterFooterLang() {
  return (
    <Container fluid>
      <Row>
        <Col md={{ offset: 2, span: 8 }}>
          <div className={classes.AfterFooterLang}>
            <div className={classes.AfterFooterLang_cont}>
              <p>Беларусь/Belarus</p>
              <p>Русский/English</p>
            </div>
            <div className={classes.AfterFooterLang_cont}>
              <p>zhuro</p>
              <p>© ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default AfterFooterLang;
