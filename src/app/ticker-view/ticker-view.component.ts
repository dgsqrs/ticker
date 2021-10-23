import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticker-view',
  templateUrl: './ticker-view.component.html',
  styleUrls: ['./ticker-view.component.css']
})
export class TickerViewComponent implements OnInit, OnDestroy {

  data: any;
  msg: any;

  conn2: any;

  coins : any[] = [];

  constructor() { }

  ngOnInit(): void {
    const conn = new WebSocket("wss://stream.binance.com:9443/ws");
    const that = this;

    this.conn2 = conn;

    conn.onopen = function(evt: any) {
      conn.send(JSON.stringify({ method: "SUBSCRIBE", id: 1, params: ['btcusdt@kline_1m','ethusdt@kline_1d'] }));
    }

    conn.onmessage = function(msg: any) {
      const data = JSON.parse(msg.data);

      const found = that.coins.filter(coin => coin.s === data.s);
      if (found.length == 1) {
        that.coins[that.coins.indexOf(found[0])] = data;
      }
      else {
        that.coins.push(data);
      }

      that.msg = msg;
      console.log("data", data)
    }
  }

  connect() {
    this.ngOnInit();
  }

  close() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    console.log('bye')
    this.conn2.send(JSON.stringify({ method: "UNSUBSCRIBE", id: 1, params: ['btcusdt@kline_1d','ethusdt@kline_1d'] }));
    this.conn2.close();
  }

}
