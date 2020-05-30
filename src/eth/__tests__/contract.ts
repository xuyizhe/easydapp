import { ETHEasydapp } from '../';

const dapp = new ETHEasydapp({
  httpProvider: 'https://kovan.infura.io/v3/47e9cbe62fd645f5a20ee72f1854481c',
  contract: {
    address: '0x8ee20844a883fb484e7416e6f8a8a69870c3ee00',
    jsonInterface: require('../../../examples/simple-storage/eth/abi.json'),
  },
});

test('invoke', async () => {
  const result1 = await dapp.contract.invoke('set', [
    dapp.web3.utils.toHex('12'),
  ]);
  const result2 = await dapp.contract.invoke('get', []);
  expect(result2).toBe('0');
});

test('register and dispatch', async () => {
  dapp.contract.register('set', [dapp.web3.utils.toWei]);
  dapp.contract.dispatch('set', ['1']);
  expect(dapp.contract.methods.has('set')).toBeTruthy();
  expect(dapp.contract.methods.has('get')).not.toBeTruthy();
});
