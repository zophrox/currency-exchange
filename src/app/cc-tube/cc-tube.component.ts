import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';

@Component({
  selector: 'app-cc-tube',
  templateUrl: './cc-tube.component.html',
  styleUrls: ['./cc-tube.component.scss'],
})
export class CcTubeComponent implements OnInit {
  inputOne: number = 0;
  inputTwo: number = 0;
  multiply: number;
  usd: number;
  eur: number;
  selectRateOne: string;
  selectRateTwo: string;

  currencySelectionOne: string = 'Please choose a currency';
  currencySelectionTwo: string = 'Please choose a currency';
  constructor(private rateService: RateService) {}

  ngOnInit(): void {
    this.rateService.getRate();
    this.rateService.usd.subscribe((usd) => {
      this.usd = usd;
    });
    this.rateService.eur.subscribe((eur) => {
      this.eur = eur;
    });
  }

  changeCurrencyOne(value) {
    this.selectRateOne = value;
    if (value === 'usd') {
      if (this.selectRateTwo === 'ua') {
        this.multiply = this.usd;
      }
      if (this.selectRateTwo === 'usd') {
        this.multiply = 1;
      }
      if (this.selectRateTwo === 'eur') {
        this.multiply = this.usd / this.eur;
      }
    }
    if (value === 'ua') {
      if (this.selectRateTwo === 'usd') {
        this.multiply = this.usd;
      }
      if (this.selectRateTwo === 'eur') {
        this.multiply = this.eur;
      }
      if (this.selectRateTwo === 'ua') {
        this.multiply = 1;
      }
    }
    if (value === 'eur') {
      if (this.selectRateTwo === 'usd') {
        this.multiply = this.eur / this.usd;
      }

      if (this.selectRateTwo === 'eur') {
        this.multiply = 1;
      }
      if (this.selectRateTwo === 'ua') {
        this.multiply = this.eur;
      }
    }
  }

  changeCurrencyTwo(value) {
    this.selectRateTwo = value;
    if (value === 'usd') {
      if (this.selectRateOne === 'ua') {
        this.multiply = this.usd;
      }
      if (this.selectRateOne === 'usd') {
        this.multiply = 1;
      }
      if (this.selectRateOne === 'eur') {
        this.multiply = this.usd / this.eur;
      }
    }
    if (value === 'ua') {
      if (this.selectRateOne === 'usd') {
        this.multiply = this.usd;
      }
      if (this.selectRateOne === 'eur') {
        this.multiply = this.eur;
      }
      if (this.selectRateOne === 'ua') {
        this.multiply = 1;
      }
    }
    if (value === 'eur') {
      if (this.selectRateOne === 'usd') {
        this.multiply = this.eur / this.usd;
      }
      if (this.selectRateOne === 'eur') {
        this.multiply = 1;
      }
      if (this.selectRateOne === 'ua') {
        this.multiply = this.eur;
      }
    }
  }

  changeInputOne(amount) {
    if (
      (this.selectRateOne === 'ua' && this.selectRateTwo === 'eur') ||
      this.selectRateTwo === 'usd'
    ) {
      this.inputTwo = +(amount / this.multiply).toFixed(2);
    } else {
      this.inputTwo = +(amount * this.multiply).toFixed(2);
    }
    console.log('hello');
  }
  changeInputTwo(amount) {
    if (
      (this.selectRateTwo === 'ua' && this.selectRateOne === 'eur') ||
      this.selectRateOne === 'usd'
    ) {
      this.inputOne = +(amount / this.multiply).toFixed(2);
    } else {
      this.inputOne = +(amount * this.multiply).toFixed(2);
    }
  }
}
