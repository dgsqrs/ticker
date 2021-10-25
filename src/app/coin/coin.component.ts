import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
  animations: [
    trigger('divstate', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-10px)'
        }),
        animate(200)
      ]),
    ])]
})
export class CoinComponent implements OnChanges {

  @Input()
  coin: any;

  @Output()
  remove = new EventEmitter();

  up = true;

  constructor() {
    console.log('coin component constructor')
  }

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
