// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// import "hardhat/console.sol";

contract LoyaltyToken is ERC20, ERC20Burnable, AccessControl {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _transactionId;

    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address private _contractDeployer;
    uint256 private interval;

    constructor() ERC20("Loyalty Tokens", "DE") {
        _contractDeployer = msg.sender;
        interval = 500;
        _mint(msg.sender, 1000 * 10 ** decimals());
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    struct transaction {
        uint256 transactionId;
        address customer;
        uint256 amount;
        uint256 currAmount;
        uint256 mintDate;
        bool isCredit;
        string detail;
    }
    event tokenMinted(
        uint256 transactionId,
        address customer,
        uint256 amount,
        uint256 currAmount,
        uint256 mintDate,
        bool isCredit,
        string detail
    );
    event fetchAll(uint256 totalAmount, transaction[]);

    mapping(uint256 => transaction) private transactionLog;
    // balanceOf
    mapping(address => uint256) public balanceFor;

    modifier isAdmin() {
        require(
            (hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender)),
            "You don't have admin rights!"
        );
        _;
    }

    modifier canMint() {
        require(
            (hasRole(SELLER_ROLE, msg.sender) ||
                hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender)),
            "You don't have the rights to mint Tokens"
        );
        _;
    }

    function mint(uint256 amount) external returns (bool) {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only Default Admin can create a supply"
        );
        _mint(msg.sender, amount * 10 ** decimals());
        return true;
    }

    function mintTo(
        address to,
        uint256 amount
    ) external canMint returns (bool) {
        require(to != address(0), "Cannot transfer tokens to zero address");

        _transactionId.increment();
        uint256 newTransId = _transactionId.current();
        _mint(to, amount);
        balanceFor[to] += amount;
        uint256 mintTime = block.timestamp;
        transactionLog[newTransId] = transaction(
            newTransId,
            to,
            amount,
            amount,
            mintTime,
            true,
            "Token Recieved for Purchase"
        );

        emit tokenMinted(
            newTransId,
            to,
            amount,
            amount,
            mintTime,
            true,
            "Tokens Recieved for Purchase"
        );

        return true;
    }

    function burnToken(
        address from,
        uint256 amount
    ) public isAdmin returns (bool) {
        require(from != address(0), "Cannot burn tokens from the zero address");
        _burn(from, amount);

        return true;
    }

    function validateTokens(uint256 transactionId) public returns (bool) {
        uint256 currTime = block.timestamp;
        uint256 mintTime = transactionLog[transactionId].mintDate;
        address from = transactionLog[transactionId].customer;
        uint256 amount = transactionLog[transactionId].amount;
        uint256 currAmount = transactionLog[transactionId].currAmount;
        if ((currTime > mintTime + interval) && (currAmount > 0)) {
            bool res = burnToken(from, amount);
            if (res) {
                _transactionId.increment();
                uint256 newTransId = _transactionId.current();
                balanceFor[from] -= currAmount;
                transactionLog[newTransId] = transaction(
                    newTransId,
                    from,
                    amount,
                    currAmount,
                    0,
                    false,
                    "Tokens Expired"
                );
                emit tokenMinted(
                    newTransId,
                    from,
                    amount,
                    currAmount,
                    0,
                    false,
                    "Tokens Expired"
                );
            } else revert("Tokens not Burned");

            return false;
        }

        return true;
    }

    function fetchTransactions(
        address _customer
    ) public returns (transaction[] memory) {
        uint256 totalTrans = _transactionId.current();
        uint256 transCount = 0;

        for (uint256 i = 1; i <= totalTrans; i++) {
            if (
                transactionLog[i].customer == _customer && (validateTokens(i))
            ) {
                transCount++;
            }
        }

        transaction[] memory log = new transaction[](transCount);
        uint256 currIndex = 0;

        for (uint256 i = 1; i <= totalTrans; i++) {
            if (transactionLog[i].customer == _customer) {
                transaction storage current = transactionLog[i];
                log[currIndex] = current;
                currIndex++;
            }
        }

        return log;
    }

    // function fetchValidTransactions(
    //     address _customer
    // ) public returns (uint256) {
    //     transaction[] memory allTransactions = fetchTransactions(_customer);
    //     uint256 validTransCount = 0;
    //     uint256 totalAmount = 0;
    //     for (uint256 i = 0; i < allTransactions.length; i++) {
    //         if (validateTokens(allTransactions[i].transactionId)) {
    //             validTransCount++;
    //         }
    //     }

    //     transaction[] memory validTransactions = new transaction[](
    //         validTransCount
    //     );
    //     uint256 currIndex = 0;

    //     for (uint256 i = 0; i < allTransactions.length; i++) {
    //         if (validateTokens(allTransactions[i].transactionId)) {
    //             validTransactions[currIndex] = allTransactions[i];
    //             currIndex++;
    //             if (validTransactions[currIndex].isCredit)
    //                 totalAmount += (validTransactions[currIndex].currAmount);
    //         }
    //     }

    //     emit fetchAll(totalAmount, validTransactions);
    //     return totalAmount;
    // }

    function assignSeller(address _to) public isAdmin {
        _grantRole(SELLER_ROLE, _to);
    }

    function removeSeller(address _from) public isAdmin {
        require(hasRole(SELLER_ROLE, _from), "Seller doesn't exists");
        _revokeRole(SELLER_ROLE, _from);
    }

    function assignAdmin(address _to) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only Default Admin can assign Admin Rights"
        );
        _grantRole(ADMIN_ROLE, _to);
    }

    function removeAdmin(address _from) public {
        require(hasRole(ADMIN_ROLE, _from), "Admin rights doesn't exists");
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only Default Admin can revoke Admin Rights"
        );
        _revokeRole(ADMIN_ROLE, _from);
    }

    function redeemTokens(uint256 amount) public returns (bool) {
        uint256 currBalance = balanceFor[msg.sender];
        require(amount > 0, "Tokens can't be negative");
        require(currBalance > amount, "Not enough Tokens!");

        _burn(msg.sender, amount);

        _transactionId.increment();
        uint256 newTransId = _transactionId.current();
        transactionLog[newTransId] = transaction(
            newTransId,
            msg.sender,
            amount,
            currBalance,
            0,
            false,
            "Tokens Redeemed"
        );

        emit tokenMinted(
            newTransId,
            msg.sender,
            amount,
            currBalance,
            0,
            false,
            "Tokens Redeemed"
        );
        transaction[] memory all = fetchTransactions(msg.sender);
        balanceFor[msg.sender] -= amount;

        for (uint i = 0; i < all.length; i++) {
            if (all[i].isCredit) {
                if (amount >= all[i].currAmount) {
                    amount -= all[i].currAmount;
                    all[i].currAmount = 0;
                } else {
                    all[i].currAmount -= amount;
                    amount = 0;
                    break;
                }
            }
        }
        return true;
    }

    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     virtual
    //     override(ERC721, AccessControl)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }
    // struct Customer{
    //     address accountId;

    // }
}
