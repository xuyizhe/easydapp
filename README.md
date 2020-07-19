# easydapp
Quickly develop a decentralized application compatible with multiple blockchain APIs.

## Installation
```console
$ npm install easydapp –save
```

The following modules are optional.
```console
$ npm install @easydapp/core –save
$ npm install @easydapp/eth –save
$ npm install @easydapp/utils –save
```

## Usage
### Creating an Ethereum instance.
```js
import { createEasydapp } from 'easydapp';

const easydapp = createEasydapp({
  type: 'eth',
  httpProvider: 'https://kovan.infura.io/v3/47e9cbe62fd645f5a20ee72f1854481c',
  contract: {
    // https://kovan.etherscan.io/address/0x8ee20844a883fb484e7416e6f8a8a69870c3ee00
    address: '0x8ee20844a883fb484e7416e6f8a8a69870c3ee00',
    jsonInterface: require('https://github.com/xuyizhe/easydapp/raw/master/packages/eth-test/build/contracts/SimpleStorage.json').abi
  }
});
```

Or
```js
import { ETHEasydapp } from @easydapp/eth';

const easydapp = new ETHEasydapp({
  httpProvider: 'https://kovan.infura.io/v3/47e9cbe62fd645f5a20ee72f1854481c',
  contract: {
    address: '0x8ee20844a883fb484e7416e6f8a8a69870c3ee00',
    jsonInterface: require('https://github.com/xuyizhe/easydapp/raw/master/packages/eth-test/build/contracts/SimpleStorage.json').abi
  }
});
```


```js
const network = await easydapp.getNetwork();
// network: 42 (kovan)

const balance = await easydapp.getBalance();
// balance: 0

const block = await easydapp.getBlock('genesis');
// block: {
  hash: '0x00…00',
  parentHash: '0x00…00',
  …
}

const accounts = await easydapp.getAccounts();
// accounts: ['0x00…00', '0x00…01']

const receipt = await easydapp.getTransaction('0x00…00');
// receipt: TransactionReceipt

const receipt = await easydapp.sendTransaction({
  from: '0x00…00',
  to: '0x00…01',
  value: '0',
});
// receipt: TransactionReceipt
```

### Interacting with your Contracts.
```js
const result1 = await easydapp.contract.invoke('get', []);
// result: '0'

await easydapp.contract.invoke('set', [
  easydapp.web3.utils.toWei('1', 'ether');
], {
  operation: 'send',
  gas: 100000
});

const result2 = await easydapp.contract.invoke('get', []);
// result: '1000000000000000000'
```

Or
```js
easydapp.contract.register('get', [], {
  operation: 'call',
});
easydapp.contract.register('set', [
  (n) => easydapp.web3.utils.toWei(String(n), 'ether')
], {
  operation: 'send',
  gas: 100000
});

const result1 = await easydapp.contract.dispatch('get', []);
// result: '0'

await easydapp.contract.dispatch('set', [1]);
await easydapp.contract.dispatch('set', [2]);
await easydapp.contract.dispatch('set', [3]);

const result2 = await easydapp.contract.dispatch('get', []);
// result: '3000000000000000000'
```

All test examples are in `./packages/eth-test/test/easydapp-SimpleStorage.js`.
