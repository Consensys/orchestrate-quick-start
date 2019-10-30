pragma solidity ^0.5.0;


/**
 * @dev Implementation of the Counter contract for demo
 *
 */
contract Counter {
  uint counter;
    
  event Incremented(address from, uint by);
  
  /**
    * @dev increment counter of `value`
    */
  function incrementBonjour(uint value) public {
    counter += value;
    emit Incremented(msg.sender, value);
  }
}