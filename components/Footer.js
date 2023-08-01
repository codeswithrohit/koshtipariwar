/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="relative bg-white pt-8 pb-6">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap text-left lg:text-left">
      <div className="w-full lg:w-6/12 px-4">
        <h5 className="text-lg mt-0 mb-2 text-pink-900">
        विणकर म्हणजे कोष्टी. कोषा पासून वस्त्रे निर्माण करणारा तो कोष्टी. झाडाच्या साली पासून वस्त्रे निर्माण करणारा तो साळी. कोष्टी हा प्रमुख घटक धरलागेला आणि भिन्न कौशल्य वापरुन अनेक प्रकारचे वस्त्र निर्माण करण्याच्या गुणांवरुन भिन्न विणकाम करणारे विणकरवर्ग निर्माण झालेत. अशाप्रकारे विणकर, कोष्टी, साळी, इत्यादी शब्दांची निर्मिती दिसून येते.
        </h5>
      
      </div>
      <div className="w-full lg:w-6/12 px-4">
        <div className="flex flex-wrap items-top mb-6">
          <div className="w-full lg:w-4/12 px-4 ml-auto">
            <span className="block uppercase text-pink-900 text-sm font-semibold mb-2">Policy</span>
            <ul className="list-unstyled">
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">Term And Condition</Link>
              </li>
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">Refunfd Policy</Link>
              </li>
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">Cancellation Policy</Link>
              </li>
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <span className="block uppercase text-pink-900 text-sm font-semibold mb-2">Other Resources</span>
            <ul className="list-unstyled">
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">About Us</Link>
              </li>
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">Photo Gallery</Link>
              </li>
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">Matrimonial</Link>
              </li>
              <li>
                <Link className="text-pink-900 hover:text-pink-500 font-semibold block pb-2 text-sm" href="/">Jobs</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr className="my-6 border-blueGray-300"/>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-pink-900 font-semibold py-1">
        © Copyright 2023 KoshtiPariwar. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer
