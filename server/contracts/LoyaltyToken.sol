// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LoyaltyToken is ERC20, ERC20Burnable, AccessControl {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _transactionId;

    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address private _contractDeployer;
    uint256 private interval;

    mapping(uint256 => transaction) private transactionLog;
    mapping(address => uint256) public balanceFor;

    constructor() ERC20("Loyalty Tokens", "DE") {
        _contractDeployer = msg.sender;
        interval = 500;
        _mint(msg.sender, 1000000000 * decimals());
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

    modifier isAdmin() {
        require(
            (hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender)),
            "You don't have admin rights!"
        );
        _;
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
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

    function mintTo(address to, uint256 amount) external returns (bool) {
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
            "Token Recieved for Loyalty"
        );

        emit tokenMinted(
            newTransId,
            to,
            amount,
            amount,
            mintTime,
            true,
            "Tokens Recieved for Loyalty"
        );

        return true;
    }

    function mintFor(address to, uint256 amount) external returns (bool) {
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

    function fetchTransactions(
        address _customer
    ) public view returns (transaction[] memory) {
        uint256 totalTrans = _transactionId.current();
        uint256 transCount = 0;

        for (uint256 i = 1; i <= totalTrans; i++) {
            if (transactionLog[i].customer == _customer) {
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

    function redeemTokens(uint256 amount) public returns (bool) {
        uint256 currBalance = balanceFor[msg.sender];
        require(amount > 0, "Tokens can't be negative");
        require(currBalance >= amount, "Not enough Tokens!");

        _burn(msg.sender, amount);

        _transactionId.increment();
        uint256 newTransId = _transactionId.current();
        uint256 time = block.timestamp;
        transactionLog[newTransId] = transaction(
            newTransId,
            msg.sender,
            amount,
            currBalance,
            time,
            false,
            "Tokens Redeemed"
        );

        emit tokenMinted(
            newTransId,
            msg.sender,
            amount,
            currBalance,
            time,
            false,
            "Tokens Redeemed"
        );
        balanceFor[msg.sender] -= amount;
        return true;
    }

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

    function validateTokens(uint256 transactionId) public returns (bool) {
        require(
            transactionLog[transactionId].isCredit,
            "Only for Credited Tokens"
        );
        uint256 currTime = block.timestamp;
        uint256 mintTime = transactionLog[transactionId].mintDate;
        address from = transactionLog[transactionId].customer;
        uint256 amount = transactionLog[transactionId].amount;
        uint256 currAmount = transactionLog[transactionId].currAmount;

        if ((currTime > mintTime + interval) && (currAmount > 0)) {
            bool res = burnToken(from, amount);
            uint256 time = block.timestamp;
            if (res) {
                _transactionId.increment();
                uint256 newTransId = _transactionId.current();
                balanceFor[from] -= currAmount;
                transactionLog[newTransId] = transaction(
                    newTransId,
                    from,
                    amount,
                    currAmount,
                    time,
                    false,
                    "Tokens Expired"
                );
                emit tokenMinted(
                    newTransId,
                    from,
                    amount,
                    currAmount,
                    time,
                    false,
                    "Tokens Expired"
                );
            } else revert("Tokens not Burned");

            return false;
        }

        return true;
    }
}
