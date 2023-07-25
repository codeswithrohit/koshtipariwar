import React, { useState, useEffect } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const images = [
  'https://wallpaperaccess.com/full/43867.jpg',
  'https://c4.wallpaperflare.com/wallpaper/311/453/240/selective-focus-micro-photography-of-white-petaled-flower-wallpaper-preview.jpg',
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {
    timeOut = autoPlay && setTimeout(slideRight, 5000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [current, autoPlay]);

  const slideRight = () => {
    setCurrent((current) => (current + 1) % images.length);
  };

  const slideLeft = () => {
    setCurrent((current) => (current - 1 + images.length) % images.length);
  };

  const handleMouseEnter = () => {
    setAutoPlay(false);
    clearTimeout(timeOut);
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  return (
   <div className='bg-white w-[10px] h-[450px]' >
     
     
        <div className="relative w-[1400px] h-[450px] overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[1600px] h-[450px] absolute top-0 left-0 transform ${
                index === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              } transition-opacity transition-transform`}
            >
              <img className="object-cover w-[1400px] h-[450px]" src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
       
   
      <div className="flex items-center justify-center absolute bottom-4 left-0 w-full">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
              index === current ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
 
  );
};

export default Carousel;
