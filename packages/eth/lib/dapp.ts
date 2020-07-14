import Web3 from 'web3';
import {
  provider,
  Transaction,
  TransactionConfig,
  TransactionReceipt,
  BlockNumber,
} from 'web3-core';
import { BlockTransactionString, BlockTransactionObject } from 'web3-eth';
import { AbiItem } from 'web3-utils';
import { AbstractEasydapp, EasydappOptionsBase } from '@easydapp/core/lib/dapp';
import { ContractOptions } from '@easydapp/core/lib/contract';

export type ETHContractParameter = string | number;

export interface ETHEasydappOptions extends EasydappOptionsBase {
  type?: 'eth';
  httpProvider?: string;
  contract?: ETHContractOptions;
}

export interface ETHContractOptions extends ContractOptions {
  address: string;
  jsonInterface: AbiItem[];
  data?: string;
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export class ETHEasydapp extends AbstractEasydapp<
  ETHEasydappOptions,
  ETHContractParameter
> {
  readonly web3: Web3;

  constructor(public readonly options: ETHEasydappOptions) {
    super(options);
    const httpProvider = new Web3.providers.HttpProvider(options.httpProvider);
    this.web3 = new Web3(Web3.givenProvider || httpProvider);
  }

  get defaultAccount(): string | null {
    return this.web3.eth.defaultAccount;
  }

  async getNetwork(): Promise<number> {
    return await this.web3.eth.net.getId();
  }

  async getProvider(): Promise<provider> {
    return this.web3.currentProvider;
  }

  async getAccounts(): Promise<string[]> {
    return await this.web3.eth.getAccounts();
  }

  async getBalance(accountId: string): Promise<string> {
    return await this.web3.eth.getBalance(accountId);
  }

  async getBlock(
    value: BlockNumber | string
  ): Promise<BlockTransactionString | BlockTransactionObject> {
    return await this.web3.eth.getBlock(value);
  }

  async sign(message: string, account: string): Promise<string> {
    return await this.web3.eth.sign(
      this.web3.utils.utf8ToHex(message),
      account
    );
  }

  async getTransaction(hash: string): Promise<Transaction> {
    return await this.web3.eth.getTransaction(hash);
  }

  async sendTransaction(
    transactionConfig: TransactionConfig
  ): Promise<TransactionReceipt> {
    return await this.web3.eth.sendTransaction(transactionConfig);
  }

  async invokeContractMethod<T>(
    method: string,
    params: ETHContractParameter[],
    options: ETHContractOptions
  ): Promise<T> {
    return await new this.web3.eth.Contract(
      options.jsonInterface,
      options.address
    ).methods[method](...params).call();
  }
}
