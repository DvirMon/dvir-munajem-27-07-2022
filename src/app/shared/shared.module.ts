import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterielModule } from './materiel/materiel.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    WeatherResultComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterielModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterielModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    WeatherResultComponent,
    PageNotFoundComponent
  ],
})
export class SharedModule {}
