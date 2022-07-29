import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterielModule } from './materiel/materiel.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PluckPipe } from './pipes/pluck.pipe';
import { HighLightPipe } from './pipes/high-light.pipe';
import { DegreePipe } from './pipes/degree.pipe';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { DailyTemperaturePipe } from './pipes/daily-temperature.pipe';

@NgModule({
  declarations: [
    WeatherResultComponent,
    PageNotFoundComponent,
    PluckPipe,
    HighLightPipe,
    DegreePipe,
    TemperaturePipe,
    DailyTemperaturePipe

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
    PageNotFoundComponent,

    PluckPipe,
    HighLightPipe,
    DegreePipe,
    TemperaturePipe,
    DailyTemperaturePipe
  ],
})
export class SharedModule {}
