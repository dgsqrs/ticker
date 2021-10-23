import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {

  @Input()
  coin: any;

  constructor() { }

  ngOnInit(): void {
  }

}
