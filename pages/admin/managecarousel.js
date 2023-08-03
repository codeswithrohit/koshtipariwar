/* eslint-disable @next/next/no-img-element */
import AdminCarousel from '../../components/AdminCarousel';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter to handle client-side navigation
import { firebase } from '../../Firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '../../components/AdminNav';

const ManageCarousel = () => {
  const router = useRouter(); // Use useRouter hook
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push('/admin/login');
    } else {
      fetchImageData();
    }
  }, [router]);

  const fetchImageData = async () => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('sliderData').get();
      const imageUrls = snapshot.docs.map((doc) => doc.data().imageUrl);
      setImageUrls(imageUrls);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching image data:', error);
      setIsLoading(false);
    }
  };

 

  const deleteImageFromFirebase = async (imageUrlToDelete) => {
    try {
      // Implement your delete logic here for Firebase
      // For example, you can delete the image from storage and remove the corresponding document from the Firestore collection.
      // Replace the following with your actual Firebase delete logic.
      const db = firebase.firestore();
      const snapshot = await db
        .collection('sliderData')
        .where('imageUrl', '==', imageUrlToDelete)
        .get();
      snapshot.forEach((doc) => doc.ref.delete());

      // After successful delete, update the state to reflect the change
      setImageUrls((prevImageUrls) =>
        prevImageUrls.filter((url) => url !== imageUrlToDelete)
      );

      // Show success toast message
      toast.success('Image deleted successfully!');

      return true;
    } catch (error) {
      console.error('Error deleting image from Firebase:', error);
      // Show error toast message
      toast.error('Failed to delete the image.');
      return false;
    }
  };

  if (!isAdmin) {
    // If the user is not an admin, show a loading message or redirect them to the login page
    return <>Please Login then show Admin Panel ........</>;
  }

  return (
    <div className="m-auto min-h-screen bg-white dark:bg-white">
      <AdminNav/>
      {isLoading ? (
        <div>Loading...</div>
      ) : imageUrls.length === 0 ? (
        <div>No images available.</div>
      ) : (
        <AdminCarousel imageUrls={imageUrls} onDeleteImage={deleteImageFromFirebase} />
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageCarousel;
