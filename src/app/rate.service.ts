import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

export interface Product {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}
@Injectable({
  providedIn: 'root',
})
export class RateService {
  usd = new EventEmitter<number>();
  eur = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  getRate() {
    this.http
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((response: Product[]) => {
        response.forEach((v) => {
          if (v.txt === 'Долар США') {
            this.usd.emit(+(v.rate.toFixed(2)));
          }
          else if (v.txt === 'Євро') {
            this.eur.emit(+(v.rate.toFixed(2)));
          }
        });
      });
  }
}
