pragma solidity ^0.5.0;

/**
 * @dev Implementation of the Counter contract for demo
 *
 */
contract Counter {
    uint256 counter;

    event Incremented(address from, uint256 by);

    /**
    * @dev increment counter of `value`
    */
    function increment(uint256 value) public {
        counter += value;
        emit Incremented(msg.sender, value);
    }
}
