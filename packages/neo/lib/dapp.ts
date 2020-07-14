// TODO:

import { AbstractEasydapp, EasydappOptionsBase } from '@easydapp/core/lib/dapp';
import { ContractOptions } from '@easydapp/core/lib/contract';

export type NEOContractParameter = string | number;

export interface NEOEasydappOptions extends EasydappOptionsBase {
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
  constructor(public readonly options: NEOEasydappOptions) {}
}
