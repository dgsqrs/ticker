import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TickerViewComponent } from './ticker-view/ticker-view.component';
import { CoinComponent } from './coin/coin.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerViewComponent,
    CoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
