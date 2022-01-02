import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {HomePage} from './pages/home/home.page';
import {DetailModalPage} from './pages/detail-modal/detail-modal.page';
import {FilterComponent} from './components/filter/filter.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { CountryListComponent } from './components/country-list/country-list.component';

@NgModule({
  declarations: [AppComponent, HomePage, DetailModalPage, FilterComponent, CountryListComponent],
  entryComponents: [DetailModalPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule, environment.production ? [] : AkitaNgDevtools.forRoot(), TranslocoRootModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
