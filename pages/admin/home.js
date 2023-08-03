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
  }, []);

 

  const handleLogout = async () => {
    // ... (rest of your logout logic)

    // Clear the isAdmin status from local storage on logout
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/admin/login');
  };


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
  <AdminNav/>
    <section className="p-4 my-6 md:p-8 bg-white text-pink-900">
	<div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
		<div className="flex overflow-hidden rounded-lg bg-white text-pink-900">
			<div className="flex items-center justify-center px-4 bg-pink-900 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
					<path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
				</svg>
			</div>
			<div className="flex items-center justify-between flex-1 p-3">
				<p className="text-2xl font-semibold">{totalUsers}</p>
				<p>Total Users</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg dark:bg-pink-900 dark:text-pink-100">
			<div className="flex items-center justify-center px-4 bg-pink-900 text-white">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
					<path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
				</svg>
			</div>
			<div className="flex items-center justify-between flex-1 p-3">
				<p className="text-2xl font-semibold">{totalGrooms}</p>
				<p>Total Groom</p>
			</div>
		</div>
		<div className="flex overflow-hidden rounded-lg dark:bg-pink-900 dark:text-pink-100">
			<div className="flex items-center justify-center px-4 bg-pink-900 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
					<path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
				</svg>
			</div>
			<div className="flex items-center justify-between flex-1 p-3">
				<p className="text-2xl font-semibold">{totalBrideGrooms}</p>
				<p>Total Bride </p>
			</div>
		</div>
	
	</div>
</section>

<div className="flex flex-col items-center justify-center gap-10">
  <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
    <Link href="/admin/manageusers">
      <button className="relative w-40 h-12 overflow-hidden border border-pink-600 text-pink-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-pink-600 before:duration-300 before:ease-out hover:text-white hover:shadow-pink-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
        <span className="relative z-10">Manage Users</span>
      </button>
    </Link>
    <Link href="/admin/managematrimonial">
      <button className="relative w-40 h-12 overflow-hidden border border-pink-600 text-pink-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-pink-600 before:duration-300 before:ease-out hover:text-white hover:shadow-pink-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
        <span className="relative z-10">Manage Matrimonial</span>
      </button>
    </Link>
    <Link href='/admin/managecarousel' >
      <button className="before:ease relative w-40 h-12 overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-pink-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180">
        <span className="relative z-10">Manage Carousel</span>
      </button>
    </Link>
    <Link href='/admin/manageevents' >
      <button className="before:ease relative w-40 h-12 overflow-hidden border border-pink-500 text-pink-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-pink-500 before:duration-300 hover:text-white hover:shadow-pink-500 hover:before:h-64 hover:before:-translate-y-32">
        <span className="relative z-10">Manage Events</span>
      </button>
    </Link>
  </div>
</div>

    
    </div>

  );
};

export default AdminHome;
