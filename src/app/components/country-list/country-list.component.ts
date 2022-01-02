import {Component, Input, OnInit} from '@angular/core';
import {Country, CountryStore} from '../../state/country';
import {DetailModalPage} from '../../pages/detail-modal/detail-modal.page';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  @Input() groupLabel: string;
  @Input() color: string;
  @Input() isBadgePresent = false;
  @Input() countries: Country[];

  constructor(public modalController: ModalController,
              private readonly countryStore: CountryStore,) { }

  ngOnInit(): void {
  }

  async openDetailModal(countryId: number): Promise<void> {
    this.countryStore.setActive(countryId);
    const modal = await this.modalController.create({component: DetailModalPage});
    await modal.present();
  }

  toggleFavourite(event: Event, country: Country): void {
    event.preventDefault();
    this.countryStore.update(country._id, (oldState) => ({
      ...oldState,
      isFavourite: !country.isFavourite
    }));
  }

}
