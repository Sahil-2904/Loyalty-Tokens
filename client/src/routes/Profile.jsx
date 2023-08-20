import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import ANavbar from '../components/ANavbar';
import Footer from '../components/Footer';
import {
  loginSuccess, logout, wallet, disconnectWallet,
} from '../authActions';
import LoyaltyToken from '../abstract/LoyaltyToken.json';

function Profile() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  // const [connected, setConnected] = useState(false);
  const isConnected = useSelector((state) => state.auth.connected);
  const [currAddress, setCurrAddress] = useState('0x');
  const [buttonClasses, setButtonClasses] = useState('');
  const getLog = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      const contract = new ethers.Contract(
        LoyaltyToken.address,
        LoyaltyToken.abi,
        signer,
      );
      const logs = await contract.fetchTransactions(addr);

      // Convert BigInts to strings before JSON serialization
      const serializedLogs = logs.map((log) => ({
        0: log[0].toString(),
        1: log[1],
        2: log[2].toString(),
        3: log[3].toString(),
        4: log[4].toString(),
        5: log[5],
        6: log[6],
      }));

      // Serialize to JSON
      const jsonString = JSON.stringify(serializedLogs);

      // Parse JSON and convert string values back to BigInts
      const parsedLogs = JSON.parse(jsonString, (key, value) => {
        if (/^\d+$/.test(value)) {
          return BigInt(value);
        }
        return value;
      });

      console.log(parsedLogs);

      // contract.on('tok enMinted', function (event) {
      //   console.log(`Result is ${event}`);
      // });
    } catch (err) {
      console.error(err);
    }
  };
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setCurrAddress(address);
        dispatch(wallet());
        user.walletadd = address;
        dispatch(loginSuccess(user));
        // console.log(connected);
        // setConnected(true);
      } else {
        window.location.href = 'https://metamask.io/download.html';
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      dispatch(disconnectWallet());
      // console.log(connected);
      // setConnected(false);
      setCurrAddress('0x');
    } else {
      dispatch(wallet());
      // console.log(connected);
      // setConnected(true);
      setCurrAddress(accounts[0]);
      user.walletadd = accounts[0];
      dispatch(loginSuccess(user));
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.selectedAddress) {
      dispatch(wallet());
      // setConnected(true);
      // console.log(connected);
      setCurrAddress(ethereum.selectedAddress);
      getLog();
      user.walletadd = ethereum.selectedAddress;
      dispatch(loginSuccess(user));
    }

    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (ethereum) {
        ethereum.removeAllListeners('accountsChanged');
        // Remove the event listener
        // contract.removeAllListeners();
      }
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      setButtonClasses('hover:bg-green-70 bg-green-500');
    } else {
      setButtonClasses('hover:bg-blue-70 bg-blue-500');
    }
  }, [isConnected]);
  // // const [currAddress, setCurrAddress] = useState('0x');

  // const connectWallet = async () => {
  //   try {
  //     if (window.ethereum) {
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const address = await signer.getAddress();

  //       // setCurrAddress(address);
  //       // setConnected(true);
  //     } else {
  //       window.location.href = 'https://metamask.io/download.html';
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   const { ethereum } = window;
  //   if (ethereum && ethereum.selectedAddress) {
  //     setConnected(true);
  //     setCurrAddress(ethereum.selectedAddress);
  //   }

  //   if (ethereum) {
  //     ethereum.on('accountsChanged', (accounts) => {
  //       if (accounts.length === 0) {
  //         setConnected(false);
  //         setCurrAddress('0x');
  //       } else {
  //         setConnected(true);
  //         setCurrAddress(accounts[0]);
  //       }
  //     });
  //   }

  //   window.addEventListener('load', async () => {
  //     if (ethereum && ethereum.selectedAddress) {
  //       setConnected(true);
  //       setCurrAddress(ethereum.selectedAddress);
  //     }
  //   });

  //   return () => {
  //     if (ethereum) {
  //       ethereum.removeAllListeners('accountsChanged');
  //     }
  //     window.removeEventListener('load', async () => {});
  //   };
  // }, []);

  // useEffect(() => {
  //   if (connected) {
  //     const ethereumButton = document.querySelector('.enableEthereumButton');
  //     ethereumButton.textContent = 'Connected';
  //     ethereumButton.classList.remove('hover:bg-blue-70');
  //     ethereumButton.classList.remove('bg-blue-500');
  //     ethereumButton.classList.add('hover:bg-green-70');
  //     ethereumButton.classList.add('bg-green-500');
  //   }
  // }, [connected]);
  return (
    <>
      <ANavbar />
      <div className="flex flex-col p-10 gap-5">
        {/* <h2 className="flex text-5xl">{user.name}</h2> */}
        <p className="flex text-2xl">
          Wallet Address:
          {' '}
          {currAddress}
        </p>
      </div>
      <div className="flex justify-center p-5">
        {/* <Link to="/"> */}
        <button className={`flex text-4xl p-5 bg-emerald-600 text-white rounded-3xl ${buttonClasses}`} onClick={connectWallet} type="submit">
          { isConnected ? 'Connected' : 'Connect Wallet'}
        </button>
        {
          isConnected ? <Link to="/mycart"><button className="flex text-4xl p-5 text-black rounded-3xl">My Cart</button></Link> : <></>
        }

      </div>
      <Footer />
    </>

  );
}
export default Profile;
