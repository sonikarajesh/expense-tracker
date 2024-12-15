import React, { useContext } from 'react'; 
import Header from './Header'; 
import { useNavigate } from 'react-router-dom'; 
import UserContext from '../context/UserContext';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleProfileClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg w-full max-w-sm">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome!</h2>
          
          {user ? (
            <div>
              <p className="text-xl text-gray-600 mb-8">Hi {user.name}!</p>
              <p>Check out your profile</p>
              <button
                onClick={handleProfileClick}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                PROFILE
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">Please Login to see your Profile!</p>
              <div className="space-y-4">
                <button
                  onClick={handleLoginClick}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Register
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
