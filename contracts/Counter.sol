pragma solidity ^0.5.0;


contract Counter {
  uint counter;
    
  event Incremented(address from, uint by);

  function increment(uint value) public {
    counter += value;
    emit Incremented(msg.sender, value);
  }
}