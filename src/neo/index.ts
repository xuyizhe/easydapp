// TODO:

import { AbstractEasydapp, EasydappOptionsBase } from '../core/dapp';
import { ContractOptions } from '../core/contract';

export type NEOContractParameter = string | number;

export interface NEOEasyappOptions extends EasydappOptionsBase {
  type?: 'neo';
  contract?: NEOContractOptions;
}

export interface NEOContractOptions extends ContractOptions {
  address: string;
  data?: string;
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export class NEOEasydapp {
  constructor(public readonly options: NEOEasyappOptions) {}
}
