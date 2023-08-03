import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';
import Spinner from "../components/Spinner";
import { useRouter } from 'next/router';

const Matrimonial = () => {
  const router = useRouter(); // Access the router
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState('All'); // Add state for gender

  // New state to manage pop-up visibility and selected user's data
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, fetch data from the 'matrimonials' collection
        const db = firebase.firestore();
        const usersRef = db.collection('matrimonials');

        usersRef
          .get()
          .then((querySnapshot) => {
            const userData = [];
            querySnapshot.forEach((doc) => {
              userData.push({ ...doc.data(), id: doc.id });
            });

            // Filter the data based on the selected gender
            const filteredUserData = gender === 'All' ? userData : userData.filter((user) => user.gender === gender);

            setUsersData(filteredUserData);
            setIsLoading(false); // Set loading to false when data is fetched
          })
          .catch((error) => {
            console.error('Error getting documents: ', error);
            setIsLoading(false); // Set loading to false even on error
          });
      } else {
        // User is not logged in, navigate to the login page
        router.push('/login');
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [router, gender]); // Add router and gender as dependencies to useEffect

  // Function to handle showing all data
  const handleShowAll = () => {
    setGender('All');
  };

  const handleShowBride = () => {
    setGender('Male');
  };

  const handleShowGroom = () => {
    setGender('Female');
  };

  // Function to handle showing more details
  const handleShowMoreDetails = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
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

  return (
    <div className="m-auto min-h-screen bg-white dark:bg-white">
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Our <span className="text-blue-500">Matrimonial</span></h1>

          <div className="flex items-center justify-center mt-5 mb-5">
            <div className="flex items-center p-1 border border-pink-600 dark:border-pink-400 rounded-xl">
              <button
                onClick={handleShowAll}
                className={`px-4 py-2 mx-4 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  gender === 'All' ? 'text-white bg-pink-600' : 'text-pink-600 dark:text-pink-400 hover:text-white hover:bg-pink-600'
                } rounded-xl md:mx-8 md:px-12`}
              >
                All
              </button>
              <button
                onClick={handleShowBride}
                className={`px-4 py-2 mx-4 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  gender === 'Bride' ? 'text-white bg-pink-600' : 'text-pink-600 dark:text-pink-400 hover:text-white hover:bg-pink-600'
                } rounded-xl md:mx-8 md:px-12`}
              >
                Bride
              </button>
              <button
                onClick={handleShowGroom}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  gender === 'Groom' ? 'text-white bg-pink-600' : 'text-pink-600 dark:text-pink-400 hover:text-white hover:bg-pink-600'
                } rounded-xl md:px-12`}
              >
                Groom
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              <Spinner />
            ) : (
              usersData.map((user, idx) => (
                <div key={idx} className="px-6 py-4 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-pink-900 dark:border-gray-700 dark:hover:border-transparent">
                  <div className="flex flex-col sm:-mx-4 sm:flex-row">
                    <img
                      className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
                      src={Array.isArray(user.photos) && user.photos.length > 0 ? user.photos[0] : "https://via.placeholder.com/150"}
                      alt="First Photo"
                    />

                    <div className="mt-4 sm:mx-4 sm:mt-0">
                      <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">{user.name}</h1>
                      <p className=" text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{user.occupation}</p>
                      <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{user.birthplace}</p>
                      {/* Add more details here */}
      
                    </div>
                  </div>
                  <p class="mt-4 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{user.aboutMe}</p>
                  <button className="mt-4 ml-40 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700" onClick={() => handleShowMoreDetails(user)}>More Details</button>
                  {/* ... */}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Render pop-up if showPopup is true */}
      {showPopup && selectedUser && (
  <div className="fixed overflow-y-auto inset-0 flex items-center justify-center bg-black bg-white mt-24 mb:mt-48  ">
    <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 grid grid-cols-2 gap-2">
      {selectedUser.photos.map((photo, index) => (
        <div key={index} className="w-full">
          <img
            className="object-cover w-full h-48 md:h-48 lg:h-48 xl:h-48 rounded-lg cursor-pointer"
            src={photo || "https://via.placeholder.com/150"}
            alt={`${selectedUser.name} - Photo ${index + 1}`}
            onClick={() => handleImageClick(photo)}
          />
        </div>
      ))}
    </div>
    {showFullImage && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 mt-24">
        <div className="max-w-screen-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <img
            className="object-contain w-full h-96 overflow-y-auto rounded-lg"
            src={selectedImage || "https://via.placeholder.com/150"}
            alt={`${selectedUser.name} - Full Image`}
          />
          <button
            className="block mx-auto mt-4 px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md"
            onClick={() => setShowFullImage(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}







        <div className="md:w-1/2 md:ml-6">
          <h1 className="text-3xl font-semibold text-gray-700 capitalize mb-2">{selectedUser.name}</h1>
          <p className="text-gray-500 capitalize mb-4">Education: {selectedUser.education}</p>

          <div className="flex flex-wrap">
  <div className="w-full md:w-1/2">
    <h2 className="text-lg font-semibold text-gray-700 capitalize">Parent's Name</h2>
    <p className="text-gray-500 mb-4">{selectedUser.parentName}</p>
    <h2 className="text-lg font-semibold text-gray-700 capitalize">Parent's Address</h2>
    <p className="text-gray-500 mb-4">{selectedUser.parentAddress}</p>
  </div>
</div>



          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">My Address</h2>
              <p className="text-gray-500 mb-4">{selectedUser.yourAddress}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Contact Number</h2>
              <p className="text-gray-500 mb-4">{selectedUser.mobileNumber}</p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Email'Id</h2>
              <p className="text-gray-500 mb-4">{selectedUser.email}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Birth Date</h2>
              <p className="text-gray-500 mb-4">{selectedUser.dob}</p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Height</h2>
              <p className="text-gray-500 mb-4">{selectedUser.height}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Monthly Income</h2>
              <p className="text-gray-500 mb-4">{selectedUser.monthlyIncome}</p>
            </div>
          </div>
          

          {/* Add more details here */}

          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md mr-2"
              onClick={handleClosePopup}
            >
              Close
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
)}







    </div>
  );
};

export default Matrimonial;
