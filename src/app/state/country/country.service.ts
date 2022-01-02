import {Injectable} from '@angular/core';
import {CountryStore} from './country.store';
import {combineLatest, Observable, of} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Country} from './country.model';
import * as removeAccent from 'remove-accents';
import {CountryQuery} from './country.query';


@Injectable({providedIn: 'root'})
export class CountryService {

  constructor(protected store: CountryStore,
              private readonly countryQuery: CountryQuery,
              private readonly http: HttpClient) {
  }

  fetchCountries(): Observable<void> {
    return this.http.get<{ rows: { doc: Country }[] }>(environment.sourceEndpoint,
      {headers: {Authorization: `Basic ${btoa('covidApp:covid34')}`}}
    ).pipe(
      switchMap(data => combineLatest([this.countryQuery.favouriteIds.pipe(first()), of(data.rows.map(item => item.doc).filter(item => 'isSafe' in item))])),
      tap(([ids, countries]) => {
        console.log(countries);
        this.store.set(countries.map(item => ({...item, isFavourite: ids.includes(item._id)})))
      }),
      map(data => undefined)
    );
  }

  parseHtml(data: string): Country[] {
    return this.getCountryNodes(data)
      .map(item => {
        return {
          _id: this.getId(item),
          name: item.textContent,
          description: this.getDescription(item),
          isSafe: this.isCountrySafe(item),
          isFavourite: false
        };
      });
  }

  private getCountryNodes(data: string): Element[] {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, 'text/html');
    return Array.from(htmlDoc.querySelectorAll('.journal-content-article h3 span[style="font-size:24px;"]'));
  }

  private isCountrySafe(item: Element): boolean {
    return item.parentElement.style.color === 'rgb(51, 153, 0)';
  }

  private getDescription(item: Element): string {
    return this.isCountrySafe(item) ? item.parentElement.parentElement.parentElement.innerHTML : item.parentElement.parentElement.innerHTML;
  }

  private getId(item: Element): string {
    return removeAccent(item.textContent).toLowerCase().replace(/\s/g, '');
  }

}
