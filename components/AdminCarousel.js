import React, { useState, useRef } from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminCarousel = ({ imageUrls, onDeleteImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();
  let count = 0;

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };

  const handleOnNextClick = () => {
    count = (count + 1) % imageUrls.length;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };

  const handleOnPrevClick = () => {
    const imagesLength = imageUrls.length;
    count = (count + imagesLength - 1) % imagesLength;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };

  const handleDeleteClick = async () => {
    if (onDeleteImage) {
      const imageUrlToDelete = imageUrls[currentIndex];
      try {
        // Implement your delete logic here
        // For example, if you are using Firebase, you can delete the image from storage and remove the corresponding document from the Firestore collection.
        // For demonstration purposes, let's just show a success message using react-toastify.
        await onDeleteImage(imageUrlToDelete);
        toast.success('Image deleted successfully!');
      } catch (error) {
        console.error('Error deleting image:', error);
        toast.error('Failed to delete the image.');
      }
    }
  };

  if (imageUrls.length === 0) {
    // If imageUrls array is empty, show a placeholder or loading spinner
    return <div>Loading...</div>; // You can replace this with an appropriate loading component
  }

  return (
    <div ref={slideRef} className="w-full select-none relative bg-white">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={imageUrls[currentIndex]}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            maxWidth: '1500px',
            maxHeight: '600px',
          }}
        />
        {/* Overlay Content */}
        {/* End Overlay Content */}
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
        {/* Delete button */}
        <button
          className="bg-red-500 text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminCarousel;
