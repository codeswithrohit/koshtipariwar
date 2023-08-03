/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-white">
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    

    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-pink-900">
    विणकर म्हणजे कोष्टी. कोषा पासून वस्त्रे निर्माण करणारा तो कोष्टी. झाडाच्या साली पासून वस्त्रे निर्माण करणारा तो साळी. कोष्टी हा प्रमुख घटक धरलागेला आणि भिन्न कौशल्य वापरुन अनेक प्रकारचे वस्त्र निर्माण करण्याच्या गुणांवरुन भिन्न विणकाम करणारे विणकरवर्ग निर्माण झालेत. अशाप्रकारे विणकर, कोष्टी, साळी, इत्यादी शब्दांची निर्मिती दिसून येते.
    </p>

    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      <li>
        <Link className="text-pink-900 transition hover:text-pink-900/75" href="/">
          Terms and Condition
        </Link>
      </li>

      <li>
        <Link className="text-pink-900 transition hover:text-pink-900/75" href="/">
          Privacy Policy
        </Link>
      </li>

      <li>
        <Link className="text-pink-900 transition hover:text-pink-900/75" href="/">
          Refund Policy
        </Link>
      </li>

      <li>
        <Link className="text-pink-900 transition hover:text-pink-900/75" href="/">
          Cancellation Policy
        </Link>
      </li>

    
    </ul>

    <div class="mt-16 border-t border-pink-900 pt-8">
      <p class="text-center text-xs/relaxed text-pink-900">
        © KoshtiPariwar 2022. All rights reserved.

        <br />

       
      </p>
    </div>

    
  </div>
</footer>
  )
}

export default Footer


