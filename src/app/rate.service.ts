import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

export interface CurrencyInformation {
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
  usdEmit = new EventEmitter<number>();
  eurEmit = new EventEmitter<number>();

  usd: number;
  eur: number;

  constructor(private http: HttpClient) {}

  getRate() {
    this.http
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((response: CurrencyInformation[]) => {
        response.forEach((v) => {
          if (v.txt === 'Долар США') {
            this.usd = +v.rate.toFixed(2);
            this.usdEmit.emit(+v.rate.toFixed(2));
          } else if (v.txt === 'Євро') {
            this.eur = +v.rate.toFixed(2);
            this.eurEmit.emit(+v.rate.toFixed(2));
          }
        });
      });
  }

  changeCurrency(value, otherSelect) {
    if (value === 'usd') {
      if (otherSelect === 'ua') {
        return this.usd;
      }
      if (otherSelect === 'usd') {
        return 1;
      }
      if (otherSelect === 'eur') {
        return this.usd / this.eur;
      }
    }
    if (value === 'ua') {
      if (otherSelect === 'usd') {
        return this.usd;
      }
      if (otherSelect === 'eur') {
        return this.eur;
      }
      if (otherSelect === 'ua') {
        return 1;
      }
    }
    if (value === 'eur') {
      if (otherSelect === 'usd') {
        return this.eur / this.usd;
      }

      if (otherSelect === 'eur') {
        return 1;
      }
      if (otherSelect === 'ua') {
        return this.eur;
      }
    }
  }
}
