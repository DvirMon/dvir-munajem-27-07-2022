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
