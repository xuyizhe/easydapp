// TODO:

import {
  AbstractEasydapp,
  EasydappOptionsBase,
  ContractOptions,
} from '@easydapp/core';

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
