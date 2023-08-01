import React, { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebase } from '../Firebase/config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const AddMatrimonial = () => {
  const router = useRouter(); // Access the router
  const [isLoading, setIsLoading] = useState(false);

  const [matrimonialData, setMatrimonialData] = useState({
    MatrimonialName: '',
    emailAddress: '',
    contactNumber: '',
    occupation: '',
    photo: '', // New field: photo URL
    income: '', // New field: monthly/annually income
    category: '', // New field: category (e.g., Bride, Groom)
    education: '', // New field: education
    birthDate: '',
    birthMonth: '',
    birthYear: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatrimonialData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    try {
      setIsLoading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `matrimonial_photos/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setMatrimonialData((prevState) => ({
        ...prevState,
        photo: downloadURL,
      }));
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('An error occurred while uploading the photo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const db = getFirestore();
      // Add your collection name here. Replace 'matrimonials' with the actual collection name
      const matrimonialsRef = doc(db, 'matrimonials', 'matrimonial_id'); // Replace 'matrimonial_id' with a unique ID for the matrimonial

      // Add matrimonial data to Firestore
      await setDoc(matrimonialsRef, matrimonialData);

      toast.success('Matrimonial added successfully.');
      setMatrimonialData({
        MatrimonialName: '',
        emailAddress: '',
        contactNumber: '',
        occupation: '',
        photo: '',
        income: '',
        category: '',
        education: '',
        birthDate: '',
        birthMonth: '',
        birthYear: '',
      });
    } catch (error) {
      console.error('Error adding matrimonial:', error);
      toast.error('An error occurred while adding the matrimonial.');
    } finally {
      setIsLoading(false);
    }
  };

  const daysOptions = Array.from({ length: 31 }, (_, index) => index + 1);

  const monthsOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index);

  return (
    <div className="m-auto min-h-screen bg-white flex items-center">
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-white">
        <h2 className="text-lg font-semibold text-pink-800 capitalize dark:text-white">Add Matrimonial</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="MatrimonialName">
                Matrimonial Name
              </label>
              <input
                id="MatrimonialName"
                name="MatrimonialName"
                type="text"
                value={matrimonialData.MatrimonialName}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={matrimonialData.emailAddress}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="number"
                value={matrimonialData.contactNumber}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="occupation">
                Occupation
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                value={matrimonialData.occupation}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="photo">
                Photo Upload
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="income">
                Monthly/Annually Income
              </label>
              <input
                id="income"
                name="income"
                type="text"
                value={matrimonialData.income}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={matrimonialData.category}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              >
                <option value="">Select Category</option>
                <option value="Bride">Bride</option>
                <option value="Groom">Groom</option>
              </select>
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="education">
                Education
              </label>
              <input
                id="education"
                name="education"
                type="text"
                value={matrimonialData.education}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="birthDate">
                Birth Date
              </label>
              <select
                id="birthDate"
                name="birthDate"
                value={matrimonialData.birthDate}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              >
                <option value="">Select Date</option>
                {daysOptions.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="birthMonth">
                Birth Month
              </label>
              <select
                id="birthMonth"
                name="birthMonth"
                value={matrimonialData.birthMonth}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              >
                <option value="">Select Month</option>
                {monthsOptions.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-pink-800 dark:text-pink-900" htmlFor="birthYear">
                Birth Year
              </label>
              <select
                id="birthYear"
                name="birthYear"
                value={matrimonialData.birthYear}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-pink-800 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                required
              >
                <option value="">Select Year</option>
                {yearsOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              {isLoading ? 'Uploading...' : 'Save'}
            </button>
          </div>
        </form>
      </section>
      <ToastContainer /> {/* React Toastify container */}
    </div>
  );
};

export default AddMatrimonial;
