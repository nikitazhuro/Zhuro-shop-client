import React, { useEffect, useState } from 'react';

import './Carousel.css';

function CarouselModal(props) {
  const { children } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex !== 0 && (
        <div aria-hidden onClick={prev} className="left-arrow">
          <span>&lt;</span>
          <span className="name-of-arrow" style={{ marginLeft: '5px' }}>Мужчины</span>
        </div>
        )}
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {children}
          </div>
        </div>
        {currentIndex === 0 && (
        <div aria-hidden onClick={next} className="right-arrow">
          <span className="name-of-arrow" style={{ marginRight: '5px' }}>Женщины</span>
          <span>&gt;</span>
        </div>
        )}
        <div className="navDots">
          <span
            aria-hidden
            onClick={prev}
            className={currentIndex === 0 ? 'LeftDot-active' : 'LeftDot'}
          />
          <span
            aria-hidden
            onClick={next}
            className={currentIndex !== 0 ? 'RightDot-active' : 'RightDot'}
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselModal;
