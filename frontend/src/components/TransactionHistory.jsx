import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

const TransactionHistory = () => {
  const { user } = useContext(UserContext); 
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const lastThreeTransactions = user?.transactions ? user.transactions.slice(-3) : [];

  const handleToggleHistory = () => {
    setShowFullHistory(!showFullHistory);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false); 
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading transaction history...</div>;  
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h3>

      <div className="mb-4">
        {lastThreeTransactions.length > 0 ? (
          <ul className="space-y-2">
            {lastThreeTransactions.map((transaction, index) => (
              <li key={index} className="flex justify-between">
                <div>
                  <strong className="text-blue-600">{transaction.text || 'No Text'}</strong>
                  <em className="text-gray-500"> - {transaction.category || 'No Category'}</em>
                  <div className="text-gray-400 text-sm">{formatDate(transaction.date)}</div> {/* Display date */}
                </div>
                <span className={`font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  Rs. {transaction.amount || 0}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions yet</p>
        )}
      </div>

      <button
        onClick={handleToggleHistory}
        className="w-full py-2 px-4 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none"
      >
        {showFullHistory ? 'Show Last 3 Transactions' : 'Show Full History'}
      </button>

      {showFullHistory && (
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Full Transaction History</h4>
          <ul className="space-y-2">
            {user.transactions && user.transactions.length > 0 ? (
              user.transactions.map((transaction, index) => (
                <li key={index} className="flex justify-between">
                  <div>
                    <strong className="text-blue-600">{transaction.text || 'No Text'}</strong>
                    <em className="text-gray-500"> - {transaction.category || 'No Category'}</em>
                    <div className="text-gray-400 text-sm">{formatDate(transaction.date)}</div> {/* Display date */}
                  </div>
                  <span className={`font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    Rs. {transaction.amount || 0}
                  </span>
                </li>
              ))
            ) : (
              <p>No transactions available.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
