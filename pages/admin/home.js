/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter to handle client-side navigation
import { firebase } from "../../Firebase/config";
import AdminNav from '../../components/AdminNav';
const AdminHome = () => {
  const router = useRouter(); // Use useRouter hook
  const [isAdmin, setIsAdmin] = useState(false); // State variable to check if the user is an admin
  const [usersData, setUsersData] = useState([]);
  const [matrimonialData, setMatrimonialData] = useState([]);
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
  }, [router]);

 

 


  const [totalUsers, setTotalUsers] = useState(0);
const [totalGrooms, setTotalGrooms] = useState(0);
const [totalBrideGrooms, setTotalBrideGrooms] = useState(0);


  
  useEffect(() => {
    // Call the function to check authentication status
  
    // Fetch data from the 'Users' collection
    const db = firebase.firestore();
    const usersRef = db.collection('Users');
  
    usersRef
      .get()
      .then((querySnapshot) => {
        const userData = [];
        let totalUsers = 0;
        let totalGrooms = 0;
        let totalBrideGrooms = 0;
  
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          userData.push(user);
          totalUsers++;
  
          // Check the 'gender' field to determine the count of each gender
          if (user.gender === 'Bride') {
            totalGrooms++;
          } else if (user.gender === 'Bride Groom') {
            totalBrideGrooms++;
          }
        });
  
        setUsersData(userData);
        setIsLoading(false); // Set loading to false when data is fetched
  
        // Set the counts in the state
        setTotalUsers(totalUsers);
        setTotalGrooms(totalGrooms);
        setTotalBrideGrooms(totalBrideGrooms);
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);

  useEffect(() => {
    // Call the function to check authentication status
  
    // Fetch data from the 'Users' collection
    const db = firebase.firestore();
    const usersRef = db.collection('matrimonials');
  
    usersRef
      .get()
      .then((querySnapshot) => {
        const matrimonialData = [];
        let totalGrooms = 0;
        let totalBrideGrooms = 0;
  
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          matrimonialData.push(user);
  
          // Check the 'gender' field to determine the count of each gender
          if (user.gender === 'Male') {
            totalGrooms++;
          } else if (user.gender === 'Female') {
            totalBrideGrooms++;
          }
        });
  
        setMatrimonialData(matrimonialData);
        setIsLoading(false); // Set loading to false when data is fetched
  
        // Set the counts in the state
        setTotalGrooms(totalGrooms);
        setTotalBrideGrooms(totalBrideGrooms);
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
   <div className='m-auto min-h-screen bg-white dark:bg-white'>
  <AdminNav setIsAdmin={setIsAdmin} />

    <section className="p-4 my-6 md:p-8 bg-white text-red-300">
	<div className="container grid grid-cols-1 gap-1 px-48 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
		<div className="flex overflow-hidden rounded-lg bg-white text-red-300">
			<div className="flex items-center justify-center px-4 bg-red-300 text-white">
      <p className="text-2xl font-semibold">{totalUsers}</p>
			</div>
			<div className="flex items-center justify-between flex-1 p-3">
				
				<p>Total Users</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg dark:bg-red-300 dark:text-red-300">
			<div className="flex items-center justify-center px-4 bg-red-300 text-white">
      <p className="text-2xl font-semibold">{totalGrooms}</p>
			</div>
			<div className="flex items-center justify-between flex-1 p-3 ">
				<p>Total Groom</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg dark:bg-red-300 dark:text-red-300">
			<div className="flex items-center justify-center px-4 bg-red-300 text-white">
      <p className="text-2xl font-semibold">{totalBrideGrooms}</p>
			</div>
			<div className="flex items-center justify-between flex-1 p-3">
				
				<p>Total Bride </p>
			</div>
		</div>
	
	</div>
</section>

<div className="flex flex-col items-center justify-center gap-10">
  <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
    <Link href="/admin/manageusers">
      <button className="relative w-40 h-12 overflow-hidden border border-red-300 text-red-300 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-red-300 before:duration-300 before:ease-out hover:text-white hover:shadow-red-300 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
        <span className="relative z-10">Manage Users</span>
      </button>
    </Link>
    <Link href="/admin/managematrimonial">
      <button className="relative w-40 h-12 overflow-hidden border border-red-300 text-red-300 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-red-300 before:duration-300 before:ease-out hover:text-white hover:shadow-red-300 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
        <span className="relative z-10">Manage Matrimonial</span>
      </button>
    </Link>
    <Link href='/admin/managecarousel' >
      <button className="before:ease relative w-40 h-12 overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-red-300 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180">
        <span className="relative z-10">Manage Carousel</span>
      </button>
    </Link>
    <Link href='/admin/manageevents' >
      <button className="before:ease relative w-40 h-12 overflow-hidden border border-red-300 text-red-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-red-300 before:duration-300 hover:text-white hover:shadow-red-300 hover:before:h-64 hover:before:-translate-y-32">
        <span className="relative z-10">Manage Events</span>
      </button>
    </Link>
  </div>
</div>

    
    </div>

  );
};

export default AdminHome;
