import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import '../ServicesSlider/ServicesSlider.css';

const ServicesSlider = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="services-slider">
      <h2>{t('ourServices')}</h2>
      <Slider {...settings}>
        <div className="slide">
          <img src="https://via.placeholder.com/300x200" alt="Service 1" />
          <p>Service 1</p>
        </div>
        <div className="slide">
          <img src="https://via.placeholder.com/300x200" alt="Service 2" />
          <p>Service 2</p>
        </div>
        <div className="slide">
          <img src="https://via.placeholder.com/300x200" alt="Service 3" />
          <p>Service 3</p>
        </div>
        <div className="slide">
          <img src="https://via.placeholder.com/300x200" alt="Service 4" />
          <p>Service 4</p>
        </div>
        <div className="slide">
          <img src="https://via.placeholder.com/300x200" alt="Service 5" />
          <p>Service 5</p>
        </div>
      </Slider>
    </div>
  );
};

export default ServicesSlider;
