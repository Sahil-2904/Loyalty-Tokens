# Loyalty and Rewards Rewards using Fungible Tokens

The primary objective is to enhance customer loyalty and engagement by offering a more attractive, user-friendly, and rewarding loyalty program. Blockchain's features can facilitate seamless interactions and transparent reward tracking, leading to increased customer participation.
### Objectives :

1. The key objective is to simplify the process of earning and redeeming rewards.
2. To enhance the security and privacy of customer data.
3. To create a tamper-proof and trustworthy record of transactions, improving the overall efficiency of the loyalty program ecosystem.
4. To use blockchain-based rewards as incentives to encourage specific customer behaviors, such as repeat purchases, referrals, and social engagement
5. The Loyalty Tokens should be decaying in nature, in that, after a certain period their use for the redemption of benefits offered by the brand/retailer will expire.
6. GUI-based tool that doesn’t require knowledge of any Blockchain programming to use by Brands and Retailers.

### Solution Proposed :

Implemented a ERC-20 smart contract on the blockchain that can create and manage fungible tokens representing loyalty points.

**1. Fungible Loyalty Token Issuance:**
- When a user makes a purchase, they will be eligible to receive fungible Loyalty Tokens.
- The issuance will include details such as the date of token issuance and the amount of tokens received by the user.

**2. Token Usage for Exclusive Offers:**
- Users can utilize the received Loyalty Tokens to redeem exclusive deals and offers offered by the loyalty program.
- The loyalty program will provide a platform for users to explore and select the available deals and offers for redemption.
- Multiple earning avenues, including referrals, challenges, and more, will empower users to earn additional loyalty tokens.

**3. Retailer and Seller Involvement:**

- Retailers and sellers participating in the program will have the capability to reward their customers with Loyalty Tokens.
- These tokens can serve as rewards for demonstrating loyalty to their brand or for achieving certain milestones.

**4. Token Decay and Expiry:**
- The Loyalty Tokens will have a decaying nature, meaning they will expire after a predetermined period of time.
- Tokens will carry an expiration date, and any unused tokens will automatically expire once the specified time has elapsed.

## Tech Stack

**Smart Contracts:** Solidity, Hardhat, Chai

- Deployment : Polygon Testnet Mumbai

**Client:** React, Redux, Material UI, TailwindCSS, Etherjs

**Admin:** React, Redux, Express, Material UI, Ether JS

**Server:** Node, Express, MongoDB

### Installation Steps:

To use this application, you must have MetaMask wallet or any other wallet installed on your device. You can download MetaMask from the following link: [https://metamask.io/](https://metamask.io/)

Once you have installed the wallet, you need to connect to Polygon Mumbai Testnet using the following:

- **Network Name:** Mumbai Testnet
- **RPC link:** [https://polygon-mumbai.g.alchemy.com/v2/api-key](https://polygon-mumbai.g.alchemy.com/v2/api-key)  
 (Contact authors or Get from Alchemy)
- **Chain ID:** 80001
- **Currency Symbol:** MATIC
- **Block Explorer URL:** https://mumbai.polygonscan.com/

To install and run this application on your local machine, follow the steps below:

1. Clone the repository to your local machine.

```shell
git clone https://github.com/Sahil-2904/Loyalty-Tokens/
```

2. Navigate to the project directory.
```shell
cd Loyalty-Tokens/
```
3.  Install the server side dependencies.
```shell
cd server/
npm install
```
4. Run the back-end server.
```shell
nodemon app.js
```
5. Install client side dependencies.
```shell
cd ..
cd /client
npm install
```
6. Run the front-end server
```shell
npm run dev
```

The web application can be accessed at http://localhost:5173

The video link can be accessed at https://drive.google.com/file/d/1flqGTgWaP-fgPExeRH1vjbHiJPp29q4f/view

#### Team Members
1. Mahim Gupta
2. Sahil Dhoot
3. Sankalp Shrivasatava
