/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firebase } from '../Firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import { FcCalendar } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Add a listener to check for changes in the user's authentication state
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserData(user);
      } else {
        // Redirect to login when user is not logged in
        router.push('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (user) => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'Users', user.email);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        // Handle case where user data doesn't exist in Firestore
        // You can create a new user profile or handle it based on your app's logic
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = () => {
    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    // Reauthenticate the user with their current credentials
    const auth = getAuth();
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        // Update the password
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            // Password updated successfully
            toast.success('Your password has been changed.');
            setShowChangePassword(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
          })
          .catch((error) => {
            console.error('Error updating password:', error);
            toast.error('An error occurred while updating the password.');
          });
      })
      .catch((error) => {
        console.error('Error reauthenticating user:', error);
        toast.error('Invalid old password.');
      });
  };

  if (isLoading) {
    return <Spinner />; // Show spinner while loading data
  }

  if (!userData) {
    return <div>Sorry, user data not found.</div>; // Handle if user data is not found in Firestore
  }

  return (
    <body className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover" style={{ backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')" }}>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">

        {/*Main Col*/}
        <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">

          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* Image for mobile view */}
            <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData.firstName} {userData.lastName}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <AiOutlineMail className="h-12 w-12 fill-current text-pink-900 pr-4" /> {userData.email}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <FiPhoneCall className="h-12 w-12 fill-current text-pink-900 pr-4" /> {userData.phoneNumber}
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <FcCalendar className="h-12 w-12 fill-current text-pink-900 pr-4" /> {userData.birthDate}/{userData.birthMonth}/{userData.birthYear}
            </p>

            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowChangePassword(true)}>
              Change Password
            </button>
          </div>
        </div>

        {/* Img Col */}
        <div className="w-full lg:w-2/5">
          {/* Big profile image for side bar (desktop) */}
          <img src={userData.profileImageURL} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" />
        </div>

        {/* Pin to top right corner */}
        <div className="absolute top-0 right-0 h-12 w-18 p-4">
          <button className="js-change-theme focus:outline-none">🌙</button>
        </div>
      </div>

      {/* Add the necessary scripts here */}
      {/* Example Modal/Form to change password */}
      {showChangePassword && (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-opacity-75 bg-gray-800">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePasswordChange}
            >
              Update Password
            </button>
            <button className="ml-2 text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded" onClick={() => setShowChangePassword(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer /> {/* React Toastify container */}
    </body>
  );
};

export default Profile;
