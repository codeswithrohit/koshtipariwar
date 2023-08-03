/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Carousel = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();
  let count = 0;

  const removeAnimation = () => {
    slideRef.current?.classList.remove("fade-anim");
  };

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
    <div
      className="w-full select-none relative rounded-lg overflow-hidden" // Removed bg-white class
    >
      {/* Added pink border here */}
      <div
        className="border-pink-500 border-4 rounded-lg"
        ref={slideRef}
      >
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={imageUrls[currentIndex]}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // This property ensures the image is best-fit inside the container without stretching
              maxWidth: "1500px",
              maxHeight: "420px",
            }}
          />
          {/* Overlay Content */}
          {/* End Overlay Content */}
        </div>
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnPrevClick}
        >
          <AiOutlineArrowLeft size={30} />
        </button>
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnNextClick}
        >
          <AiOutlineArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;


