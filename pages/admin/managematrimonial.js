import React, { useEffect, useState } from 'react';
import { firebase } from '../../Firebase/config';
import AdminNav from '@/components/AdminNav';
import { useRouter } from 'next/router';

const Managematrimonial = () => {
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
      setMatrimonialsData();
    }
  }, []);

  const [matrimonialsData, setMatrimonialsData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const matrimonialsRef = db.collection('matrimonials');

    matrimonialsRef
      .get()
      .then((querySnapshot) => {
        const matrimonialsData = [];
        querySnapshot.forEach((doc) => {
          matrimonialsData.push({ id: doc.id, ...doc.data() });
        });
        setMatrimonialsData(matrimonialsData);
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
    <div>
      <AdminNav />
      <section className="bg-white dark:bg-white min-h-screen">
        <div className="container px-6 py-8 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Our Team</h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {matrimonialsData.map((matrimonial) => (
              <div className="w-full max-w-xs text-center" key={matrimonial.id}>
                <img
                  className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                  src={matrimonial.photo || 'https://via.placeholder.com/150'}
                  alt="avatar"
                />

                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{matrimonial.MatrimonialName}</h3>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{matrimonial.emailAddress}</h3>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{matrimonial.category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Managematrimonial;
