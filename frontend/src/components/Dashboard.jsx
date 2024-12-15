import React from 'react'
import TransactionHistory from './TransactionHistory.jsx';
import Balance from './Balance.jsx';
import Form from './Form.jsx';
import Header from './Header.jsx';



const Dashboard = () => {
  return (
    <>
    <Header/>
    <Balance />
    <Form />
    <TransactionHistory />
    </>
  )
}

export default Dashboard