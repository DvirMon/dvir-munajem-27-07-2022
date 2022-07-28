import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterielModule } from './materiel/materiel.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';

@NgModule({
  declarations: [
    WeatherResultComponent
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

    WeatherResultComponent
  ],
})
export class SharedModule {}
