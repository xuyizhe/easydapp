const Migrations = artifacts.require('Migrations');
const ETHEasydapp = require('@easydapp/eth').ETHEasydapp;

const expectedProvider = Migrations.currentProvider.host;

const easydapp = new ETHEasydapp({
  httpProvider: expectedProvider,
});

contract('Migrations', (accounts) => {
  it('should get the matched provider', async () => {
    const provider = await easydapp.getProvider();
    assert.equal(provider.host, expectedProvider);
  });

  it('should get the matched network ID', async () => {
    const network = await easydapp.getNetwork();
    assert.equal(network, Migrations.network_id);
  });

  it('should get the matched test accounts', async () => {
    const block0 = await easydapp.getBlock('genesis');
    const block1 = await easydapp.getBlock(1);
    assert.equal(
      block0.parentHash,
      '0x0000000000000000000000000000000000000000000000000000000000000000'
    );
    assert.equal(block0.hash, block1.parentHash);
  });

  it('should get the matched test accounts', async () => {
    const result = await easydapp.getAccounts();
    assert.equal(result[0], accounts[0]);
    assert.equal(result[1], accounts[1]);
  });

  it('should get the balance of the test accounts', async () => {
    const balance = await easydapp.getBalance(accounts[0]);
    const balance1 = await easydapp.getBalance(accounts[1]);
    const balance2 = await easydapp.getBalance(accounts[2]);
    const BN = web3.utils.BN;
    assert.isTrue(new BN(balance).gt(new BN(web3.utils.toWei('1', 'ether'))));
    assert(Number(web3.utils.fromWei(balance1, 'ether')) <= 100);
    assert.equal(balance2, web3.utils.toWei('100', 'ether'));
  });
});
