import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React, { useState, useEffect } from "react";

function Transaction({ transaction }) {
  return (
    <div className="transaction">
      <div className="transaction-details">
        <p>{transaction.description}</p>
        <p>{transaction.date}</p>
      </div>
      <p>{transaction.amount}</p>
    </div>
  );
}

function TransactionList({ transactions }) {
  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search transactions"
      />
      <button type="submit">Search</button>
    </form>
  );
}

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch transactions data from an API or mock data
    const fetchData = async () => {
      const response = await fetch("https://example.com/api/transactions");
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    };
    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="app">
      <h1>Recent Transactions</h1>
      <SearchBar onSearch={handleSearch} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default App;


reportWebVitals();
