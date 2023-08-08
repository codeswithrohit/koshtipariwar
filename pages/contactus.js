import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../Firebase/config';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

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
    <div className="m-auto min-h-screen bg-white dark:bg-white">
      <section className="">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:flex lg:items-center lg:-mx-10">
            <div className="lg:w-1/2 lg:mx-10">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize text-red-300 lg:text-3xl">Lets talk</h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Ask us anything We are here to help.
              </p>

              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="-mx-2 md:items-center md:flex">
                  <div className="flex-1 px-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex-1 px-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                    <input
                      type="email"
                      placeholder="example@example.com"
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
                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-300 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-300 rounded-md hover:bg-red-300 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'get in touch'}
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 lg:mt-0 lg:grid-cols-2">
            <ContactCard
              name="Rachit Tapre"
              phone="8149034846"
              email="support@koshtipariwar.com"
            />
            <ContactCard
              name="Nikhil Yokar"
              phone="9881947527"
              email="info@koshtipariwar.com"
            />
            <ContactCard name="Ratnakar Dhotre" phone="9850335514" />
          </div>
        </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
    
  );
};

const ContactCard = ({ name, phone, email }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">{name}</h2>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      <AiOutlinePhone className="inline-block mr-2 text-red-300" />
      {phone}
    </p>
    {email && (
      <p className="mt-1 text-gray-600 dark:text-gray-400">
        <AiOutlineMail className="inline-block mr-2 text-red-300" />
        {email}
      </p>
    )}
  </div>
);

export default Contactus;