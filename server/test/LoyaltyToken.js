const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await ethers.provider.getBalance(lock.target)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = await time.latest();
      const Lock = await ethers.getContractFactory("Lock");
      await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});
const { expect } = require('chai');
const { ethers } = require("hardhat")

describe('LoyaltyToken', function () {
  let LoyaltyToken;
  let loyaltyToken;
  let owner;
  let seller;
  let admin;

  before(async function () {
    [owner, seller, admin, customer] = await ethers.getSigners();
    console.log(owner);
    console.log(seller);
    console.log(admin);
    LoyaltyToken = await ethers.getContractFactory('LoyaltyToken');
    loyaltyToken = await LoyaltyToken.connect(owner).deploy();
    await loyaltyToken.waitForDeployment();
  });

  it('should deploy the contract', async function () {
    expect(loyaltyToken.address).to.not.equal(0);
  });

  it('should mint tokens', async function () {
    // const amountToMint = ethers.parseEther('1000'); // Mint 100 tokens
    // // console.log(amountToMint);
    // await loyaltyToken.mint(amountToMint);
    const balance = await loyaltyToken.balanceOf(owner.address);

    expect(balance).to.equal(1000000000000000000000n);
  });
  it('should mint tokens to a specific address', async function () {
    const amountToMint = ethers.parseEther('50'); // Mint 50 tokens
    const recipient = customer.address;

    await loyaltyToken.connect(owner).mintTo(recipient, amountToMint);
    const balance = await loyaltyToken.balanceOf(recipient);

    expect(balance).to.equal(amountToMint);
  });

  it('should burn tokens', async function () {
    const initialBalance = await loyaltyToken.balanceOf(owner.address);
    const amountToBurn = ethers.parseEther('30'); // Burn 30 tokens

    await loyaltyToken.connect(owner).burnToken(owner.address, amountToBurn);
    const updatedBalance = await loyaltyToken.balanceOf(owner.address);

    expect(updatedBalance).to.equal(initialBalance-amountToBurn);
  });

  it('should redeem tokens', async function () {
    const initialBalance = await loyaltyToken.balanceOf(customer.address);
    const amountToRedeem = ethers.parseEther('20'); // Redeem 20 tokens

    await loyaltyToken.connect(customer).redeemTokens(amountToRedeem);
    const updatedBalance = await loyaltyToken.balanceOf(customer.address);

    expect(updatedBalance).to.equal(initialBalance-(amountToRedeem));
  });

  it('should fetch transactions for a customer', async function () {
    const customer = seller.address;

    await loyaltyToken.connect(owner).mintTo(customer, ethers.parseEther('50'));

    const transactions = await loyaltyToken.fetchTransactions(customer);
    expect(transactions.length).to.equal(1);
    expect(transactions[0].amount).to.equal(ethers.parseEther('50'));
  });


  it('should prevent unauthorized minting', async function () {
    const unauthorized = admin.address;

    await expect(loyaltyToken.connect(unauthorized).mint(ethers.parseEther('100')))
      .to.be.revertedWith('Only Default Admin can create a supply');
  });

  it('should prevent minting to the zero address', async function () {
    await expect(loyaltyToken.connect(owner).mintTo(ethers.constants.AddressZero, ethers.parseEther('50')))
      .to.be.revertedWith('Cannot transfer tokens to zero address');
  });

  it('should prevent burning from the zero address', async function () {
    await expect(loyaltyToken.connect(owner).burnToken(ethers.constants.AddressZero, ethers.parseEther('30')))
      .to.be.revertedWith('Cannot burn tokens from the zero address');
  });

  it('should prevent non-admin from assigning sellers', async function () {
    const nonAdmin = seller.address;

    await expect(loyaltyToken.connect(nonAdmin).assignSeller(seller.address))
      .to.be.revertedWith('Only Default Admin can assign Admin Rights');
  });

  it('should prevent non-admin from removing sellers', async function () {
    const nonAdmin = seller.address;

    await expect(loyaltyToken.connect(nonAdmin).removeSeller(seller.address))
      .to.be.revertedWith('Only Default Admin can revoke Admin Rights');
  });

  it('should prevent non-admin from assigning admins', async function () {
    const nonAdmin = seller.address;

    await expect(loyaltyToken.connect(nonAdmin).assignAdmin(admin.address))
      .to.be.revertedWith('Only Default Admin can assign Admin Rights');
  });

  it('should prevent non-admin from removing admins', async function () {
    const nonAdmin = seller.address;

    await expect(loyaltyToken.connect(nonAdmin).removeAdmin(admin.address))
      .to.be.revertedWith('Only Default Admin can revoke Admin Rights');
  });

  it('should prevent non-sellers from minting tokens', async function () {
    const nonSeller = admin.address;

    await expect(loyaltyToken.connect(nonSeller).mintTo(nonSeller, ethers.utils.parseEther('50')))
      .to.be.revertedWith('You don\'t have the rights to mint Tokens');
  });

  it('should validate and burn expired tokens', async function () {
    const customer = seller.address;

    await loyaltyToken.connect(owner).mintTo(customer, ethers.utils.parseEther('100'));
    const transId = await loyaltyToken._transactionId();

    // Fast-forward time by interval (simulating token expiration)
    await ethers.provider.send('evm_increaseTime', [interval]);
    await ethers.provider.send('evm_mine');

    await loyaltyToken.validateTokens(transId);
    const balance = await loyaltyToken.balanceOf(customer);

    expect(balance).to.equal(0);
  });

  it('should prevent non-admin from validating tokens', async function () {
    const nonAdmin = seller.address;
    const customer = seller.address;

    await loyaltyToken.connect(owner).mintTo(customer, ethers.utils.parseEther('50'));

    const transId = await loyaltyToken._transactionId();

    await expect(loyaltyToken.connect(nonAdmin).validateTokens(transId))
      .to.be.revertedWith('Only for Credited Tokens');
  });

  it('should prevent customers from assigning sellers', async function () {
    const customer = seller.address;

    await expect(loyaltyToken.connect(customer).assignSeller(seller.address))
      .to.be.revertedWith('You don\'t have admin rights!');
  });

  it('should prevent customers from redeeming more tokens than their balance', async function () {
    const customer = seller.address;

    await loyaltyToken.connect(owner).mintTo(customer, ethers.utils.parseEther('50'));

    await expect(loyaltyToken.connect(customer).redeemTokens(ethers.utils.parseEther('60')))
      .to.be.revertedWith('Not enough Tokens!');
  });



  // Write more test cases here based on your contract's functions and logic
  // For example, test minting to a specific address, burning tokens, etc.
});
