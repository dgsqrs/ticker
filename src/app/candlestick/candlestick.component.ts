import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css']
})
export class CandlestickComponent implements OnInit, OnChanges, DoCheck {

  @Input()
  coin: any;
  previous: any;

  data :any[] = [];
  data2 :any[] = [];

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

    constructor() {
      this.chartOptions = {
        series: [
          {
            name: "candle",
            data: this.data,
          }
        ],
        chart: {
          type: "candlestick",
          height: 350
        },
        title: {
          text: "CandleStick Chart",
          align: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      };
  }

  ngDoCheck(): void {
    if (this.previous?.trigger !== this.coin?.trigger) {
      const old = this.previous;
      this.previous = JSON.parse(JSON.stringify(this.coin));
      console.log('updated', this.coin.trigger)
      const coin = this.coin;
      if (coin.k && old?.k?.t !== coin?.k?.t) {

        const newOhlc: any = {};
        newOhlc.x = new Date(coin.k.t);
        newOhlc.y = [];
        newOhlc.y[0] = coin.k.o;
        newOhlc.y[1] = coin.k.h;
        newOhlc.y[2] = coin.k.l;
        newOhlc.y[3] = coin.k.c;
        console.log('new', newOhlc)
        this.data2.push(newOhlc)
      }
      else {
        const last = this.data2[this.data2.length-1];
        last.y[0] = coin.k.o;
        last.y[1] = coin.k.h;
        last.y[2] = coin.k.l;
        last.y[3] = coin.k.c;
      }
      const d:any  = {};
     // d.name = "candle";
      d.data = this.data2;
      console.log('chart', this.chart)

      console.log("chart id", this.chartOptions.chart)
      // @ts-ignore
      if (this.data2 && this.chartOptions && this.chartOptions.series.length > 0) {
        this.chartOptions.series = [{
          data: this.data2
        }];
      }

    }
  }



  ngOnInit(): void {
      console.log('init candlestick')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Previous', changes.coin.previousValue)
    console.log('Previous', changes.coin.currentValue)

    const coin = changes.coin.currentValue;

      const newOhlc: any = {};
      newOhlc.x = new Date(coin.k.t);
      newOhlc.y = [];
      newOhlc.y[0] = coin.k.o;
      newOhlc.y[1] = coin.k.h;
      newOhlc.y[2] = coin.k.l;
      newOhlc.y[3] = coin.k.c;

    this.data.push(newOhlc);
  //this.chartOptions.series = this.data;
   // this.chart?.updateSeries([newOhlc])
  }

}
