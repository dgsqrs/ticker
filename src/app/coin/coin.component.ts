import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnChanges {

  @Input()
  coin: any;

  @Output()
  remove = new EventEmitter();

  up = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const coin: any = changes.coin.currentValue;
    if (coin) {
      this.up = coin?.k?.c - coin?.k?.o > 0;
    }
    //this.up = changes.coin.k.o - changes.coin.k.l > 0;
  }

  removeCoin(coin: any) {
    this.remove.emit(coin);
  }
}
