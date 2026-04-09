// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

/// @title ContributionToken
/// @notice Non-transferable contribution score token with one-time claim and invite rewards.
contract ContributionToken is Initializable, ERC20Upgradeable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant MINING_ROLE = keccak256("MINING_ROLE");

    uint256 public claimAmount;
    uint256 public inviteReward;

    mapping(address => bool) public hasClaimed;
    mapping(address => address) public inviterOf;
    mapping(address => uint256) public inviteCount;

    error AlreadyClaimed();
    error InvalidAdmin();
    error NonTransferable();
    error ApprovalDisabled();

    event Claimed(address indexed user, uint256 amount, address indexed referrer);
    event InviteReward(address indexed inviter, address indexed invitee, uint256 amount);
    event InviterBound(address indexed user, address indexed inviter);
    event BurnedForMining(address indexed user, uint256 amount, address indexed operator);
    event ClaimAmountUpdated(uint256 amount);
    event InviteRewardUpdated(uint256 amount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory name_, string memory symbol_, address admin_) external initializer {
        if (admin_ == address(0)) revert InvalidAdmin();

        __ERC20_init(name_, symbol_);
        __Pausable_init();
        __AccessControl_init();

        claimAmount = 100;
        inviteReward = 50;

        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
        _grantRole(PAUSER_ROLE, admin_);
        _grantRole(UPGRADER_ROLE, admin_);
    }

    /// @dev Contribution points are integer units.
    function decimals() public pure override returns (uint8) {
        return 0;
    }

    function claim(address referrer) external whenNotPaused {
        if (hasClaimed[msg.sender]) revert AlreadyClaimed();

        hasClaimed[msg.sender] = true;
        _mint(msg.sender, claimAmount);

        bool rewarded = _tryBindAndReward(msg.sender, referrer);
        emit Claimed(msg.sender, claimAmount, rewarded ? referrer : address(0));
    }

    function burn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
        emit BurnedForMining(msg.sender, amount, msg.sender);
    }

    function burnByModule(address user, uint256 amount) external whenNotPaused onlyRole(MINING_ROLE) {
        _burn(user, amount);
        emit BurnedForMining(user, amount, msg.sender);
    }

    function setClaimAmount(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        claimAmount = amount;
        emit ClaimAmountUpdated(amount);
    }

    function setInviteReward(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        inviteReward = amount;
        emit InviteRewardUpdated(amount);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function transfer(address, uint256) public pure override returns (bool) {
        revert NonTransferable();
    }

    function transferFrom(address, address, uint256) public pure override returns (bool) {
        revert NonTransferable();
    }

    function approve(address, uint256) public pure override returns (bool) {
        revert ApprovalDisabled();
    }

    function _update(address from, address to, uint256 value) internal override whenNotPaused {
        bool isMint = from == address(0);
        bool isBurn = to == address(0);
        if (!isMint && !isBurn) revert NonTransferable();
        super._update(from, to, value);
    }

    function _authorizeUpgrade(address) internal override onlyRole(UPGRADER_ROLE) {}

    function _tryBindAndReward(address invitee, address referrer) internal returns (bool) {
        if (referrer == address(0)) return false;
        if (referrer == invitee) return false;
        if (!hasClaimed[referrer]) return false;

        inviterOf[invitee] = referrer;
        unchecked {
            inviteCount[referrer] += 1;
        }
        _mint(referrer, inviteReward);
        emit InviterBound(invitee, referrer);
        emit InviteReward(referrer, invitee, inviteReward);
        return true;
    }

    uint256[50] private __gap;
}



