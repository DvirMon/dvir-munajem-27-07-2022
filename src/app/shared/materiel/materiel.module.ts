import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    MatBadgeModule,

    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    MatSnackBarModule,
  ],
})
export class MaterielModule { }
