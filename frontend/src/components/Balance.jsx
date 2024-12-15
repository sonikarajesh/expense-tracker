import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const Balance = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div>User data not available. Please log in again.</div>;
  }
  return (
    <div className="flex space-x-6 max-w-5xl mx-auto mt-8">
      <div className="p-6 w-1/2 bg-white shadow-lg rounded-lg flex flex-col items-center hover:shadow-xl transition-shadow">
        <h4 className="text-xl font-medium text-gray-700 mb-2">Your Current Balance</h4>
        <h1 className="text-3xl font-semibold text-green-600">Rs. {user.balance}</h1>
      </div>

      <div className="p-6 w-1/2 bg-white shadow-lg rounded-lg flex flex-col items-center hover:shadow-xl transition-shadow">
        <h4 className="text-xl font-medium text-gray-700 mb-2">Expenses</h4>
        <h1 className="text-3xl font-semibold text-red-600">Rs. {Math.abs(user.expense)}</h1>
      </div>
    </div>
  );
};

export default Balance;
