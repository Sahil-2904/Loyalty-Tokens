import React, { useEffect, useState } from 'react';
function Admin(){
    const [transactions,setTransactions] = useState([]);
    useEffect(() => {
            const fetchTransactions = async () => {
              try {
                const response = await fetch("http://localhost:3000/transactions");
                const transactionData = await response.json();
                console.log(transactionData);
                setTransactions(transactionData);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
      
            fetchTransactions();
    },[]);
    
    return (
        <div>
            {transactions.length !== 0 ?
            
                (transactions.map((transaction,index) => {
                    return (
                        <div key={index}>
                            <h2>{transaction.name}</h2>
                            <p>{transaction.email}</p>
                            <p>{transaction.walletadd}</p>
                        </div>
                        
                    )
                }))
                :
                (<></>)
            }
        </div>
    );
}
export default Admin;