import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeolocalizationPage } from './geolocalization';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    GeolocalizationPage,
  ],
  imports: [
    IonicPageModule.forChild(GeolocalizationPage),
    HttpClientModule
  ],
  exports: [
    GeolocalizationPage,
  ],
})
export class GeolocalizationPageModule {}
