import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { firebase } from '../../Firebase/config';
import 'firebase/storage';
import Link from 'next/link';
import AdminNav from '../../components/AdminNav';

const AddJob = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

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

  // State variables for input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Create a Firebase Firestore document with the data
    const db = firebase.firestore();
    const jobRef = db.collection('jobs');

    const jobData = {
      title,
      description,
      salary,
    };

    try {
      // Add the data to Firestore
      await jobRef.add(jobData);
      toast.success('Your data submitted successfully!');
      // Reset the form after submission
      setTitle('');
      setDescription('');
      setSalary('');
    } catch (error) {
      toast.error('Error: Unable to submit data.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAdmin) {
    // If the user is not an admin, show a loading message or redirect them to the login page
    return <>Please Login then show Admin Panel ........</>;
  }

  return (
    <>
      <AdminNav/>
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
            Upload Events<span className="text-sm text-pink-900">form showcase</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-pink-900">
              {/* Input field for title */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Job Title"
                  />
                  <label
                    htmlFor="title"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Job Title
                  </label>
                </div>
              </div>
              {/* Input field for description */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Job Description"
                  />
                  <label
                    htmlFor="description"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Job Description
                  </label>
                </div>
              </div>
              {/* Input field for salary */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <input
                    type="text"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Salary"
                  />
                  <label
                    htmlFor="salary"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Salary
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-pink-900 text-white py-2 px-6 rounded-md hover:bg-pink-600"
                disabled={isUploading} // Disable the button during loading
              >
                {isUploading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AddJob;
