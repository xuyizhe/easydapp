const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', (accounts) => {
  it('should set an uint number correctly', async () => {
    const instance = await SimpleStorage.deployed();
    const initialData = await instance.get();
    assert.equal(initialData.toNumber(), 0, 'storedData should be 0 initially');
    await instance.set(1);
    const changedData = await instance.get();
    assert.equal(changedData.toNumber(), 1, 'storedData should be set to 1');
  });
});
