import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SettingsState {
  filter: string;
  isFavouritesShowed: boolean;
  isSafeShowed: boolean;
  isUnsafeShowed: boolean;
}

export function createInitialState(): SettingsState {
  return {
    filter: '',
    isFavouritesShowed: true,
    isSafeShowed: true,
    isUnsafeShowed: true,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings' })
export class SettingsStore extends Store<SettingsState> {

  constructor() {
    super(createInitialState());
  }

}
