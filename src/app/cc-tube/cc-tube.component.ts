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

  selectRateOne: string;
  selectRateTwo: string;

  currencySelectionOne: string = 'Please choose a currency';
  currencySelectionTwo: string = 'Please choose a currency';
  constructor(private rateService: RateService) {}

  ngOnInit(): void {}

  changeCurrencyOne(value) {
    this.selectRateOne = value;

    this.multiply = this.rateService.changeCurrency(value, this.selectRateTwo);
  }

  changeCurrencyTwo(value) {
    this.selectRateTwo = value;

    this.multiply = this.rateService.changeCurrency(value, this.selectRateOne);
  }

  toCalculate(obtainedValue, ownSelected, anotherSelected) {
    if (
      (ownSelected === 'ua' && anotherSelected === 'eur') ||
      anotherSelected === 'usd'
    ) {
      this.inputTwo = +(obtainedValue / this.multiply).toFixed(2);
    } else {
      this.inputTwo = +(obtainedValue * this.multiply).toFixed(2);
    }
  }

  changeInputLeft(amount) {
    this.toCalculate(amount, this.selectRateOne, this.selectRateTwo);
  }
  changeInputRight(amount) {
    this.toCalculate(amount, this.selectRateTwo, this.selectRateOne);
  }
}
