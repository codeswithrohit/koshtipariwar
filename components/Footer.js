/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white text-red-200">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-2 lg:px-8 flex justify-center items-center">
        <div className="text-justify text-bold text-orange-700">
          <h1 className="text-sm md:text-xl  ">
            विणकर म्हणजे कोष्टी. कोषा पासून वस्त्रे निर्माण करणारा तो कोष्टी. झाडाच्या साली पासून
          </h1>
          <h1 className="text-sm md:text-xl ">
            वस्त्रे निर्माण करणारा तो साळी. कोष्टी हा प्रमुख घटक धरलागेला आणि भिन्न कौशल्य वापरुन
          </h1>
          <h1 className="text-sm md:text-xl ">
            अनेक प्रकारचे वस्त्र निर्माण करण्याच्या गुणांवरुन भिन्न विणकाम करणारे विणकरवर्ग
          </h1>
          <h1 className="text-sm md:text-xl">
            निर्माण झालेत. अशाप्रकारे विणकर, कोष्टी, साळी, इत्यादी शब्दांची निर्मिती दिसून येते.
          </h1>
        </div>
        
      </div>
      <ul className="flex justify-center gap-6 md:gap-8 lg:gap-12 mb-8">
          <li>
            <Link className="text-orange-700 hover:text-red-500" href="/">
              Privacy Policy
            </Link>
          </li>
        </ul>

        <div className="border-t border-orange-700 pt-8 justify-center text-center px-4 py-16 sm:px-2 lg:px-8 mx-auto max-w-5xl">
          <p className="text-xs text-orange-700">
            © KoshtiPariwar 2023. All rights reserved.
          </p>
        </div>
      
    </footer>
  )
}

export default Footer
