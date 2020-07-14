import { identity } from '@easydapp/utils';

export interface ContractOptions {
  address?: string;
}

export interface ContractServices<P> {
  invokeContractMethod<T>(
    method: string,
    params: P[],
    options: ContractOptions
  ): Promise<T>;
}

export class Contract<O extends ContractOptions, P> {
  public readonly methods: Map<
    string,
    O & { formatters: Function[] | never[] }
  > = new Map();

  constructor(
    public readonly options: O,
    public readonly services: ContractServices<P>
  ) {}

  async invoke<T>(method: string, params: P[], options?: O): Promise<T> {
    return await this.services.invokeContractMethod<T>(
      method,
      params,
      Object.assign({}, this.options, options)
    );
  }

  async register(
    method: string,
    formatters: Function[] | never[],
    options?: O
  ): Promise<void> {
    this.methods.set(
      method,
      Object.assign({ formatters }, this.options, options)
    );
  }

  async dispatch<T>(
    method: string,
    params: P[],
    extendOptions?: O
  ): Promise<T> {
    if (!this.methods.has(method)) {
      console.warn(`${method} not registered.`);
      return;
    }
    const options = Object.assign({}, this.methods.get(method), extendOptions);
    return await this.invoke<T>(
      method,
      params.map((a, i) => (options.formatters[i] || identity)(a)),
      options
    );
  }
}
