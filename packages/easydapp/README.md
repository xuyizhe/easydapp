# `easydapp`
基于一套统一的API快速开发兼容多条链的区块链应用

## 安装
```console
$ npm install easydapp –save
```

## 使用
```js
import { createEasydapp } from 'easydapp';

const dapp = createEasydapp({
  // 公链类型eth/ont/neo/…
  type: 'eth',
  
  appid: 'Dapp Sample',
  
  httpProvider: 'https://kovan.infura.io/v3/47e9cbe62fd645f5a20ee72f1854481c',
  
  contract: {
    // 合约地址(https://kovan.etherscan.io/address/0x8ee20844a883fb484e7416e6f8a8a69870c3ee00)
    address: '0x8ee20844a883fb484e7416e6f8a8a69870c3ee00',
    
    // 合约程序接口定义
    jsonInterface: require('./examples/simple-storage/eth/abi.json')
  }
});
```

或仅根据模块所需使用
```js
import { ETHEasydapp } from 'easydapp/dist/eth';

const dapp = new ETHEasydapp({
  appid: 'Dapp Sample',
  httpProvider: 'https://kovan.infura.io/v3/47e9cbe62fd645f5a20ee72f1854481c',
  contract: {
    address: '0x8ee20844a883fb484e7416e6f8a8a69870c3ee00',
    jsonInterface: require('./examples/simple-storage/eth/abi.json')
  }
});
```

```js
const network = await dapp.getNetwork();
// network: 42 (kovan)

const accounts = await dapp.getAccounts();
// accounts: ['0x00…00']

const balance = await dapp.getBalance();
// balance: 0

const receipt = await sendTransaction({
  from: '0x00…00',
  to: '0x00…01',
  value: '0',
});
// receipt: TransactionReceipt
```

Contract
```js

const result = await dapp.contract.invoke('contractMethod1', ['arg1'])
// result: Error (contractMethod1 is not defined)

const result = await dapp.contract.invoke('set', [toHex('1')])
// result: Success

// Or
dapp.contract.register('set', [toHex])
dapp.contract.register('other', [toHex, toWei, reverseHex, utf8ToHex], {
  address: '0x00000..000',
  jsonInterface: […]
})

const result1 = await dapp.contract.dispatch('set', ['1'])
const result2 = await dapp.contract.dispatch('other', ['1', '0', '0', 'Some text'])
```
