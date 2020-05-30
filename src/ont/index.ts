// TODO:

import { AbstractEasydapp, EasydappOptionsBase } from '../core/dapp';
import { ContractOptions } from '../core/contract';

export type ONTContractParameter = string | number;

export interface ONTEasyappOptions extends EasydappOptionsBase {
  type?: 'ont';
  contract?: ONTContractOptions;
}

export interface ONTContractOptions extends ContractOptions {
  address: string;
  data?: string;
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export class ONTEasydapp {
  constructor(public readonly options: ONTEasyappOptions) {}
}
