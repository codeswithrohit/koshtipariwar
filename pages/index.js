/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from 'next/link';
import { firebase } from "../Firebase/config";
import Spinner from "../components/Spinner"; // Import a loading spinner component

import Carousel from "../components/Carousel";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [imageUrls, setImageUrls] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  useEffect(() => {
    // Fetch the image data from Firebase and update the state
    const fetchImageData = async () => {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection("sliderData").get();
        const imageUrls = snapshot.docs.map((doc) => doc.data().imageUrl);
        setImageUrls(imageUrls);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImageData();
  }, []);

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

 

  // Render the loading spinner if isLoading is true
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="m-auto min-h-screen bg-white dark:bg-white">
      <Head>
        <title>Koshti Pariwar</title>
        <meta name="Koshti Pariwar" content="Dizi Global Solution" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Carousel imageUrls={imageUrls} />
      <section className="bg-white">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-red-300 00 capitalize lg:text-3xl dark:text-white py-5">
              Recent Events
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-2 lg:grid-cols-3 px-5">
            {photoData.map((data) => (
              <Link key={data.id} href={`/gallerydetails?id=${data.id}`}>
              <div >
                <img
                  className="relative z-10 object-cover w-full rounded-md h-96"
                  src={data.singleImageUrl} // Use the image URL from the fetched data
                  alt=""
                />

<div

  className="relative z-20 max-w-lg p-6 mx-auto -mt-20 rounded-md shadow bg-red-300"
>
  <p
    className="font-semibold text-gray-800 hover:underline text-white text-center md:text-xl"
  >
    {data.events} {/* Use the heading from the fetched data */}
  </p>
</div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


   
  </div>
  );
};

export default Index;

