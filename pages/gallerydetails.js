/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { firebase } from '../Firebase/config';
import Spinner from "../components/Spinner"; 

const Gallerydetails = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch data from the "photo_gallery" collection in Firestore based on the id from the URL query
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const db = firebase.firestore();
    const galleryRef = db.collection('photo_gallery').doc(id);

    galleryRef.get().then((doc) => {
      if (doc.exists) {
        setGalleryData(doc.data());
      } else {
        console.log('Document not found!');
      }
      setIsLoading(false); // Set loading to false when data is fetched
    });
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className='m-auto min-h-screen bg-white'>
      <section className="py-6 dark:bg-gray-800 dark:text-gray-50">
        {isLoading ? (
          <Spinner /> // Show the spinner while loading data
        ) : (
          <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
            {selectedImage && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
                <img
                  src={selectedImage}
                  alt=""
                  className="max-h-[90%] max-w-[90%] object-contain"
                />
                <button
                  className="absolute top-0 right-0 p-4 text-white"
                  onClick={handleImageClose}
                >
                  Close
                </button>
              </div>
            )}
            <img
              src={galleryData.singleImageUrl}
              alt=""
              className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square cursor-pointer"
              onClick={() => handleImageClick(galleryData.singleImageUrl)}
            />
            {galleryData.imageUrls &&
              galleryData.imageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  alt=""
                  className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square cursor-pointer"
                  src={imageUrl}
                  onClick={() => handleImageClick(imageUrl)}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Gallerydetails;
