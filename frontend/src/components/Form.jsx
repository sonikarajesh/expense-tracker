import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { message } from 'antd';

const Form = () => {
    
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('0');
    const [category, setCategory] = useState('food');
    const { user, setUser } = useContext(UserContext); 


    const onSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
            message.error("Please log in first.");
            return;
        }
    
    
        let transactionAmount = parseFloat(amount);
        if (isNaN(transactionAmount)) {
                message.error("Invalid amount. Please enter a valid number.");
                return;
                }
                if (amount.includes('-')) {
                        transactionAmount = -Math.abs(transactionAmount);
                    } else {
                            transactionAmount = Math.abs(transactionAmount);
                        }
    
        try {
            
            const response = await axios.post('http://localhost:5000/api/users/addTransaction', {
                userId: user._id,
                text,
                amount: transactionAmount,
                category,
              });

    

            setUser(response.data);
    
            // Reset form fields
            setText('');
            setAmount('0');
            setCategory('food');
        } catch (error) {
            console.error('Error adding transaction:', error.response || error.message);
        }
    };
    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg overflow-hidden">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Transaction</h3>
            <form onSubmit={onSubmit} className="space-y-6">
                {/* Text Input */}
                <div className="flex flex-col">
                    <label htmlFor="text" className="text-sm font-medium text-gray-600 mb-2">Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        id="text"
                        placeholder="Enter description..."
                        className="p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="amount" className="text-sm font-medium text-gray-600 mb-2">
                        Amount <span className="text-xs text-gray-500">(negative for expense, positive for income)</span>
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="category" className="text-sm font-medium text-gray-600 mb-2">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} 
                        className="p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    >
                        <option value="food">Food</option>
                        <option value="utilities">Utilities</option>
                        <option value="rent">Rent</option>
                        <option value="electricity">Electricity</option>
                        <option value="water">Water</option>
                        <option value="groceries">Groceries</option>
                        <option value="health">Health</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="salary">Salary</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default Form;
