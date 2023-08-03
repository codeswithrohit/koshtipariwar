/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '../Firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { email, password } = formData;

      // Sign in with email and password
      await signInWithEmailAndPassword(firebase.auth(), email, password);

      // Show success toast notification
      toast.success('Login successful.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      
      router.push('/')
      // Redirect to dashboard or other authenticated page
      // You can use React Router or other methods to handle the redirection

      setLoading(false); // Set loading to false after successful login
    } catch (error) {
      // Show error toast notification
      toast.error('Error signing in: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false); // Set loading to false after encountering an error
    }
  };

  return (
    <div className='m-auto min-h-screen bg-white dark:bg-white'>
      <section class="bg-white dark:bg-gray-900 ">
        <div class="container px-6 py-24 mx-auto lg:py-32">
          <div class="lg:flex">
            <div class="lg:w-1/2">
              <img class=" w-18 h-12 mx-auto rounded-lg" src="http://koshtipariwar.com/wp-content/uploads/koshti_logo3.jpg" alt="koshtipariwar" />
              <h1 class="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">Welcome back</h1>
              <h1 class="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                Login to your account
              </h1>
            </div>
            <div class="mt-8 lg:w-1/2 lg:mt-0">
              <form class="w-full lg:max-w-xl" onSubmit={handleFormSubmit}>
                <div class="relative flex items-center">
                  <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      {/* ... (your SVG path) ... */}
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Email address"
                    class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-300 focus:ring-pink-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div class="relative flex items-center mt-4">
                  <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      {/* ... (your SVG path) ... */}
                    </svg>
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Password"
                    class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-300 focus:ring-pink-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div class="mt-8 md:flex md:items-center">
                  <button
                    type="submit"
                    class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-pink-500 rounded-lg md:w-1/2 hover:bg-pink-400 focus:outline-none focus:ring focus:ring-pink-300 focus:ring-opacity-50"
                    disabled={loading} // Disable the button while loading is true
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                  <Link href="/forgotpassword" class="inline-block mt-4 text-center text-pink-500 md:mt-0 md:mx-6 hover:underline dark:text-pink-400">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
         
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
