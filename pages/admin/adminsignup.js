import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'firebase/storage';
import 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '../../Firebase/config';

const AdminSignup = () => {
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        firebase.auth(),
        email,
        password
      );

      // Access user object from userCredential
      const user = userCredential.user;

      // Store additional user data in Firestore
      if (user) {
        // Set isAdmin to true for admin users during account creation
        await firebase.firestore().collection('Adminusers').doc(email).set({
          name: name,
          email: email,
          isAdmin: true, // Set the admin flag
        });

        toast.success('Account created successfully!');
        // Redirect to the home page after successful registration
        // Replace '/admin/home' with your desired home page route
        window.location.replace('/admin/home');
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (!isAdmin) {
    // If the user is not an admin, show a loading message or redirect them to the login page
    return <>Please Login then show Admin Panel ........</>;
  }

  return (
    <>
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
    <main className="w-full h-screen flex flex-col items-center justify-center bg-white sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
          <div className="text-center">
            <Link href="/admin/home" className="mx-auto ">
              <img
                className="w-18 h-12 mx-auto rounded-lg"
                src="http://koshtipariwar.com/wp-content/uploads/koshti_logo3.jpg"
                alt="koshtipariwar" />
            </Link>
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Create an account
              </h3>
              <p className="">
                Already have an account?{' '}
                <Link href="/admin/login">
                  <div className="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                  </div>
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </form>
          </div>
        </div>
        {/* Show toast messages */}
        <ToastContainer />
      </main></>
  );
};

export default AdminSignup;
