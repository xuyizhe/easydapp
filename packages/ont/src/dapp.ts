// TODO:

import {
  AbstractEasydapp,
  EasydappOptionsBase,
  ContractOptions,
} from '@easydapp/core';

export type ONTContractParameter = string | number;

export interface ONTEasydappOptions extends EasydappOptionsBase {
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
  constructor(public readonly options: ONTEasydappOptions) {}
}
