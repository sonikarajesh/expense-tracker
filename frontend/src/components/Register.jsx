import React, { useState, useEffect } from "react";
import { Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-10">
          <Spin size="large" />
        </div>
      )}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Register Form
          </h1>

          <Form.Item label="Name" name="name">
            <Input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Link
              to="/login"
              className="text-blue-600 hover:underline text-sm"
            >
              Already registered? Click here to login
            </Link>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
