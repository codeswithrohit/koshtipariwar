import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { firebase } from '../Firebase/config';

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobsData, setJobsData] = useState([]);

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

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        jobsData.map((job, idx) => (
          <div key={idx} className="m-auto min-h-screen bg-white dark:bg-white flex items-center justify-center ">
            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md">
             

              <div className="mt-2">
                <a href="#" className="text-xl font-bold text-red-300 dark:text-white hover:text-red-300 dark:hover:text-red-300 hover:underline" tabIndex="0" role="link">
                  {job.title}
                </a>
                <p className="mt-2 text-red-300 dark:text-red-300">{job.description}</p>
              </div>
              <div className="flex items-center justify-between mt-5 ml-96">
                <a className="px-3 py-1 text-sm font-bold text-white transition-colors duration-300 transform bg-red-300 rounded cursor-pointer hover:bg-red-300" tabIndex="0" role="button">
                  ₹ {job.salary}
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Jobs;
