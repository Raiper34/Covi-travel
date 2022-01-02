import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {CountryStore, CountryState} from './country.store';
import {combineLatest, Observable} from 'rxjs';
import {Country} from './country.model';
import {map, tap} from 'rxjs/operators';
import {SettingsQuery} from '../settings';

@Injectable({providedIn: 'root'})
export class CountryQuery extends QueryEntity<CountryState> {

  active$ = this.selectActive() as Observable<Country>;
  collection$ = this.selectAll() as Observable<Country[]>;
  filteredCollection$ = combineLatest([this.collection$, this.settingsQuery.filter$]).pipe(
    map(([collection, search]) => collection.filter(item => item._id.toString().includes(search))),
  );
  safeCollection$ = this.filteredCollection$.pipe(
    map(data => data.filter(item => item.isSafe))
  );
  unSafeCollection$ = this.filteredCollection$.pipe(
    map(data => data.filter(item => !item.isSafe))
  );
  favouriteCollection$ = this.filteredCollection$.pipe(
    map(data => data.filter(item => item.isFavourite))
  );
  favouriteIds = this.favouriteCollection$.pipe(
    map(data => data.map(item => item._id))
  );

  constructor(protected store: CountryStore,
              private readonly settingsQuery: SettingsQuery) {
    super(store);
  }

}
