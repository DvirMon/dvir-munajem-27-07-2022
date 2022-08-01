import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input() color!: ThemePalette;
  @Input() mode!: ProgressSpinnerMode;
  @Input() value!: number;
  @Input() diameter!: number;


  show$!: Observable<boolean>

  constructor(
    private spinnerService : SpinnerService
  ) {
  }

  ngOnInit(): void {
    this.show$ = this.spinnerService.listenToShow()
    this.color = this.color || 'primary';
    this.mode = this.mode || 'indeterminate';
    this.value = this.value;
    this.diameter = this.diameter || 80;
  }
}
