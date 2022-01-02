import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {SettingsState, SettingsStore} from './settings.store';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';
import * as removeAccent from 'remove-accents';

@Injectable({ providedIn: 'root' })
export class SettingsQuery extends Query<SettingsState> {

  single$ = this.select() as Observable<SettingsState>;
  collectionVisibility$ = this.single$.pipe(
    map(data => ({isFavouritesShowed: data.isFavouritesShowed, isSafeShowed: data.isSafeShowed, isUnsafeShowed: data.isUnsafeShowed}))
  );
  filter$ = this.single$.pipe(
    pluck('filter'),
    map(filter => removeAccent(filter).toLowerCase().replace(/\s/g, ''))
  );

  constructor(protected store: SettingsStore) {
    super(store);
  }

}
