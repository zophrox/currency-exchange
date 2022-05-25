import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';

@Component({
  selector: 'app-cc-tube',
  templateUrl: './cc-tube.component.html',
  styleUrls: ['./cc-tube.component.scss'],
})
export class CcTubeComponent implements OnInit {
  inputLeft: number = 0;
  inputRight: number = 0;
  multiply: number;

  selectRateLeft: string;
  selectRateRight: string;

  currencySelectionLeft: string = 'Please choose a currency';
  currencySelectionRight: string = 'Please choose a currency';
  constructor(private rateService: RateService) {}

  ngOnInit(): void {}

  changeCurrencyOne(value) {
    this.selectRateLeft = value;

    this.multiply = this.rateService.changeCurrency(value, this.selectRateRight);
  }

  changeCurrencyTwo(value) {
    this.selectRateRight = value;

    this.multiply = this.rateService.changeCurrency(value, this.selectRateLeft);
  }

  toCalculate(obtainedValue, ownSelected, anotherSelected) {
    if (
      (ownSelected === 'ua' && anotherSelected === 'eur') ||
      anotherSelected === 'usd'
    ) {
      return +(obtainedValue / this.multiply).toFixed(2);
    } else {
      return +(obtainedValue * this.multiply).toFixed(2);
    }
  }

  changeInputLeft(amount) {
    this.inputRight = this.toCalculate(
      amount,
      this.selectRateLeft,
      this.selectRateRight
    );
  }
  changeInputRight(amount) {
    this.inputLeft = this.toCalculate(
      amount,
      this.selectRateRight,
      this.selectRateLeft
    );
  }
}
