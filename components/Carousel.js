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
    <div className="relative w-full mt-10 ">
      <div
        className="flex items-center justify-center w-full h-full py-2 mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AiOutlineDoubleLeft
          className="w-8 h-8 text-2xl text-blue-500 cursor-pointer"
          onClick={slideLeft}
        />
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transform ${
                index === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              } transition-opacity transition-transform`}
            >
              <img
                className="object-cover w-full h-full"
                src={image}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
        <AiOutlineDoubleRight
          className="w-8 h-8 text-2xl text-blue-500 cursor-pointer"
          onClick={slideRight}
        />
      </div>
      <div className="flex items-center justify-center mt-2">
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
