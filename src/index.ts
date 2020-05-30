import { ETHEasydappOptions, ETHEasydapp } from './eth';
import { ONTEasydappOptions, ONTEasydapp } from './ont';
import { NEOEasydappOptions, NEOEasydapp } from './neo';

export type EasydappInstance = ETHEasydapp | ONTEasydapp | NEOEasydapp;

export type EasydappOptions =
  | ETHEasydappOptions
  | ONTEasydappOptions
  | NEOEasydappOptions;

export function createEasydapp(options: ETHEasydappOptions): ETHEasydapp;
export function createEasydapp(options: ONTEasydappOptions): ONTEasydapp;
export function createEasydapp(options: NEOEasydappOptions): NEOEasydapp;
export function createEasydapp(options: EasydappOptions): EasydappInstance {
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
