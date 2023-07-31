/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../Firebase/config';

const Contactus = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Upload data to Firestore
    const db = firebase.firestore();
    db.collection('contact_us_messages')
      .add({
        fullName,
        email,
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setIsLoading(false);
        setFullName('');
        setEmail('');
        setMessage('');
        toast.success('Message submitted successfully! Our team will connect to you.');
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error submitting message:', error);
        toast.error('Error submitting message. Please try again later.');
      });
  };

  return (
    <div className="bg-white m-auto min-h-screen">
      <section className="min-h-screen bg-white ">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:flex lg:items-center lg:-mx-10">
            <div className="lg:w-1/2 lg:mx-10">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize text-pink-900 lg:text-3xl">Let’s talk</h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Ask us everything and we would love
                to hear from you
              </p>

              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="-mx-2 md:items-center md:flex">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex-1 px-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                    <input
                      type="email"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>

                <div className="w-full mt-4">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-pink-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-pink-900 rounded-md hover:bg-pink-900 focus:outline-none focus:ring focus:ring-pink-400 focus:ring-opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'get in touch'}
                </button>
              </form>
            </div>

              <div class="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
                <img class="hidden object-cover mx-auto rounded-full lg:block shrink-0 w-96 h-96" src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>

                <div class="grid grid-cols-1 gap-12 lg:col-span-3 sm:grid-cols-3 mt-5">
            <div>
                <h2 class="font-medium text-gray-800 text-pink-900">Rachit Tapre
</h2>
                <p class="mt-2 text-gray-500 dark:text-pink-400">8149034846 <br/> support@koshtipariwar.com</p>
            </div>

            <div>
                <h2 class="font-medium text-gray-800 text-pink-900">Nikhil Yokar
</h2>
                <p class="mt-2 text-gray-500 dark:text-pink-400">9881947527 <br/> info@koshtipariwar.com</p>
            </div>

            <div>
                <h2 class="font-medium text-gray-800 text-pink-900">Ratnakar Dhotre
</h2>
                <p class="mt-2 text-gray-500 dark:text-pink-400">9850335514</p>
            </div>

          

         
        </div>

               
            </div>         
             </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Contactus;
