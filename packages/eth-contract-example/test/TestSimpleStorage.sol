pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {
    function testInitialStorageData() public {
        SimpleStorage simple = new SimpleStorage();

        uint expected = 0;

        Assert.equal(simple.get(), expected, "storedData should be 0 initially");
    }

    function testSet() public {
        SimpleStorage simple = new SimpleStorage();

        uint expected = 666;

        simple.set(expected);

        Assert.equal(simple.get(), expected, "storedData should be set to 666");
    }
}
