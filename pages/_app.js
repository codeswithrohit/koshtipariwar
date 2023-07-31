import React from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

// List of paths where Navbar and Footer should be excluded
const excludedPaths = ['/admin/login', '/admin/home','/admin/addphotogallery','/admin/addslider','/admin/adminsignup','/admin/addjob','/admin/manageusers','/admin/managecarousel','/admin/manageevents'];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isExcludedPath = excludedPaths.includes(router.pathname);

  return (
    <>
      {!isExcludedPath && <Navbar />} {/* Render Navbar unless it's an excluded path */}
      <Component {...pageProps} />
      {!isExcludedPath && <Footer />} {/* Render Footer unless it's an excluded path */}
    </>
  );
}
