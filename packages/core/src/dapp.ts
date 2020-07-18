import { Contract, ContractOptions, ContractServices } from './contract';

export type Chain = 'eth' | 'ont' | 'neo';

export interface EasydappOptionsBase {
  appid?: string;
  contract?: ContractOptions;
}

export abstract class AbstractEasydapp<O extends EasydappOptionsBase, P>
  implements ContractServices<P> {
  readonly contract: Contract<O['contract'], P>;

  constructor(public readonly options: O) {
    this.contract = new Contract(options.contract, {
      invokeContractMethod: this.invokeContractMethod.bind(this),
    });
  }

  abstract get defaultAccount(): string | null;

  abstract async getNetwork(): Promise<string | number>;

  abstract async getProvider(): Promise<any>;

  abstract async getAccounts(): Promise<string[]>;

  abstract async getBalance(id: string): Promise<string | number>;

  abstract async getBlock(value: string | number): Promise<any>;

  abstract async sign(message: string, account: string): Promise<string>;

  abstract async getTransaction(hash: string): Promise<any>;

  abstract async sendTransaction(config: any): Promise<any>;

  abstract async invokeContractMethod<T>(
    method: string,
    params: P[],
    options: ContractOptions
  ): Promise<T>;
}
