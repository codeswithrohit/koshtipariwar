import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter to handle client-side navigation
import { firebase } from '../../Firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '../../components/AdminNav';

const ManageEvents = () => {
  const router = useRouter(); // Use useRouter hook
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push('/admin/login');
    } else {
      setPhotoData();
    }
  }, []);

  const handleLogout = async () => {
    // ... (rest of your logout logic)

    // Clear the isAdmin status from local storage on logout
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/admin/login');
  };

  const [photoData, setPhotoData] = useState([]);

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

  const deleteImageFromFirebase = async (photoId) => {
    try {
      // Implement your delete logic here for Firebase
      // For example, you can delete the image from storage and remove the corresponding document from the Firestore collection.
      // Replace the following with your actual Firebase delete logic.
      const db = firebase.firestore();
      await db.collection('photo_gallery').doc(photoId).delete();

      // After successful delete, update the state to remove the deleted item
      setPhotoData((prevPhotoData) =>
        prevPhotoData.filter((data) => data.id !== photoId)
      );

      return true;
    } catch (error) {
      console.error('Error deleting image from Firebase:', error);
      return false;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="m-auto min-h-screen bg-white dark:bg-white">
      <AdminNav/>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          {/* ... (rest of the section code) ... */}
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-3">
            {photoData.map((data) => (
              <div key={data.id} className="relative">
                <Link href={`/gallerydetails?id=${data.id}`}>
                  <div
                    className="flex items-end overflow-hidden bg-cover rounded-lg h-96 cursor-pointer"
                    style={{
                      backgroundImage: `url('${data.singleImageUrl}')`,
                    }}
                  >
                    <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60">
                      <h2 className="mt-4 text-xl font-semibold text-pink-900 capitalize dark:text-white">
                        {data.events}
                      </h2>
                    </div>
                  </div>
                </Link>
                {/* Delete button */}
                <button
                  onClick={() => {
                    const confirmed = window.confirm('Are you sure you want to delete this image?');
                    if (confirmed) {
                      deleteImageFromFirebase(data.id)
                        .then((success) => {
                          if (success) {
                            toast.success('Data deleted successfully!');
                          } else {
                            toast.error('Error deleting data!');
                          }
                        })
                        .catch((error) => {
                          console.error('Error deleting data:', error);
                          toast.error('Error deleting data!');
                        });
                    }
                  }}
                  className="absolute top-2 right-2 px-2 py-1 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ManageEvents;
