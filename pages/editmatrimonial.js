/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect,useRef } from 'react';
import { firebase } from '../Firebase/config';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/router';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditMatrimonial = () => {
  const router = useRouter(); // Access the router
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [user, setUser] = useState(null);
  useEffect(() => {
    // Function to check if the user is logged in
    const checkUserLoggedIn = () => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          // If the user is not logged in, redirect to the login page
          router.push('/login');
        } else {
          setUser(user.uid); // Set the user object to state
        }
      });

      // Unsubscribe from the onAuthStateChanged listener when the component unmounts
      return () => unsubscribe();
    };

    // Call the checkUserLoggedIn function when the component mounts
    checkUserLoggedIn();
  }, [router]);



  // New state to manage pop-up visibility and selected user's data
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.firestore();
        const usersRef = db.collection('matrimonials');

        usersRef
          .get()
          .then((querySnapshot) => {
            const userData = [];
            querySnapshot.forEach((doc) => {
              userData.push({ ...doc.data(), id: doc.id });
            });

            const filteredData = userData.filter(item => item.uid === user.uid);

            setUsersData(filteredData);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error getting documents: ', error);
            setIsLoading(false);
          });
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

 

  // Function to handle showing E details
  const handleEditDetails = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowPopup(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const fileInputRefs = useRef([]);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = firebase.storage().ref(`matrimonialImages/${file.name}`);
        const snapshot = await storageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        const updatedPhotos = [...editedUser.photos, downloadURL];
        setEditedUser({ ...editedUser, photos: updatedPhotos });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleImageDelete = (index) => {
    const updatedPhotos = editedUser.photos.filter((_, i) => i !== index);
    setEditedUser({ ...editedUser, photos: updatedPhotos });
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editedUser) {
        const db = firebase.firestore();
        const userRef = db.collection('matrimonials').doc(editedUser.id);
        await userRef.update({
          name: editedUser.name,
          parentName: editedUser.parentName,
          mobileNumber: editedUser.mobileNumber,
          parentAddress: editedUser.parentAddress,
          yourAddress: editedUser.yourAddress,
          dob: editedUser.dob,
          birthplace: editedUser.birthplace,
          birthtime:editedUser.birthtime,
          height: editedUser.height,
          education: editedUser.education,
          occupation: editedUser.occupation,
          monthlyIncome: editedUser.monthlyIncome,
          aboutMe: editedUser.aboutMe,
          email: editedUser.email,
          gender: editedUser.gender,
          photos: editedUser.photos, // Update photos array
        });
        setShowPopup(false);
        setEditedUser(null);
        toast.success('Changes saved successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
        router.reload();
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('An error occurred while saving changes.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  // Function to handle closing the pop-up
  const handleClosePopup = () => {
    setSelectedUser(null);
    setShowPopup(false);
  };

  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowFullImage(true);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = usersData.slice(startIndex, endIndex);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  return (
    <div className="m-auto min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
             <span className="text-red-300">Our Matrimonial Profile</span>
          </h1>

         

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
  {isLoading ? (
    <Spinner />
  ) : (
    usersData.map((user, idx) => (
      <div
        key={idx}
        className="px-6 py-4 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-red-300 dark:border-gray-700 dark:hover:border-transparent"
      >
        <div className="flex flex-col sm:-mx-4 sm:flex-row">
          <img
            className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
            src={
              Array.isArray(user.photos) && user.photos.length > 0
                ? user.photos[0]
                : "https://via.placeholder.com/150"
            }
            alt="First Photo"
          />

          <div className="mt-4 sm:mx-4 sm:mt-0">
            <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">
              {user.name}
            </h1>
            <p className="text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
              {user.occupation}
            </p>
            <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
              {user.birthplace}
            </p>
            {/* Add E details here */}
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 capitalize group-hover:text-white">
              Parent Name
            </h2>
            <p className="text-gray-500 mb-4 group-hover:text-gray-300">
              {user.parentName}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 capitalize group-hover:text-white">
              Contact Number
            </h2>
            <p className="text-gray-500 mb-4 group-hover:text-gray-300">
              {user.mobileNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 capitalize group-hover:text-white">
              Birth Date
            </h2>
            <p className="text-gray-500 mb-4 group-hover:text-gray-300">
              {user.dob}
            </p>
          </div>
        
        </div>
        <button
          className="mt-4 ml-40 px-4 py-2 text-sm font-medium text-white  bg-red-300 group-hover:text-red-300  group-hover:bg-white rounded-md "
          onClick={() => handleEditDetails(user)}
        >
          Edit Details
        </button>
        </div>
              ))
            )}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {/* Back Button */}
              <button
                onClick={() => handlePaginationClick(currentPage - 1)}
                className={`px-4 py-2 text-sm text-white font-medium bg-red-300 rounded-md ${
                  currentPage === 1 ? 'bg-red-400 cursor-not-allowed' : ''
                }`}
                disabled={currentPage === 1}
              >
                <FiChevronLeft className="inline-block mr-1" /> Previous
              </button>

              {/* Page Buttons */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePaginationClick(index + 1)}
                  className={`px-4 py-2 text-sm text-white font-medium bg-red-300 rounded-md ${
                    currentPage === index + 1 ? 'bg-red-400' : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePaginationClick(currentPage + 1)}
                className={`px-4 py-2 text-sm text-white font-medium bg-red-300 rounded-md ${
                  currentPage === totalPages ? 'bg-red-400 cursor-not-allowed' : ''
                }`}
                disabled={currentPage === totalPages}
              >
                Next <FiChevronRight className="inline-block ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Render pop-up if showPopup is true */}
      {showPopup && selectedUser && (
        <div className="fixed overflow-y-auto inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg mt-80">
          <div className="md:w-1/2 grid grid-cols-2 gap-2">
              {editedUser.photos.map((photo, index) => (
                <div key={index} className="w-full">
                  <img
                    className="object-cover w-full h-48 md:h-48 lg:h-48 xl:h-48 rounded-lg cursor-pointer"
                    src={photo}
                    alt={`Photo ${index + 1}`}
                  />
                  <div className="mt-2 flex items-center space-x-2">
                    <button
                      className="px-2 py-1 text-xs text-white bg-red-300 rounded-md"
                      onClick={() => handleImageDelete(index)}
                    >
                      Delete
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => (fileInputRefs.current[index] = el)} // Create a ref for the input element
                      onChange={handleImageUpload}
                    />
                    <button
                      className="px-2 py-1 text-xs text-white bg-green-300 rounded-md"
                      onClick={() => fileInputRefs.current[index].click()} // Access the input element using the ref
                    >
                      Upload
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                    Education
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={editedUser.education}
                    onChange={(e) => setEditedUser({ ...editedUser, education: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* Add more fields here for editing */}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="aboutme" className="block text-sm font-medium text-gray-700">
                    About Me
                  </label>
                  <textarea
                    id="aboutme"
                    name="aboutme"
                    value={editedUser.aboutMe}
                    onChange={(e) => setEditedUser({ ...editedUser, aboutMe: e.target.value })}
                    className="mt-1 h-32 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="monthlyincome" className="block text-sm font-medium text-gray-700">
                    Monthly Income
                  </label>
                  <input
                    type="text"
                    id="monthlyincome"
                    name="monthlyincome"
                    value={editedUser.monthlyIncome}
                    onChange={(e) => setEditedUser({ ...editedUser, monthlyIncome: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* Add more fields here for editing */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="parentname" className="block text-sm font-medium text-gray-700">
                    Parent Name
                  </label>
                  <input
                    type="text"
                    id="parentname"
                    name="parentname"
                    value={editedUser.parentName}
                    onChange={(e) => setEditedUser({ ...editedUser, parentName: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="parentaddress" className="block text-sm font-medium text-gray-700">
                    Parent Address
                  </label>
                  <input
                    type="text"
                    id="parentaddress"
                    name="parentaddress"
                    value={editedUser.parentAddress}
                    onChange={(e) => setEditedUser({ ...editedUser, parentAddress: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* Add more fields here for editing */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="myaddress" className="block text-sm font-medium text-gray-700">
                    My Address
                  </label>
                  <input
                    type="text"
                    id="myaddress"
                    name="myaddress"
                    value={editedUser.yourAddress}
                    onChange={(e) => setEditedUser({ ...editedUser, yourAddress: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="mobilenumber" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="mobilenumber"
                    name="mobilenumber"
                    value={editedUser.mobileNumber}
                    onChange={(e) => setEditedUser({ ...editedUser, mobileNumber: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* Add more fields here for editing */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Birth Date
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={editedUser.dob}
                    onChange={(e) => setEditedUser({ ...editedUser, dob: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* Add more fields here for editing */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="birthtime" className="block text-sm font-medium text-gray-700">
                    Birth Time
                  </label>
                  <input
                    type="text"
                    id="birthtime"
                    name="birthtime"
                    value={editedUser.birthtime}
                    onChange={(e) => setEditedUser({ ...editedUser, birthtime: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height
                  </label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={editedUser.height}
                    onChange={(e) => setEditedUser({ ...editedUser, height: e.target.value })}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* Add more fields here for editing */}
              </div>
              
              
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-300 rounded-md mr-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}




<ToastContainer />


    </div>
  );
};

export default EditMatrimonial;
