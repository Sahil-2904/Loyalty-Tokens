import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Search from '../components/Search';
import Logo from '../images/Lo.svg';
import LoyaltyToken from '../abstract/LoyaltyToken.json';

function Admin() {
  const [transactions, setTransactions] = useState([]);
  const [walletAdd, setwalletAdd] = useState([]);
  useEffect(() => {
    const b = [];
    const a = transactions.forEach((transaction, index) => {
      b.push(transaction.wallet);
    });
    console.log(b);
    setwalletAdd(b);
  }, [transactions]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3000/transactions');
        const transactionData = await response.json();
        console.log(transactionData);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTransactions();
  }, []);

  const validateAll = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        LoyaltyToken.address,
        LoyaltyToken.abi,
        signer,
      );
      const logs = await contract.fetchTransactions(transactions[0].wallet);
      const serializedLogs = logs.map((log) => ({
        0: log[0].toString(),
        1: log[1],
        2: log[2].toString(),
        3: log[3].toString(),
        4: log[4].toString(),
        5: log[5],
        6: log[6],
      }));
      console.log(serializedLogs);

      serializedLogs.forEach(async (serial) => {
        const result = await contract.validateTokens(serial[0]);
        console.log(result);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-5 bg-[#3778e2] bg-transparent backdrop-blur-lg top-0 sticky z-20">
        <Search />
        <div style={{ left: '48%' }} className="flex absolute bg-[#020617] p-2 w-20 h-20 justify-center items-center rounded-full">
          <Link to="/"><img className="w-12 h-12" src={Logo} alt="" /></Link>
        </div>
        <div className="flex mr-14">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-neutral ring-offset-info ring-offset-2 text-center">
              <p className="flex flex-col justify-center text-2xl p-2 text-sky-500 uppercase bg-[#F4FCFE]">AD</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-5 justify-between">
        <h2 className="flex text-3xl p-3">
          Transactions (
          {' '}
          {transactions.length}
          {' '}
          )
        </h2>
        <button className="flex text-2xl p-3 btn" onClick={validateAll}>Validate</button>
      </div>
      <div className="flex flex-col justify-center p-3">
        {transactions.length !== 0

          ? (transactions.map((transaction, index) => (
            <div className="flex bg-slate-200 rounded-2xl shadow gap-5 p-3" key={index}>
              <h2 className="flex">{transaction.name}</h2>
              <p className="flex">{transaction.email}</p>
              <p className="flex">{transaction.wallet}</p>
            </div>

          )))
          : (<></>)}
      </div>

    </div>
  );
}
export default Admin;
