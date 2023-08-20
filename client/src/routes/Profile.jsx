import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import ANavbar from '../components/ANavbar';
import Footer from '../components/Footer';
import {loginSuccess, logout, wallet, disconnectWallet, tokens,} from '../authActions';
import LoyaltyToken from '../abstract/LoyaltyToken.json';

function Profile() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  // const [connected, setConnected] = useState(false);
  const isConnected = useSelector((state) => state.auth.connected);
  const [currAddress, setCurrAddress] = useState('0x');
  const [buttonClasses, setButtonClasses] = useState('');
  const [logs,setLogs] = useState([]);
  
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
      setLogs(parsedLogs);
      const currTokens = await contract.balanceFor(addr);
      const t = currTokens.toString();
      dispatch(tokens(t));

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
      <div className='flex flex-col p-20 gap-10'>
        <div className='flex justify-between'>
          <div className="flex flex-col gap-5">
            <h2 className="flex text-5xl">{user.name}</h2>
            <h4 className='flex text-3xl'>{user.email}</h4>
          </div>
          <div className="flex justify-center p-5">
            {/* <Link to="/"> */}
            <button className={`flex flex-col justify-center text-xl p-3 bg-emerald-600 text-white rounded-3xl ${buttonClasses}`} onClick={connectWallet} type="submit">
              { isConnected ? 'Connected' : 'Connect Wallet'}
            </button>
            {
              isConnected ? <Link to="/mycart" className="flex flex-col justify-center text-xl p-3 text-black outline rounded-3xl ml-5"><button >My Cart</button></Link> : <></>
            }
          </div>
        </div>
        <div className='flex justify-between'>
            <p className="flex flex-col justify-center text-2xl w-1/2">
                  Wallet Address:
                  {' '}
                  {currAddress}
            </p>
            <div className='flex justify-center p-5 gap-5'>
              <Link to="/profile/redeem"><button className='flex flex-col justify-center text-xl p-3 text-black rounded-3xl outline-sky-400 bg-sky-300'>Redeem Tokens</button></Link>
              <Link to="/profile/earn"><button className='flex flex-col justify-center text-xl p-3 text-black rounded-3xl outline-sky-400 bg-sky-300'>Earn Tokens</button></Link>
            </div>
            
        </div>
        <div className='flex flex-col gap-3 justify-center'> 
        <h2 className='flex text-3xl'>Transactions</h2>
        {
          logs.length === 0 ? (<p>No Transactions Yet</p>) : 
          (
            <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="shadow-md">
                      <th className="flex text-xl justify-left ms-5 mb-5 mt-5">Sr.No</th>
                      <th className="text-xl m-5">Time</th>
                      <th className="text-xl m-5">Tokens</th>
                      <th className="text-xl m-5">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                            logs.map((log, index) => {  
                              const t = log[4].toString() 
                              const d =  Number(t) * 1000;        
                              const date = new Date(d);
                              const options = {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                              };
                              const time = date.toLocaleString('en-US',options);
                              console.log(time) ;  

                              return (
                                <tr key={index} className="shadow-md">
                                  <td className="flex justify-center">
                                    <p className='flex text-xl'>{index + 1}</p>
                                  </td>
                                  <td className="">
                                    <p className='flex text-xl'>{time.toString()}</p>
                                  </td>
                                  <td>
                                    <p className="text-xl">
                                      {log[2].toString()}
                                    </p>
                                  </td>
                                  <th>
                                    {/* <button onClick={(e) => removeCart(e, item)} className="btn btn-ghost btn-lg"><i className="fa-solid fa-trash" style={{ color: 'red' }} /></button>
                                     */}
                                     {log[6]}
                                  </th>
                                </tr>
                              );
                            })
                        }
                  </tbody>
                </table>
            </div> 
          )
        }
      </div>
      </div>
      
      
      
      
      <Footer />
    </>

  );
}
export default Profile;
