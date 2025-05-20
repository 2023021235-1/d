import React, { useState, useEffect } from 'react';
import './styles/HeroSection.css';

// Import all images
import bg1 from '../images/bg1.webp';
import bg2 from '../images/bg2.webp';
import bg3 from '../images/bg3.webp';
import bg4 from '../images/bg4.webp';
import bg5 from '../images/bg5.webp';
import bg6 from '../images/bg6.webp';
import bg7 from '../images/bg7.webp';
import popupImg from '../images/popup.webp';
import News from './News';
import Course from './Courses';
import Services from './Services';
import AboutUs from './AboutUs';
const HeroSection = ({visited,setVisited}) => {
 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const slides = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];
  
  useEffect(() => {
    if(visited==0)
    {setShowModal(true);
      setVisited(1);
    }
    
    // Set up carousel interval
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hs-college-website">
      
      <div className="hs-carousal">
        
          <div className="hs-carouselBox">
            {slides.map((slide, index) => (
              <img
                key={index}
                className={`hs-carousel__photo ${currentSlide === index ? (index === 0 ? 'initial' : 'active') : ''}`}
                src={slide}
                alt={`College slide ${index + 1}`}
              />
            ))}
            <div className="hs-carousel__button--next" onClick={nextSlide}></div>
            <div className="hs-carousel__button--prev" onClick={prevSlide}></div>
            
            {/* Carousel Dots */}
            <div className="hs-carousel-dots">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`hs-carousel-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></div>
              ))}
            
          </div>
        </div>
      </div>
      
      <News />
      <AboutUs />
      
      <Course />
      
      {/* Modal */}
      {showModal && (
        <div className="hs-modal" id="myModal">
          <div className="hs-modal-dialog">
            <div className="hs-modal-content">
              <div>
                <img src={popupImg} alt="Popup" />
                <button className="hs-modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;