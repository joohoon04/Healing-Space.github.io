import React, { useState } from 'react';
import './Css/Gallery.css';
import image1 from '../images/20250225_130414.jpg';
import image2 from '../images/Screenshot_20220730-201446_Instagram.jpg';
import image3 from '../images/20220803_172824.jpg';
import image4 from '../images/1713228534512.jpg';
import image5 from '../images/IMG_20240404_024518_834.webp';
import image6 from '../images/IMG_20240609_132447_746.jpg';

const Gallery = () => {
  const images = [
    { src: image1, title: '후시미이나리의 까마귀', description: '일본 3박 4일 오사카 여행을 갔습니다.' },
    { src: image2, title: '무지개', description: '학교가 끝나고 무지개가 있어서 찍은 사진입니다.' },
    { src: image3, title: '고3 여름' , description: '고3때 주말 점심에 구름이 이뻐서 사진찍은 것입니다.'},
    { src: image4, title: '유채꽃', description: '백운 호수를 산책하다가 찍은 유채꽃입니다.' },
    { src: image5, title: '새벽 산책', description: '어느 새벽 밤 산책을 하면서 찍은 벚꽃입니다.' },
    { src: image6, title: '쪼리 산책', description: '누나와 같이 쪼리 산책하면서 찍은 귀여운 사진입니다.' },
  ];

const [showPopup, setShowPopup] = useState(false);
const [currentImage, setCurrentImage] = useState(null);
const [currentTitle, setCurrentTitle] = useState('');
const [currentDescription, setCurrentDescription] = useState('');


  const handleImageClick = (image, title, description) => {
    setCurrentImage(image);
    setCurrentTitle(title);
    setCurrentDescription(description);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentImage(null);
    setCurrentTitle('');
  };

  const fixedStyles = [
    { top: '5vh', left: '9vw', rotate: '-12deg' },
    { top: '8vh', left: '50vw', rotate: '-3deg' },
    { top: '30vh', left: '25vw', rotate: '8deg' },
    { top: '40vh', left: '65vw', rotate: '6deg' },
    { top: '60vh', left: '20vw', rotate: '-5deg' },
    { top: '65vh', left: '45vw', rotate: '3deg' },
  ];

  return (
    <div className="container">
      <main>
        <section className="content-grid">
          {images.map((item, index) => {
            const { top, left, rotate } = fixedStyles[index];
            return (
              <div
                className="grid-item"
                key={index}
                style={{ transform: `rotate(${rotate})`, top, left }}
                onClick={() => handleImageClick(item.src, item.title, item.description)}
              >
                <img src={item.src} alt={`Image ${index + 1}`} />
              </div>
            );
          })}
        </section>
      </main>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-image">
              <img src={currentImage} alt="Popup" />
            </div>
            <div className="popup-text">
              <h2 className='popup-title'>{currentTitle}</h2>
              <p className='popup-description'>{currentDescription}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;