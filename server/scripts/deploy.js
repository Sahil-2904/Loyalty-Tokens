// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
const {ethers} = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  

  const loyaltyToken = await ethers.deployContract("LoyaltyToken");

  await loyaltyToken.waitForDeployment();

  console.log(
    `Loyalty Token deployed to ${loyaltyToken.target}`
  );

  const data = {
    address: loyaltyToken.target,
    abi: (loyaltyToken.interface.format("json"))
  };
  try{  
    let filePath = path.join(__dirname, '..', '..', 'client','src','abstract', 'LoyaltyToken.json');
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
  catch(error){
    console.log(error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// async function main() {
//   const HelloWorld = await ethers.getContractFactory("LoyaltyToken");

//   // Start deployment, returning a promise that resolves to a contract object
//   const hello_world = await HelloWorld.deploy("LoyaltyToken");
//   console.log("Contract deployed to address:", hello_world.address);
// }

// main()
//  .then(() => process.exit(0))
//  .catch(error => {
//    console.error(error);
//    process.exit(1);
//  });