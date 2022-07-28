import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { LayoutComponent } from './components/layout/layout.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { HttpErrorInterceptor } from './utilities/interceptors/error.interceptor';
import { ErrorsService } from './utilities/services/error.service';
import { environment } from 'src/environments/environment';

import { appReducer } from './ngrx/app.reducer';
import { StoreModule } from '@ngrx/store';
import { appFeatureKey } from './ngrx/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      [appFeatureKey]: appReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
