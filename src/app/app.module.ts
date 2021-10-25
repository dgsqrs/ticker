import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TickerViewComponent} from './ticker-view/ticker-view.component';
import {CoinComponent} from './coin/coin.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgApexchartsModule} from "ng-apexcharts";
import {CandlestickComponent} from './candlestick/candlestick.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerViewComponent,
    CoinComponent,
    CandlestickComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
