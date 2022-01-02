import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Country } from './country.model';

export interface CountryState extends EntityState<Country> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'country',
  idKey: '_id'
})
export class CountryStore extends EntityStore<CountryState> {

  constructor() {
    super();
  }

}
