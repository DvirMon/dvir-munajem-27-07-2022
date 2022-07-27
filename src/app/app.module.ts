import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsService } from './services/error.service';
import { HttpErrorInterceptor } from './utilities/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { LobbyComponent } from './components/lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule

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
