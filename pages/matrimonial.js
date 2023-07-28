/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';
import Spinner from "../components/Spinner";
import { useRouter } from 'next/router';

const Matrimonial = () => {
  const router = useRouter(); // Access the router
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('Bride'); // Add state for category

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, fetch data from the 'Users' collection
        const db = firebase.firestore();
        const usersRef = db.collection('Users');

        usersRef
          .get()
          .then((querySnapshot) => {
            const userData = [];
            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
            });

            // Filter the data based on the selected category
            const filteredUserData = category === 'All' ? userData : userData.filter((user) => user.category === category);

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
  }, [router, category]); // Add router and category as dependencies to useEffect

  // Function to handle showing all data
  const handleShowAll = () => {
    setCategory('All');
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-pink-900 text-3xl text-center font-semibold sm:text-4xl">
              Recent Events
            </h3>
          </div>
          <div className="flex items-center justify-center mt-5 mb-5">
            <div className="flex items-center p-1 border border-pink-600 dark:border-pink-400 rounded-xl">
              <button
                onClick={handleShowAll} // Call the function when "All" button is clicked
                className={`px-4 py-2 mx-4 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  category === 'All' ? 'text-white bg-pink-600' : 'text-pink-600 dark:text-pink-400 hover:text-white hover:bg-pink-600'
                } rounded-xl md:mx-8 md:px-12`}
              >
                All
              </button>
              <button
                onClick={() => setCategory('Bride')}
                className={`px-4 py-2 mx-4 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  category === 'Bride' ? 'text-white bg-pink-600' : 'text-pink-600 dark:text-pink-400 hover:text-white hover:bg-pink-600'
                } rounded-xl md:mx-8 md:px-12`}
              >
                Bride
              </button>
              <button
                onClick={() => setCategory('Bride Groom')}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 md:py-3 ${
                  category === 'Bride Groom' ? 'text-white bg-pink-600' : 'text-pink-600 dark:text-pink-400 hover:text-white hover:bg-pink-600'
                } rounded-xl md:px-12`}
              >
                Bride Groom
              </button>
            </div>
          </div>

          <div className="mt-12">
            <ul className="grid gap-8 lg:grid-cols-2">
              {isLoading ? (
                <Spinner />
              ) : (
                usersData.map((user, idx) => (
                  <li key={idx} className="gap-8 sm:flex">
                    <div className="w-80 h-80">
                      <img
                        src={user.profileImageURL || 'https://via.placeholder.com/150'}
                        className="w-full h-full object-cover object-center shadow-md rounded-xl"
                        alt=""
                      />
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <h4 className="text-lg text-gray-700 font-semibold">{user.firstName} {user.lastName}</h4>
                      <p className="text-indigo-600">{user.email} </p>
                      <p className="text-gray-600 mt-2">{user.phoneNumber}</p>
                      <div className="mt-3 flex gap-4 text-gray-400">
                        Date of Birth: {user.birthDate}/{user.birthMonth}/{user.birthYear}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Matrimonial;
