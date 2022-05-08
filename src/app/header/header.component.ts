import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Product {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}
// export interface Tile {
//   color: string;
//   cols: number;
//   rows: number;
//   text: string;
// }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe],
})
export class HeaderComponent implements OnInit {
  usd: number;

  eur: number;

  date: any = new Date();

  constructor(
    private rateService: RateService,
    public datePipe: DatePipe,
    private http: HttpClient
  ) {
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.rateService.getRate()
    this.rateService.usd.subscribe((usd) => {
      this.usd = usd
    });
    this.rateService.eur.subscribe((eur) => {
      this.eur = eur
    });

    // this.http
    //   .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    //   .subscribe((response: Product[]) => {
    //     response.forEach((v) => {
    //       if (v.txt === 'Долар США') {
    //         this.usd = v.rate;
    //       }
    //       if (v.txt === 'Євро') {
    //         this.eur = v.rate;
    //       }
    //     });
    //   });
  }
}
