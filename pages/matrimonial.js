/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/router';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Matrimonial = () => {
  const router = useRouter(); // Access the router
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState('All');
const [age, setAge] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleShowAll = () => {
    setGender('All');
    setAge('All');
    setCurrentPage(1);
  };
  
  const handleShowBride = () => {
    setGender('Female');
    setAge('All');
    setCurrentPage(1);
  };
  
  const handleShowGroom = () => {
    setGender('Male');
    setAge('All');
    setCurrentPage(1);
  };
  
  const handleShowAllAge = () => {
    setAge('All');
    setCurrentPage(1);
  };
  
  const handleShowAge = (ageRange) => {
    setAge(ageRange);
    setCurrentPage(1);
  };
  

  // New state to manage pop-up visibility and selected user's data
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);



 



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
  
            const filteredUserData = userData.filter((user) => {
              const userAge = calculateAgeWithMonths(user.dob);
  
              if (gender === 'All' || (gender === 'Female' && user.gender === 'Female') || (gender === 'Male' && user.gender === 'Male')) {
                if (age === 'All') {
                  return true;
                } else if (age === '0-25' && userAge <= '25 years 0 months') {
                  return true;
                } else if (age === '25-30' && userAge > '25 years 0 months' && userAge <= '30 years 0 months') {
                  return true;
                } else if (age === '30-35' && userAge > '30 years 0 months' && userAge <= '35 years 0 months') {
                  return true;
                } else if (age === '35 Years & Above' && userAge > '35 years 0 months') {
                  return true;
                }
              }
  
              return false;
            });
  
            setUsersData(filteredUserData);
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
  }, [router, gender, age]);
  

 
  

 

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = usersData.slice(startIndex, endIndex);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(usersData.length / itemsPerPage);
  function calculateAgeWithMonths(dob) {
    const birthDate = new Date(dob);
    const currentDate = new Date();
  
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
  
    if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
  
    return `${years} years ${months} months`;
  }
  
  

  return (
    <div className="m-auto min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
             <span className="text-red-300">Our Matrimonial</span>
          </h1>

          <div className="flex items-center justify-center mt-5 mb-8">
            <div className="flex items-center p-1 border border-red-300 dark:border-red-300 rounded-xl">
              <button
                onClick={handleShowAll}
                className={`px-4 py-2 mx-4 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  gender === 'All' ? 'text-white bg-red-300' : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
                } rounded-xl md:mx-8 md:px-12`}
              >
                All
              </button>
              <button
                onClick={handleShowBride}
                className={`px-4 py-2 mx-4 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  gender === 'Female'
                    ? 'text-white bg-red-300'
                    : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
                } rounded-xl md:mx-8 md:px-12`}
              >
                Bride
              </button>
              <button
                onClick={handleShowGroom}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  gender === 'Male'
                    ? 'text-white bg-red-300'
                    : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
                } rounded-xl md:px-12`}
              >
                Groom
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center mt-5 mb-8">
  <div className="flex flex-row md:flex-row p-1 border border-red-300 dark:border-red-300 rounded-xl">
  <button
              onClick={handleShowAllAge}
              className={`px-3 py-1 mx-2 my-1 text-xs md:text-sm font-medium capitalize transition-colors duration-300 ${
                age === 'All' ? 'text-white bg-red-300' : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
              } rounded-xl md:mx-1 md:my-0 md:px-4 md:py-2`}
            >
              All
            </button>
            <button
              onClick={() => handleShowAge('0-25')}
              className={`px-3 py-1 mx-2 my-1 text-xs md:text-sm font-medium capitalize transition-colors duration-300 ${
                age === '0-25'
                  ? 'text-white bg-red-300'
                  : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
              } rounded-xl md:mx-1 md:my-0 md:px-4 md:py-2`}
            >
              0-25 Years
            </button>
            <button
              onClick={() => handleShowAge('25-30')}
              className={`px-3 py-1 mx-2 my-1 text-xs md:text-sm font-medium capitalize transition-colors duration-300 ${
                age === '25-30'
                  ? 'text-white bg-red-300'
                  : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
              } rounded-xl md:mx-1 md:my-0 md:px-4 md:py-2`}
            >
              25-30 Years
            </button>
            <button
              onClick={() => handleShowAge('30-35')}
              className={`px-3 py-1 mx-2 my-1 text-xs md:text-sm font-medium capitalize transition-colors duration-300 ${
                age === '30-35'
                  ? 'text-white bg-red-300'
                  : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
              } rounded-xl md:mx-1 md:my-0 md:px-4 md:py-2`}
            >
              30-35 Years
            </button>
            <button
              onClick={() => handleShowAge('35 Years & Above')}
              className={`px-3 py-1 mx-2 my-1 text-xs md:text-sm font-medium capitalize transition-colors duration-300 ${
                age === '35 Years & Above'
                  ? 'text-white bg-red-300'
                  : 'text-red-300 dark:text-red-300 hover:text-white hover:bg-red-300'
              } rounded-xl md:mx-1 md:my-0 md:px-4 md:py-2`}
            >
              35 Years & Above
            </button>
  </div>
</div>


<div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
  {isLoading ? (
    <Spinner /> // Show loading spinner while data is loading
  ) : usersData.length === 0 ? (
    <p className="text-center text-gray-600 ml-50">No Matrimonial found.</p> // Centered empty state message
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
            {/* Add more details here */}
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
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 capitalize group-hover:text-white">
              Age
            </h2>
            {user.dob && (
    <p className="text-gray-500 mb-4 group-hover:text-gray-300">
      {calculateAgeWithMonths(user.dob)}
    </p>
  )}
          </div>
        
        </div>
        <button
          className="mt-4 ml-40 px-4 py-2 text-sm font-medium text-white  bg-red-300 group-hover:text-red-300  group-hover:bg-white rounded-md "
          onClick={() => handleShowMoreDetails(user)}
        >
          More Details
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
  <div className="fixed overflow-y-auto inset-0 flex items-center justify-center bg-black bg-white   ">
    <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg mt-96 ">
      <div className="flex flex-col md:flex-row ">
      <div className="md:w-1/2 grid grid-cols-2 gap-2 ">
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
            className="block mx-auto mt-4 px-4 py-2 text-sm font-medium text-white bg-red-300 rounded-md"
            onClick={() => setShowFullImage(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}







        <div className="md:w-1/2 md:ml-6">
          <h1 className="text-3xl font-semibold text-gray-700 capitalize mt-2">{selectedUser.name}</h1>
          <p className="text-gray-500 capitalize mb-4">Education: {selectedUser.education}</p>
          <p className="mt-2 mb-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300 font-semibold text-sm">{selectedUser.aboutMe}</p>
          <div className="flex flex-wrap">
 
</div>

<div className="flex flex-row space-x-4">
  <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">Parent Name</h2>
            <p className="text-gray-500 mb-4">{selectedUser.parentName}</p>
            </div>
            <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">Parent Address</h2>
            <p className="text-gray-500 mb-4">{selectedUser.parentAddress}</p>
            </div>
          </div>



          <div className="flex flex-row space-x-4">
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">My Address</h2>
              <p className="text-gray-500 mb-4">{selectedUser.yourAddress}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Contact Number</h2>
              <p className="text-gray-500 mb-4">{selectedUser.mobileNumber}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
          <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Email</h2>
              <p className="text-gray-500 mb-4">{selectedUser.email}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Age</h2>
              {selectedUser.dob && (
    <p className="text-gray-500 mb-4 group-hover:text-gray-300">
      {calculateAgeWithMonths(selectedUser.dob)}
    </p>
  )}
            </div>
            </div>
          <div className="flex flex-row space-x-4">
            
            <div className="w-full md:w-1/2">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">Birth Date</h2>
              <p className="text-gray-500 mb-4">{selectedUser.dob}</p>
            </div>
            <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 capitalize group-hover:text-white">
              Birth Time
            </h2>
            <p className="text-gray-500 mb-4 group-hover:text-gray-300">
              {selectedUser.birthtime}
            </p>
          </div>
          </div>
          <div className="flex flex-row space-x-4">
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
              className="px-4 py-2 text-sm font-medium text-white bg-red-300 rounded-md mr-2"
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
