import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebase } from '../../Firebase/config';
import 'firebase/storage';
import 'firebase/firestore';

const AddSlider = () => {
  const router = useRouter(); // Use useRouter hook
  const [isAdmin, setIsAdmin] = useState(false); // State variable to check if the user is an admin
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push('/admin/login');
    }
  }, []);
  

  const handleLogout = async () => {
    // ... (rest of your logout logic)

    // Clear the isAdmin status from local storage on logout
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/admin/login');
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to handle image upload
  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true); // Set uploading state to true

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(selectedFile.name);

      imageRef
        .put(selectedFile)
        .then(() => {
          // Get the download URL of the uploaded image
          imageRef.getDownloadURL().then((url) => {
            // Save the image URL in Firestore or perform any other actions with the URL
            const db = firebase.firestore();
            db.collection('sliderData')
              .add({
                imageUrl: url,
                // You can add more data related to the slider here
              })
              .then(() => {
                console.log('Slider data saved successfully!');
                toast.success('Your slider image has been uploaded successfully');
                setUploading(false); // Set uploading state to false
              })
              .catch((error) => {
                console.error('Error saving slider data: ', error);
                setUploading(false); // Set uploading state to false
              });
          });
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
          setUploading(false); // Set uploading state to false
        });
    }
  };
  if (!isAdmin) {
    // If the user is not an admin, show a loading message or redirect them to the login page
    return <>Please Login then show Admin Panel ........</>;
  }

  return (
    <>
   <header className="bg-white dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center p-6 mx-auto">
          <Link href="/" className="mx-auto ">
            <img class=" w-18 h-12 mx-auto rounded-lg"
              src="http://koshtipariwar.com/wp-content/uploads/koshti_logo3.jpg" alt="koshtipariwar" />
          </Link>

          <div className="flex items-center justify-center mt-6 text-gray-600 capitalize dark:text-gray-300">
            <Link href="/admin/addslider" className="mx-2 text-gray-800 border-b-2 border-blue-500 dark:text-gray-200 sm:mx-6">Add Slider Data</Link>

            <Link href="/admin/addphotogallery" className="mx-2 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 sm:mx-6">Add Photo Gallery</Link>

            <Link href="/admin/adminsignup" className="mx-2 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 sm:mx-6">Create Admin Account</Link>

            <Link href="/admin/addjob" className="mx-2 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 sm:mx-6">Add Job</Link>

            

            <button
              onClick={handleLogout}
              className="px-4 py-2 mt-4 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>


    </header>
      <div className="bg-white h-screen flex justify-center items-center">
        <fieldset className="w-full space-y-1 dark:text-gray-100">
          <div className="flex justify-center items-center">
            <label htmlFor="files" className="block text-sm font-medium mb-">
              Add Your Slider Data
            </label>
          </div>
          <div className="flex justify-center items-center">
            <input
              type="file"
              name="files"
              id="files"
              className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
              onChange={handleFileSelect}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleUpload}
              className="px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              disabled={uploading} // Disable the button during uploading
            >
              {uploading ? 'Uploading...' : 'Upload Image and Save Data'}
            </button>
          </div>
        </fieldset>
      </div>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default AddSlider;
