import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Country, CountryQuery, CountryStore} from '../../state/country';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'detail-modal.page.html',
  styleUrls: ['detail-modal.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailModalPage implements OnInit {

  item$: Observable<Country>;

  constructor(private readonly countryQuery: CountryQuery,
              private readonly countryStore: CountryStore,
              public modalController: ModalController,
              private readonly sanitizer: DomSanitizer) {}

  close(): void {
    this.modalController.dismiss();
  }

  ngOnInit(): void {
    this.item$ = this.countryQuery.active$;
  }

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  toggleFavourite(country: Country): void {
    this.countryStore.update(country._id, (oldState) => ({
      ...oldState,
      isFavourite: !country.isFavourite
    }));
  }

}
