import { ETHEasydapp } from '../lib/dapp';

const dapp = new ETHEasydapp({
  httpProvider: 'https://kovan.infura.io/v3/47e9cbe62fd645f5a20ee72f1854481c',
});

test('current provider', async () => {
  const provider = await dapp.getProvider();
  expect((provider as any).host).toEqual(
    'https://kovan.infura.io/v3/47e9cbe62fd645f5a20ee72f1854481c'
  );
});

test('current network', async () => {
  const network = await dapp.getNetwork();
  expect(network).toBe(42);
});

test('current balance', async () => {
  const balance = await dapp.getBalance(
    '0xA2041921Fe81E04D56d688776C0D431682738AcF'
  );
  expect(typeof balance === 'string').toBeTruthy();
  expect(Number(balance)).toBeGreaterThanOrEqual(0);
});

test('genesis block', async () => {
  const block = await dapp.getBlock('genesis');
  expect(block.hash).toBe(
    '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9'
  );
});

test('current accounts', async () => {
  const accounts = await dapp.getAccounts();
  expect(Array.isArray(accounts)).toBeTruthy();
});
