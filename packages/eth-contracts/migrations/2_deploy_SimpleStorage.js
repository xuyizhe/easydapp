const SimpleStorage = artifacts.require('SimpleStorage');

module.exports = function(deployer, network) {
  deployer.deploy(SimpleStorage);
};
