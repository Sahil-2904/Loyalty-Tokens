import React, { useEffect, useState } from 'react';
// import products from '../products';
function Seller(){
    const [products,setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
        const response = await fetch("http://localhost:3000/products");
        const p = await response.json();
        console.log(p);
        setProducts(p);
        }
        getProducts();
    },[]);
    const [transactions,setTransactions] = useState([]);
    const [users,setUsers] = useState([]);
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
            const getUsers = async () => {
                try{
                    const response = await fetch("http://localhost:3000/users");
                    const users = await response.json();
                    console.log(users);
                    setUsers(users);
                }catch(error){
                    console.log("Error getting users",error);
                }
            };
            getUsers();
            fetchTransactions();
    },[]);

    const add = async (e,index) => {
        const pro = products[index];
        console.log(pro);
        try{
            const response = fetch('http://localhost:3000/product',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(pro),
                }
            )
        }
        catch(e){
            console.log("Error adding products",e);
        }
    }
    
    return (
        <>
            <div>
            {users.length !== 0 ?
            
                (users.map((user,index) => {
                    return (
                        <div key={index}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.wallet}</p>
                        </div>
                        
                    )
                }))
                :
                (<><p>No Users</p></>)
            }
        </div>
        {/* <div className='flex flex-col'>
            {
                products.map((product,index) => {
                    return (
                        <>
                            <div className='flex gap-10'>
                                <p>{index+1}</p>
                                <p>{product.title}</p>
                                <button onClick={(e) => add(e,index)}>Add</button>
                            </div>
                        </>
                    )
                })
            }
        </div> */}
        </>
        
    );
}
export default Seller;