/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Carousel = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();
  let count = 0;

  const handleOnNextClick = () => {
    count = (count + 1) % imageUrls.length;
    setCurrentIndex(count);
    slideRef.current?.classList.add("fade-anim");
  };

  const handleOnPrevClick = () => {
    const imagesLength = imageUrls.length;
    count = (count + imagesLength - 1) % imagesLength;
    setCurrentIndex(count);
    slideRef.current?.classList.add("fade-anim");
  };

  useEffect(() => {
    // Auto play the slider every 3 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      handleOnNextClick();
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (imageUrls.length === 0) {
    // If imageUrls array is empty, show a placeholder or loading spinner
    return <div>Loading...</div>; // You can replace this with an appropriate loading component
  }

  return (
    <div className='max-w-[1640px] mx-auto p-2 '>
      <div ref={slideRef} className='max-h-[450px] relative '>
      <img className="px-20"
  style={{ height: "510px",width:"100%" }}
  src={imageUrls[currentIndex]}
  alt="/"
/>

        <div className='absolute inset-y-0 left-0 flex justify-center items-center'>
          <button
            className='bg-red-300 text-white p-2 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition'
            onClick={handleOnPrevClick}
          >
            <AiOutlineArrowLeft size={30} />
          </button>
        </div>
        <div className='absolute inset-y-0 right-0 flex justify-center items-center'>
          <button
            className='bg-red-300 text-white p-2 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition'
            onClick={handleOnNextClick}
          >
            <AiOutlineArrowRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
