import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import './ModalReact_Basket.css';
import './ModalReact_Filter.css';

import burger from '../Images/burger.svg';
import cross from '../../../Img/cross2.svg';
import main from '../../../Img/1.jpeg';
import main2 from '../../../Img/2.jpg';

const fullscreen = true;

function ModalReact({ children, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <>
      {props.filterModal && (
        <span aria-hidden onClick={() => setShow(true)}>Фильтры</span>
      )}
      {props.burgerModal && (
        <img
          aria-hidden
          src={burger}
          style={{ cursor: 'pointer' }}
          onClick={() => setShow(true)}
          alt="img"
        />
      )}
      {props.mainPageModalMen && (
        <img
          aria-hidden
          onClick={() => setShow(true)}
          style={{ cursor: 'pointer' }}
          src={main}
          alt="img"
        />
      )}
      {props.mainPageModalWomen && (
        <img
          aria-hidden
          onClick={() => setShow(true)}
          style={{ cursor: 'pointer' }}
          src={main2}
          alt="img"
        />
      )}
      <Modal
        className={(props.filterModal && 'ModalReact_Filter')
          || (props.burgerModal && 'ModalReact_Basket')
          || (props.mainPageModalMen && 'ModalReact_Basket')
          || (props.mainPageModalWomen && 'ModalReact_Basket')}
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          {props.filterModal
        && (
        <div className="ModalFilterActive_top_btn">
          <span aria-hidden onClick={() => setShow(false)}>Закрыть</span>
        </div>
        )}
          {props.burgerModal && (
            <img
              aria-hidden
              alt="cross"
              src={cross}
              className="cross_img"
              onClick={() => setShow(false)}
            />
          )}
          {props.mainPageModalMen && (
            <img
              aria-hidden
              alt="cross"
              src={cross}
              className="cross_img"
              onClick={() => setShow(false)}
            />
          )}
          {props.mainPageModalWomen && (
            <img
              aria-hidden
              alt="cross"
              src={cross}
              className="cross_img"
              onClick={() => setShow(false)}
            />
          )}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalReact;
