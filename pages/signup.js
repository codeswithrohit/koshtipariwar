/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '../Firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    category: '',
    birthDate: '',
    birthMonth: '',
    birthYear: '',
    profileImage: null, // New state for profile image
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setPasswordMatch(value === formData.password);
    handleFormChange(event);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection for profile image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { email, password, username, firstName, lastName, phoneNumber, category, birthDate, birthMonth, birthYear } = formData;

      // Create a user with email and password
      await createUserWithEmailAndPassword(firebase.auth(), email, password);

      // Upload profile image to Firebase Storage if selected
      if (formData.profileImage) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`${email}/profile-image`);
        await imageRef.put(formData.profileImage);
        const downloadURL = await imageRef.getDownloadURL();
        formData.profileImage = downloadURL;
      }

      // Store additional user data in Firestore, including profile image URL if selected
      const db = firebase.firestore();
      await db.collection('Users').doc(email).set({
        email,
        username,
        firstName,
        lastName,
        phoneNumber,
        category,
        birthDate,
        birthMonth,
        birthYear,
        profileImageURL: formData.profileImage, // Store profile image URL
      });

      setIsLoading(false);

      // Show success toast notification
      toast.success('Your account has been created.', {
        position: toast.POSITION.TOP_RIGHT,
      });

      // Clear the form data
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        category: '',
        birthDate: '',
        birthMonth: '',
        birthYear: '',
        profileImage: null, // Reset profile image selection
      });
    } catch (error) {
      setIsLoading(false);

      // Show error toast notification
      toast.error('Error signing up: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const categoryOptions = [
    { label: 'Bride', value: 'Bride' },
    { label: 'Bride Groom', value: 'Bride Groom' },
  ];

  const daysOptions = Array.from({ length: 31 }, (_, index) => index + 1);

  const monthsOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index);

  return (
    <div className='bg-white'>
      <section class="bg-white dark:bg-pink-900">
        <div class="flex justify-center min-h-screen">
          <div
            class="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
            }}
          ></div>

          <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div class="w-full">
              <h1 class="text-2xl font-semibold tracking-wider text-pink-800 capitalize dark:text-white">
                Get your create account now.
              </h1>

              <p class="mt-4 text-pink-500 dark:text-pink-400">
                Let’s get you all set up so you can verify your personal account and begin setting up your profile.
              </p>

              <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleFormSubmit}>
                <div>
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">User Name</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    placeholder="John@123"
                    class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div>
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    placeholder="John"
                    class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    placeholder="Snow"
                    class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Phone number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    placeholder="XXX-XX-XXXX-XXX"
                    class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="johnsnow@example.com"
                    class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                

                <div>
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Enter your password"
                    class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
        <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange} // Changed to handleConfirmPasswordChange
          placeholder="Enter your password"
          class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {formData.confirmPassword && (
          <p className={passwordMatch ? 'text-green-500' : 'text-red-500'}>
            {passwordMatch ? 'Password match' : 'Password did not match'}
          </p>
        )}
      </div>

                <div>
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Category</label>
                  <select
  name="category"
  value={formData.category}
  onChange={handleFormChange}
  className="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
>
  <option value="" disabled>
    Select Category
  </option>
  {categoryOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>

                </div>

                <div class="col-span-2">
                    <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Profile Image</label>
                    <input
                      type="file"
                      name="profileImage"
                      onChange={handleImageChange}
                      accept="image/*"
                      class="block w-full px-5 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                <div class="col-span-2">
                  <label class="block mb-2 text-sm text-pink-600 dark:text-pink-200">Birth Date</label>
                  <div class="flex space-x-2">
                    <select
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleFormChange}
                      class="block flex-1 px-1 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled selected>
                        Date
                      </option>
                      {daysOptions.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>

                    <select
                      name="birthMonth"
                      value={formData.birthMonth}
                      onChange={handleFormChange}
                      class="block flex-1 px-1 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled selected>
                        Month
                      </option>
                      {monthsOptions.map((month, index) => (
                        <option key={index} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      name="birthYear"
                      value={formData.birthYear}
                      onChange={handleFormChange}
                      class="block flex-1 px-1 py-3 mt-2 text-pink-700 placeholder-pink-400 bg-white border border-pink-200 rounded-lg dark:placeholder-pink-600 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="" disabled selected>
                        Year
                      </option>
                      {yearsOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div class="col-span-2">
                <button
          type='submit'
          className={`w-full p-2 rounded-md ${
            isLoading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-900'
          } text-white`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
       
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
