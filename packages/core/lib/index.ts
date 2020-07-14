import { ETHEasydappOptions, ETHEasydapp } from '@easydapp/eth';
import { ONTEasydappOptions, ONTEasydapp } from '@easydapp/ont';
import { NEOEasydappOptions, NEOEasydapp } from '@easydapp/neo';

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
