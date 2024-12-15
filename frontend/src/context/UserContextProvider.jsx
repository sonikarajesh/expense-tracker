import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import axios from 'axios';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/getUser', { userId });
      setUser(response.data); 
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const userString = localStorage.getItem('user'); 
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        const userId = userData.userId; 
        if (userId) {
          fetchUserData(userId); 
        } else {
          setError('User ID is missing.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setError('Failed to retrieve user data.');
        setLoading(false);
      }
    } else {
      setLoading(false); 
      setError('User not logged in. Please log in first.');
    }
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
