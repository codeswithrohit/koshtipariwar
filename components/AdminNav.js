/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AdminNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    // ... (rest of your logout logic)

    // Clear the isAdmin status from local storage on logout
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/admin/login');
  };
  const handleLinkClick = () => {
    // Close the menu when a link is clicked
    setIsMenuOpen(false);
  };

  return (
<div className='bg-pink-900 sticky top-2 z-50 rounded-lg'>
<div className="  px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/admin/home"
            aria-label="koshtipariwar"
            title="koshtipariwar"
            className="inline-flex items-center mr-8"
          >
           <img class=" w-18 h-12 mx-auto rounded-lg" 
           src="http://koshtipariwar.com/wp-content/uploads/koshti_logo3.jpg" alt="koshtipariwar" />
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                href="/admin/home"
                aria-label="Home"
                title="Home"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/admin/addslider"
                aria-label="Add Slider data"
                title="Add Slider data"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
               Add Slider Data
              </Link>
            </li>
            <li>
              <Link
                href="/admin/addphotogallery"
                aria-label="Add photo Gallery"
                title="Add photo Gallery"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
               Add Photo Gallery
              </Link>
            </li>
         
            <li>
              <Link
                href="/admin/adminsignup"
                aria-label="Create Admin Account"
                title="Create Admin Account"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Create Admin Account
              </Link>
            </li>
            <li>
              <Link
                href="/admin/addjob"
                aria-label="Add Job"
                title="Add Job"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Add Job
              </Link>
            </li>
            <button
                          onClick={handleLogout}
                          className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Logout
                        </button>
          </ul>
        </div>
       
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
              <div className="p-5 bg-pink-900 border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="/admin/home"
                      aria-label="Koshtipariwar"
                      title="Koshtipariwar"
                      className="inline-flex items-center"
                      onClick={handleLinkClick}
                    >
                                 <img class=" w-18 h-12 mx-auto rounded-lg" 
           src="http://koshtipariwar.com/wp-content/uploads/koshti_logo3.jpg" alt="koshtipariwar" />
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
                        href="/admin/home"
                        aria-label="Home"
                        title="Home"
                        onClick={handleLinkClick}
                        className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                       Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/addslider"
                        aria-label="Add Slider Data"
                        title="Add Slider Data"
                        onClick={handleLinkClick}
                        className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Add Slider Data
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/addphotogallery"
                        aria-label="Add Photo Gallery"
                        onClick={handleLinkClick}
                        title="Add Photo Gallery"
                        className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                   Add Photo Gallery
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/adminsignup"
                        aria-label="Create Admin account"
                        onClick={handleLinkClick}
                        title="Create Admin account"
                        className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                    Create Admin account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/addjob"
                        aria-label="Add Job"
                        onClick={handleLinkClick}
                        title="Add Job"
                        className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                   Add Job
                      </Link>
                    </li>
                    <button
                          onClick={handleLogout}
                          
                          className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Logout
                        </button>
                 
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  
</div>
  )
}

export default AdminNav