import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter to handle client-side navigation
import { firebase } from "../../Firebase/config";
const AdminHome = () => {
  const router = useRouter(); // Use useRouter hook
  const [isAdmin, setIsAdmin] = useState(false); // State variable to check if the user is an admin
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push('/admin/login');
    } else {
      setUsersData()
    }
  }, []);

 

  const handleLogout = async () => {
    // ... (rest of your logout logic)

    // Clear the isAdmin status from local storage on logout
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/admin/login');
  };


  
  useEffect(() => {
    // Call the function to check authentication status
   

    // Fetch data from the 'Users' collection
    const db = firebase.firestore();
    const usersRef = db.collection('Users');

    usersRef
      .get()
      .then((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setUsersData(userData);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);


  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
   <div className='bg-white'>
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
    
    </div>

  );
};

export default AdminHome;
