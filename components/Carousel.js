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
      <img
  className="px-1 md:px-20"
  style={{
    width: "100%", // Fill the available width
    maxWidth: "100%",
    maxHeight:"500px", // Limit the width for desktop view
    // Adjust the height for desktop (e.g., 400px)
    '@media (min-width: 1024px)': {
      height: "200px", // Custom height for desktop
    },
    '@media (max-width: 767px)': {
      height: "200px", // Custom height for mobile
    }
  }}
  src={imageUrls[currentIndex]}
  alt="/"
/>



       
      </div>
    </div>
  );
};

export default Carousel;
