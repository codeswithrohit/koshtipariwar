/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';
import Spinner from "../components/Spinner"; 

const Photogallery = () => {
  const [photoData, setPhotoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the "photo_gallery" collection in Firestore
    const db = firebase.firestore();
    const galleryRef = db.collection('photo_gallery');
    galleryRef.get().then((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPhotoData(data);
      setIsLoading(false); // Set loading to false when data is fetched
    });
  }, []);

  return (
    <div className='m-auto min-h-screen bg-white dark:bg-white'>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-orange-700 capitalize lg:text-3xl dark:text-white">
            Program Photo
          </h1>

          {isLoading ? (
            <Spinner /> // Show the spinner while loading data
          ) : (
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-3">
              {photoData.map((data) => (
                <Link key={data.id} href={`/gallerydetails?id=${data.id}`}>
                  <div
                    className="flex items-end overflow-hidden bg-cover rounded-lg h-96 cursor-pointer"
                    style={{
                      backgroundImage: `url('${data.singleImageUrl}')`,
                    }}
                  >
                    <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                      <h2 className="mt-4 text-2xl font-semibold text-orange-700 capitalize dark:text-white">
                        {data.events}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Photogallery;
