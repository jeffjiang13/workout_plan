import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from './config';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Send a GET request to the server to fetch the user's dashboard data
    axios.get(`${serverUrl}/dashboard`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
    <div className="row">
    <div className="col-12">
    {userData ? (
    <>
    <h1 className="text-center">Welcome, {userData.name}</h1>
    <p className="text-center">Your current workout plan: {userData.currentWorkoutPlan}</p>
    </>
    ) : (
    <p className="text-center">Loading...</p>
    )}
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
