/* eslint-disable @next/next/no-img-element */
import React, { useState,useEffect } from 'react';
import { firebase } from '../Firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const FormComponent = () => {
  const router = useRouter(); // Access the router
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    parentName: '',
    mobileNumber: '',
    parentAddress: '',
    yourAddress: '',
    dob: '',
    birthplace: '',
    height: '',
    education: '',
    occupation: '',
    monthlyIncome: '',
    aboutMe: '',
    photos: [],
    sameAsParentAddress: false,
    email: '',
    gender: '',
  });


  useEffect(() => {
    // Function to check if the user is logged in
    const checkUserLoggedIn = () => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          // If the user is not logged in, redirect to the login page
          router.push('/login');
        }
      });

      // Unsubscribe from the onAuthStateChanged listener when the component unmounts
      return () => unsubscribe();
    };

    // Call the checkUserLoggedIn function when the component mounts
    checkUserLoggedIn();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        yourAddress: formData.parentAddress,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    const photos = Array.from(files).slice(0, 5); // Limit to 5 photos
    setFormData((prevData) => ({
      ...prevData,
      photos: photos,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save data to Firestore
      const collectionRef = firebase.firestore().collection('matrimonials');

      // Upload photos to Firebase Storage and get their URLs
      const photoURLs = [];
      for (const photo of formData.photos) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(photo.name);
        await fileRef.put(photo);
        const url = await fileRef.getDownloadURL();
        photoURLs.push(url);
      }

      // Add the image URLs to the form data
      const formDataWithPhotoURLs = { ...formData, photos: photoURLs };

      // Add the complete form data to Firestore
      await collectionRef.add(formDataWithPhotoURLs);

      console.log('Data submitted successfully!');
      toast.success('Matrimonial data submitted successfully!');

      // Reset the form data to its initial state after successful submission
      setFormData({
        name: '',
        parentName: '',
        mobileNumber: '',
        parentAddress: '',
        yourAddress: '',
        dob: '',
        birthplace: '',
        height: '',
        education: '',
        occupation: '',
        monthlyIncome: '',
        aboutMe: '',
        photos: [],
        sameAsParentAddress: false,
        email: '',
        gender: '',
      });
    } catch (error) {
      console.error('Error submitting data: ', error);
      toast.error('Error submitting data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white dark:bg-white min-h-screen">
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Matrimonial Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
                Parent Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Parent Name"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="123-456-7890"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email ID<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="parentAddress" className="block text-sm font-medium text-gray-700">
                Parent Address<span className="text-red-500">*</span>
              </label>
              <textarea
                name="parentAddress"
                value={formData.parentAddress}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                required
                rows={4}
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="yourAddress" className="block text-sm font-medium text-gray-700">
                Your Address<span className="text-red-500">*</span>
              </label>
              <textarea
                name="yourAddress"
                value={formData.yourAddress}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                required={!formData.sameAsParentAddress}
                rows={4}
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="col-span-2">
              <label className="inline-flex items-center mt-1">
                <input
                  type="checkbox"
                  name="sameAsParentAddress"
                  checked={formData.sameAsParentAddress}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Same as Parent Address</span>
              </label>
            </div>
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Select Gender<span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option >Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="birthplace" className="block text-sm font-medium text-gray-700">
                Birthplace<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="birthplace"
                value={formData.birthplace}
                onChange={handleChange}
                placeholder="City, Country"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="5'8''"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Education<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Bachelor's Degree"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                Occupation<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Software Engineer"
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
                Monthly Income
              </label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="5000"
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
                About Me
              </label>
              <textarea
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about yourself..."
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div className="col-span-2">
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Photos (up to 5 photos, less than 1MB each)<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="photos"
                accept="image/*"
                onChange={handlePhotoUpload}
                multiple
                required
                className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            </div>
          
            <div className="col-span-2 mt-5">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-900 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:w-auto"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default FormComponent;
