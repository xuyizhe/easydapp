import { ETHEasydappOptions, ETHEasydapp } from './eth';
import { ONTEasyappOptions, ONTEasydapp } from './ont';
import { NEOEasyappOptions, NEOEasydapp } from './neo';

export type DappOptions =
  | ETHEasydappOptions
  | ONTEasyappOptions
  | NEOEasyappOptions;

export function createEasydapp(options: DappOptions) {
  switch (options.type) {
    case 'neo':
      return new NEOEasydapp(options);
    case 'ont':
      return new ONTEasydapp(options);
    case 'eth':
    default:
      return new ETHEasydapp(options);
  }
}
