// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract test {
    uint256 public count = 0;

    function getAddress() public view returns (address) {
        return msg.sender;
    }

    function increaseCount() public {
        count++;
    }

    function decreaseCount() public {
        require(count > 0, "Count cannot be less than 0");
        count--;
    }

    function increaseCountBy(uint256 _count) public {
        count += _count;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
