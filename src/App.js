import React, { useState, useEffect } from 'react';
import "./App.css";

const customersData = [
  {
    name: 'John Doe',
    transactions: [
      { date: '2022-01-02', amount: 150 },
      { date: '2022-02-15', amount: 75 },
      { date: '2022-03-21', amount: 125 },
    ],
  },
  {
    name: 'Jane Smith',
    transactions: [
      { date: '2022-01-05', amount: 80 },
      { date: '2022-02-10', amount: 120 },
      { date: '2022-03-17', amount: 90 },
    ],
  },
  {
    name: 'Ben Miller',
    transactions: [
      { date: '2022-01-15', amount: 180 },
      { date: '2022-02-11', amount: 160 },
      { date: '2022-03-27', amount: 190 },
    ],
  },
  {
    name: 'Suzanne Murphy',
    transactions: [
      { date: '2022-01-15', amount: 180 },
      { date: '2022-02-11', amount: 160 },
      { date: '2022-03-27', amount: 190 },
    ],
  },
];

const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
  }
  if (amount >= 50 && amount <= 100) {
    points += (amount - 50);
  }
  return points;
};

const calculateRewards = (transactions) => {
  const rewards = { total: 0 };
  for (const transaction of transactions) {
    const points = calculateRewardPoints(transaction.amount);
    const month = transaction.date.slice(0, 7); // YYYY-MM
    rewards[month] = (rewards[month] || 0) + points;
    rewards.total += points;
  }
  return rewards;
};

const simulateApiCall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000); // Simulate 1 second delay
  });
};

const App = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    simulateApiCall(customersData).then((data) => {
      setCustomers(data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Reward Points</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total Rewards</th>
            <th>January Rewards</th>
            <th>February Rewards</th>
            <th>March Rewards</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.name}>
              <td>{customer.name}</td>
              <td>{calculateRewards(customer.transactions).total}</td>
              <td>{calculateRewards(customer.transactions)['2022-01'] || 0}</td>
              <td>{calculateRewards(customer.transactions)['2022-02'] || 0}</td>
              <td>{calculateRewards(customer.transactions)['2022-03'] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
