import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,

    MatCardModule,

    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,


    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
})
export class MaterielModule { }
