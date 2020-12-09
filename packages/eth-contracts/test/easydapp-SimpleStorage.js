const SimpleStorage = artifacts.require('SimpleStorage');
const ETHEasydapp = require('@easydapp/eth').ETHEasydapp;

async function createEasydapp() {
  const simpleStorageInstance = await SimpleStorage.deployed();
  const expectedProvider = SimpleStorage.currentProvider.host;
  return new ETHEasydapp({
    httpProvider: expectedProvider,
    contract: {
      address: simpleStorageInstance.address,
      jsonInterface: simpleStorageInstance.abi,
      gas: 100000,
    },
  });
}

contract('SimpleStorage', (accounts) => {
  it('should set an uint number correctly', async () => {
    const easydapp = await createEasydapp();
    const initialData = await easydapp.contract.invoke('get', []);
    assert.equal(Number(initialData), 0, 'storedData should be 0 initially');
    await easydapp.contract.invoke('set', [1], {
      operation: 'send',
      from: accounts[0],
    });
    const changedData = await easydapp.contract.invoke('get', []);
    assert.equal(Number(changedData), 1, 'storedData should be set to 1');
  });

  it('should set an uint number correctly by dispatching', async () => {
    const easydapp = await createEasydapp();
    easydapp.contract.register('get', []);
    easydapp.contract.register('set', [web3.utils.toWei], {
      operation: 'send',
      from: accounts[0],
    });
    await easydapp.contract.dispatch('set', ['1']);
    const storedData = await easydapp.contract.dispatch('get', []);
    assert.equal(storedData, web3.utils.toWei('1', 'ether'));
  });
});
