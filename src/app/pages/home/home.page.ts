import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, PopoverController, ToastController} from '@ionic/angular';
import {Observable, Subject} from 'rxjs';
import {Country, CountryQuery, CountryService, CountryStore} from '../../state/country';
import {FilterComponent} from '../../components/filter/filter.component';
import {FormControl} from '@angular/forms';
import {SettingsQuery, SettingsState, SettingsStore} from '../../state/settings';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  safeCountries$: Observable<Country[]>;
  unsafeCountries$: Observable<Country[]>;
  favouritesCountries$: Observable<Country[]>;
  settings$: Observable<SettingsState>;
  search = new FormControl();
  unsubscribe$ = new Subject<void>();
  loading: HTMLIonLoadingElement;
  error: any;

  constructor(private readonly countryService: CountryService,
              private readonly countryQuery: CountryQuery,
              private readonly settingsQuery: SettingsQuery,
              private readonly countryStore: CountryStore,
              private readonly settingsStore: SettingsStore,
              public modalController: ModalController,
              public popoverController: PopoverController,
              public loadingController: LoadingController,
              public toastController: ToastController) {}

  refresh(ev) {
    this.countryService.fetchCountries().subscribe( () => ev.detail.complete(), () => ev.detail.complete());
  }

  async openFilterMenu(event: Event) {
    const popover = await this.popoverController.create({component: FilterComponent, event});
    return await popover.present();
  }

  ngOnInit(): void {
    this.presentInitialLoading();
    this.safeCountries$ = this.countryQuery.safeCollection$;
    this.unsafeCountries$ = this.countryQuery.unSafeCollection$;
    this.favouritesCountries$ = this.countryQuery.favouriteCollection$;
    this.settings$ = this.settingsQuery.single$;
    this.countryService.fetchCountries().subscribe((data) => {
      this.loading.dismiss();
    }, (error) => {
      this.presentToastError(error.error.reason);
      this.loading.dismiss();
    });
    this.search.valueChanges.subscribe(filter => this.settingsStore.update((old) => ({...old, filter})));
    this.settings$.pipe(takeUntil(this.unsubscribe$)).subscribe(({filter}) => this.search.patchValue(filter, {emitEvent: false}));
  }

  private async presentInitialLoading(): Promise<void> {
    this.loading = await this.loadingController.create();
    await this.loading.present();
  }

  private async presentToastError(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      color: 'danger',
    });
    toast.present();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
