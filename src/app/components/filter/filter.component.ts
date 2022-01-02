import {Component, OnDestroy, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SettingsQuery, SettingsStore} from '../../state/settings';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  $unsubscribe = new Subject<void>();

  constructor(private readonly settingsQuery: SettingsQuery,
              private readonly settingStore: SettingsStore,
              private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      isFavouritesShowed: true,
      isSafeShowed: true,
      isUnsafeShowed: true,
    });
    this.form.valueChanges.subscribe(data => this.settingStore.update((old) => ({...old, ...data})));
    this.settingsQuery.collectionVisibility$.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(data => this.form.patchValue(data, {emitEvent: false}));
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
