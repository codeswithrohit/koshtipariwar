/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { firebase } from '../../Firebase/config';
import 'firebase/storage';
import Link from 'next/link';
import AdminNav from '../../components/AdminNav';


const AddPhotoGallery = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push('/admin/login');
    }
  }, [router]);
  

 

  // State variables for input fields
  const [events, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [singleImageUrl, setSingleImageUrl] = useState('');
  const [multipleImages, setMultipleImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle single image upload
  const handleSingleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a Firebase Storage reference and upload the single image
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${file.name}`);
    try {
      await imageRef.put(file);
      const imageUrl = await imageRef.getDownloadURL();
      setSingleImageUrl(imageUrl);
    } catch (error) {
      toast.error('Error: Unable to upload single image.');
    }
  };

  // Function to handle multiple image upload
  const handleMultipleImageChange = (e) => {
    const files = e.target.files;
    setMultipleImages(files);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Create an array to store the download URLs of uploaded images
    const imageUrls = [];

    // Create a Firebase Storage reference for each image and upload them
    const storageRef = firebase.storage().ref();
    for (const image of multipleImages) {
      const imageRef = storageRef.child(`images/${image.name}`);
      try {
        await imageRef.put(image);
        const imageUrl = await imageRef.getDownloadURL();
        imageUrls.push(imageUrl);
      } catch (error) {
        toast.error(`Error: Unable to upload image ${image.name}`);
      }
    }

    // Create a Firebase Firestore document with the data
    const db = firebase.firestore();
    const galleryRef = db.collection('photo_gallery');

    const galleryData = {
      events,
      singleImageUrl,
      imageUrls,
    };

    try {
      // Add the data to Firestore
      await galleryRef.add(galleryData);
      toast.success('Your data submitted successfully!');
      // Reset the form after submission
      setLocation('');
      setImage(null);
      setSingleImageUrl('');
      setMultipleImages([]);
    } catch (error) {
      toast.error('Error: Unable to submit data.');
    } finally {
      setIsUploading(false);
    }
  };
  if (!isAdmin) {
    // If the user is not an admin, show a loading message or redirect them to the login page
    return <>Please Login then show Admin Panel ........</>;
  }

  return (
    <>
   <AdminNav/>
    <div className="m-auto min-h-screen bg-white dark:bg-white w-full flex items-center justify-center ">

        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
            Upload Events<span className="text-sm text-pink-900">form showcase</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-pink-900">
              {/* Input field for events */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <input
                    type="text"
                    name="events"
                    value={events}
                    onChange={(e) => setLocation(e.target.value)}
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Events Title" />
                  <label
                    htmlFor="events"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Events Title
                  </label>
                </div>
              </div>
              {/* Input field for Single Image */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    onChange={handleSingleImageChange} />
                  <label
                    htmlFor="image"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Upload Single Image
                  </label>
                </div>
              </div>
              {/* Input field for Multiple Images */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <input
                    type="file"
                    name="multipleImages"
                    id="multipleImages"
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    onChange={handleMultipleImageChange}
                    multiple // Allow multiple image selection
                  />
                  <label
                    htmlFor="multipleImages"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Upload Multiple Images
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-pink-900 text-white py-2 px-6 rounded-md hover:bg-pink-600"
                disabled={isUploading} // Disable the button during loading
              >
                {isUploading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div></>
  );
};

export default AddPhotoGallery;
