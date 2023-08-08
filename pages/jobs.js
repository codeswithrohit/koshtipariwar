import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { firebase } from '../Firebase/config';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobsData, setJobsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch job data from Firestore
    const db = firebase.firestore();
    const jobsRef = db.collection('jobs');

    jobsRef
      .get()
      .then((querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push(doc.data());
        });
        setJobsData(jobs);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = jobsData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(jobsData.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-white dark:white">
      <h1 className='text-center text-orange-700 py-10 text-3xl'>Job Vacancy</h1>
      <div className="p-4">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
            {jobsData.map((job, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-white rounded-lg shadow-md p-4"
              >
                <a
                  href="#"
                  className="text-xl font-bold text-orange-700 dark:text-white hover:text-orange-700 dark:hover:text-orange-700 hover:underline"
                  tabIndex="0"
                  role="link"
                >
                  {job.title}
                </a>
                <p className="mt-2 text-orange-700 dark:text-orange-700">
                  {job.description}
                </p>
                <div className="flex items-center justify-between mt-5">
                  <a
                    className="px-3 py-1 text-sm font-bold text-white transition-colors duration-300 transform bg-red-300 rounded cursor-pointer hover:bg-red-300"
                    tabIndex="0"
                    role="button"
                  >
                    ₹ {job.salary}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
{/* Pagination */}
<div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 text-sm text-white font-medium bg-red-300 rounded-md ${
                currentPage === 1 ? 'bg-red-400 cursor-not-allowed' : ''
              }`}
              disabled={currentPage === 1}
            >
              <FiChevronLeft className="inline-block mr-1 text-white" /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 text-sm text-white font-medium bg-red-300 rounded-md ${
                  currentPage === index + 1 ? 'bg-red-400' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 text-white text-sm font-medium bg-red-300 rounded-md ${
                currentPage === totalPages ? 'bg-red-400 cursor-not-allowed ' : ''
              }`}
              disabled={currentPage === totalPages}
            >
              Next <FiChevronRight className="inline-block ml-1 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;