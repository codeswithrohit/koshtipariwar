/* eslint-disable @next/next/no-img-element */
import Carousel from '@/components/Carousel';
import React, { useState,useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'


const Index = () => {



  return (
    <div className=" min-h-screen">
      <Head>
        <title>Koshti Pariwar</title>
        <meta name="Koshti Pariwar" content="Dizi Global Solution" />
        <link rel="icon" href="/icon.png" />
      </Head>
   	<Carousel/>
     <section class="bg-white ">
    <div class="container  mx-auto">
        <div class="text-center">
            <h1 class="text-2xl font-semibold text-pink-900 capitalize lg:text-3xl dark:text-white py-10">Recent Events</h1>

         
        </div>

        <div class="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
        <div>
                <img class="relative z-10 object-cover w-full rounded-md h-96" src="https://www.ieplads.com/mailers/2016/jeevansathi/js-lp-21sept/images/js1.jpg" alt=""/>

                <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                    <Link href="#" class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                    Tapas & Dibyadarsini
                    </Link>

                    <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    We met on Shaadi.com. As we started talking, we felt that spark. Our vibe matched and we are getting engaged next month. Thank you Shaadi.com.
                    </p>

                    <p class="mt-3 text-sm text-pink-500">20 October 2019</p>
                </div>
            </div>

            <div>
                <img class="relative z-10 object-cover w-full rounded-md h-96" src="https://www.ieplads.com/mailers/2016/jeevansathi/js-lp-21sept/images/js2.jpg" alt=""/>

                <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                    <Link href="#" class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                    Sai & Paladi
                    </Link>

                    <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    He indicated interest, which we accepted; after that, we got to know one another through family connections; and finally, we got engaged. Thank you for Shaadi.com.
                    </p>

                    <p class="mt-3 text-sm text-pink-500">20 October 2019</p>
                </div>
            </div>

            <div>
                <img class="relative z-10 object-cover w-full rounded-md h-96" src="https://www.ieplads.com/mailers/2016/jeevansathi/js-lp-21sept/images/js3.jpg" alt=""/>

                <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                    <Link href="#" class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                    Aditya & Archana
                    </Link>

                    <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    Aditya and Me met via Shaadi.com in 2022. We both liked good conversations . I was impressed with Aditya's clear communication, We met after initial texts & phone calls. 
                    </p>

                    <p class="mt-3 text-sm text-pink-500">20 October 2019</p>
                </div>
            </div>
        </div>
    </div>
</section>


    <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        <h1 class="text-2xl font-semibold text-center text-pink-900 capitalize lg:text-3xl dark:text-pink-900">Events</h1>

      

        <div class="flex items-center justify-center mt-10">
            <div class="flex items-center p-1 border border-pink-600 dark:border-pink-400 rounded-xl">
                <button class="px-4 py-2 text-sm font-medium text-white capitalize bg-pink-600 md:py-3 rounded-xl md:px-12">Nashik</button>
                <button class="px-4 py-2 mx-4 text-sm font-medium text-pink-600 capitalize transition-colors duration-300 md:py-3 dark:text-pink-400 dark:hover:text-white focus:outline-none hover:bg-pink-600 hover:text-white rounded-xl md:mx-8 md:px-12">Nashirabad</button>
                <button class="px-4 py-2 text-sm font-medium text-pink-600 capitalize transition-colors duration-300 md:py-3 dark:text-pink-400 dark:hover:text-white focus:outline-none hover:bg-pink-600 hover:text-white rounded-xl md:px-12">Mumbai</button>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
            <div class="flex flex-col items-center">
                <img class="object-cover w-full rounded-xl aspect-square" src="https://images.shaadisaga.com/shaadisaga_production/photos/pictures/004/026/414/new_medium/284912622_537363174599565_8313416739499186466_n.jpg?1654403346" alt=""/>

                <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">Vishal Weds Phanguniya</h1>



                
            </div>
            

            <div class="flex flex-col items-center">
                <img class="object-cover w-full rounded-xl aspect-square" src="https://static.toiimg.com/photo/62103724.cms" alt=""/>

                <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">Virat Weds Anushka</h1>


               
            </div>

            <div class="flex flex-col items-center">
                <img class="object-cover w-full rounded-xl aspect-square" src="https://www.weddingsutra.com/images/wedding-images/celeb_wed/celeb_wed/deep_veer_02.jpg" alt=""/>

                <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">Ranveer Weds Deepika</h1>


               
            </div>
        </div>
    </div>
</section>
  </div>
  );
};

export default Index;

