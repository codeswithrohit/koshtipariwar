/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Add a listener to check for changes in the user's authentication state
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserData(user);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (user) => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'Users', user.email);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        // Handle case where user data doesn't exist in Firestore
        // You can create a new user profile or handle it based on your app's logic
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true); // Start the loading state
      const auth = getAuth();
      await signOut(auth);
      setIsLoading(false); // End the loading state
      toast.success('You have successfully logged out!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      setIsLoading(false); // End the loading state in case of error
      console.error('Error logging out:', error);
    }
  };

  const handleLinkClick = () => {
    // Close the menu when a link is clicked
    setIsMenuOpen(false);
  };

  return (
    <div
  className="sticky top-2 z-50 rounded-lg"
  style={{
    backgroundColor: "rgba(255, 45, 85, 0.3)", // Red: rgb(255, 45, 85), Transparency: 0.3
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  }}
>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              aria-label="koshtipariwar"
              title="koshtipariwar"
              className="inline-flex items-center mr-8"
            >
              <img
                className="w-18 h-12 mx-auto rounded-lg"
                src="http://koshtipariwar.com/wp-content/uploads/koshti_logo3.jpg"
                alt="koshtipariwar"
              />
            </Link>
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <Link
                  href="/"
                  aria-label="home"
                  title="home"
                  className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  aria-label="aboutus"
                  title="aboutus"
                  className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/photogallery"
                  aria-label="photogallery"
                  title="photogallery"
                  className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/matrimonial"
                  aria-label="matrimonial"
                  title="matrimonial"
                  className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Matrimonial
                </Link>
              </li>

              <li>
                <Link
                  href="/jobs"
                  aria-label="jobs"
                  title="jobs"
                  className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus"
                  aria-label="contactus"
                  title="contactus"
                  className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          {user && userData ? (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <Link
                  href="/profile"
                  aria-label="Profile"
                  title="Profile"
                  className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  {userData.username}
                </Link>
              </li>
              <li>
                {isLoading ? (
                  <div className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400">
                    Loading...
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          ) : (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <Link
                  href="/login"
                  className="flex items-center text-white font-medium"
                >
                  Log In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          )}
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-red-600 border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Koshtipariwar"
                        title="Koshtipariwar"
                        className="inline-flex items-center"
                        onClick={handleLinkClick}
                      >
                        <img
                          className="w-18 h-12 mx-auto rounded-lg"
                          src="http://koshtipariwar.com/wp-content/uploads/koshti_logo3.jpg"
                          alt="koshtipariwar"
                        />
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-pink-900 focus:bg-pink-900 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-white" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          href="/aboutus"
                          aria-label="aboutus"
                          title="aboutus"
                          onClick={handleLinkClick}
                          className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          About US
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/photogallery"
                          aria-label="photogallery"
                          title="photogallery"
                          onClick={handleLinkClick}
                          className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Photo Gallery
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/matrimonial"
                          aria-label="Matrimonial"
                          onClick={handleLinkClick}
                          title="matrimonial"
                          className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Matrimonial
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/jobs"
                          aria-label="jobs"
                          onClick={handleLinkClick}
                          title="jobs"
                          className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contactus"
                          aria-label="Contact us"
                          onClick={handleLinkClick}
                          title="Contact us"
                          className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Contact Us
                        </Link>
                      </li>
                      {user && userData ? (
                        <>
                          <li>
                            <Link
                              href="/profile"
                              aria-label="profile"
                              onClick={handleLinkClick}
                              title="profile"
                              className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              {userData.username}
                            </Link>
                          </li>
                          <li>
                            {isLoading ? (
                              <div className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400">
                                Loading...
                              </div>
                            ) : (
                              <button
                                onClick={handleLogout}
                                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                              >
                                Logout
                              </button>
                            )}
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              onClick={handleLinkClick}
                              href="/login"
                              className="flex items-center text-white font-medium"
                            >
                              Log In
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/signup"
                              onClick={handleLinkClick}
                              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                              aria-label="Sign up"
                              title="Sign up"
                            >
                              Sign up
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
