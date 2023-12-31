import React, { useEffect, useState } from 'react';
import { firebase } from '../../Firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  }, [router]);

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

  // Function to handle deletion
  const handleDeleteMatrimonial = (id) => {
    const db = firebase.firestore();
    const matrimonialsRef = db.collection('matrimonials');

    matrimonialsRef
      .doc(id)
      .delete()
      .then(() => {
        // After successful deletion, update the state to remove the deleted matrimonial
        setMatrimonialsData((prevData) => prevData.filter((matrimonial) => matrimonial.id !== id));
        toast.success('Matrimonial deleted successfully!', { position: 'top-center' });
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
        toast.error('An error occurred while deleting the matrimonial.', { position: 'top-center' });
      });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div>
      <AdminNav />
      <section className="bg-white dark:bg-white min-h-screen">
        <div className="container px-6 py-8 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Our Matrimonial</h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {matrimonialsData.map((matrimonial) => (
              <div className="w-full max-w-xs text-center" key={matrimonial.id}>
                <img
                  className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                  src={Array.isArray(matrimonial.photos) && matrimonial.photos.length > 0 ? matrimonial.photos[0] : "https://via.placeholder.com/150"}
                  alt="avatar"
                />
                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{matrimonial.name}</h3>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{matrimonial.email}</h3>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{matrimonial.gender}</h3>
                </div>
                <button
                  className="mt-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md"
                  onClick={() => handleDeleteMatrimonial(matrimonial.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Managematrimonial;
