import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        toast.success('Password reset email sent. Check your inbox.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        // An error occurred while sending the reset email
        console.error('Error sending password reset email:', error);
        toast.error('Error sending password reset email.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className="flex justify-center items-center m-auto min-h-screen bg-white dark:bg-white">
      <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-4">Enter your email address to reset your password.</p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <button
          onClick={handleForgotPassword}
          className="w-full bg-pink-500 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded"
        >
          Reset Password
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;

  