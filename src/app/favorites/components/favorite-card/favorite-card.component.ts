import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Temperature } from 'src/app/utilities/models/current-weather-result';

export interface FavoriteCard {
  id: number,
  description: string,
  location: string,
  temp: Temperature,
}


@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {

  @Input() item!: FavoriteCard
  @Input() metric!: boolean | null

  @Output() select: EventEmitter<FavoriteCard> = new EventEmitter<FavoriteCard>();

  constructor() { }

  onSelect() {
    this.select.emit(this.item);
  }

}
