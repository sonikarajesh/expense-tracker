import React, {useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; 
import UserContext from '../context/UserContext';

const Header = () => {
  const { user } = useContext(UserContext)

  const navigate = useNavigate();

 
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md p-6 mb-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        EXPENSE TRACKER
      </h1>
      {user && (
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold text-gray-700">Hello {user.name}, </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
