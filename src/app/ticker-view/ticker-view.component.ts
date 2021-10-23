import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticker-view',
  templateUrl: './ticker-view.component.html',
  styleUrls: ['./ticker-view.component.css']
})
export class TickerViewComponent implements OnInit, OnDestroy {

  newCoin: string = '';

  data: any;
  msg: any;

  conn2: any;

  coins : any[] = [];
  wantedCoins = ['btcusdt@kline_1m','ethusdt@kline_1d'];

  public now: Date = new Date();

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {

    const localCoints = localStorage.getItem('coins');
    if (localCoints){
      this.wantedCoins = JSON.parse(localCoints);
    }

    const conn = new WebSocket("wss://stream.binance.com:9443/ws");
    const that = this;

    this.conn2 = conn;

    conn.onopen = function(evt: any) {
      conn.send(JSON.stringify({ method: "SUBSCRIBE", id: 1, params: that.wantedCoins }));
    }

    conn.onclose = function(msg) {
      console.log("Closed.");
    }

    conn.onerror = function(err){
      console.log(err);
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
      //console.log("data", data)
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
    this.conn2.send(JSON.stringify({ method: "UNSUBSCRIBE", id: 1, params:  this.wantedCoins }));
    this.conn2.close();
  }

  addNewCoin(value: string) {
    this.wantedCoins.push(value + '@kline_1d');
    localStorage.setItem("coins", JSON.stringify(this.wantedCoins))
    this.close();
    this.connect();
  }

  remove(coin: any) {
    let found = null;
    this.wantedCoins.forEach(c => {
      if (c.toLocaleLowerCase().startsWith(coin.s.toLocaleLowerCase())) {
        found = c;
      }
    })
    if (found) {
      const idx = this.wantedCoins.indexOf(found);
      if (idx > -1) {
        this.conn2.send(JSON.stringify({ method: "UNSUBSCRIBE", id: 1, params: this.wantedCoins }));
        this.wantedCoins.splice(idx, 1);
        localStorage.setItem("coins", JSON.stringify(this.wantedCoins));
        this.conn2.send(JSON.stringify({ method: "SUBSCRIBE", id: 1, params: this.wantedCoins }));
        const idx2 = this.coins.indexOf(coin);
        if (idx2 > -1) {
          this.coins.splice(idx2, 1);
        }
      }
    }
  }
}
