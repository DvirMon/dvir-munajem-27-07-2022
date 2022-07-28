import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';

@Component({
  selector: 'app-favorites-layout',
  templateUrl: './favorites-layout.component.html',
  styleUrls: ['./favorites-layout.component.scss']
})
export class FavoritesLayoutComponent implements OnInit {

  items$!: Observable<Partial<WeatherResult>[]>

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {

    this.items$ = of([{ description: 'Sunny', temp: 30, location: 'tel aviv' }, { description: 'Sunny', temp: 30, location: 'tel aviv' }, { description: 'Sunny', temp: 30, location: 'tel aviv' }, { description: 'Sunny', temp: 30, location: 'tel aviv' }, { description: 'Sunny', temp: 30, location: 'tel aviv' }])
  }

}
