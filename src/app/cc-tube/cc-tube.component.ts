import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';

@Component({
  selector: 'app-cc-tube',
  templateUrl: './cc-tube.component.html',
  styleUrls: ['./cc-tube.component.scss'],
})
export class CcTubeComponent implements OnInit {
  inputOne: number;
  inputTwo: number = 0;
  amount: number;
  usd: number;
  eur: number;
  selectRate1: string = 'ua';
  selectRate2: string = 'ua';

  selected: string = 'Please choose a currency';
  selected2: string = 'Please choose a currency';
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

  changeSelect1(value) {
    this.selectRate1 = value;
    if (value === 'usd') {
      if (this.selectRate2 === 'ua') {
        this.amount = this.usd;
      }
      if (this.selectRate2 === 'usd') {
        this.amount = 1;
      }
      if (this.selectRate2 === 'eur') {
        this.amount = this.eur / this.usd;
      }
    }
    if (value === 'ua') {
      if (this.selectRate2 === 'usd') {
        this.amount = this.usd;
      }
      if (this.selectRate2 === 'eur') {
        this.amount = this.eur;
      }
      if (this.selectRate2 === 'ua') {
        this.amount = 1;
      }
    }
    if (value === 'eur') {
      if (this.selectRate2 === 'usd') {
        this.amount = this.usd / this.eur;
      }

      if (this.selectRate2 === 'eur') {
        this.amount = 1;
      }
      if (this.selectRate2 === 'ua') {
        this.amount = this.eur;
      }
    }
  }

  changeSelect2(value) {
    this.selectRate2 = value;
    if (value === 'usd') {
      if (this.selectRate1 === 'ua') {
        this.amount = this.usd;
      }
      if (this.selectRate1 === 'usd') {
        this.amount = 1;
      }
      if (this.selectRate1 === 'eur') {
        this.amount = this.eur / this.usd;
      }
    }
    if (value === 'ua') {
      if (this.selectRate1 === 'usd') {
        this.amount = this.usd;
      }
      if (this.selectRate1 === 'eur') {
        this.amount = this.eur;
      }
      if (this.selectRate1 === 'ua') {
        this.amount = 1;
      }
    }
    if (value === 'eur') {
      if (this.selectRate1 === 'usd') {
        this.amount = this.usd / this.eur;
      }
      if (this.selectRate1 === 'eur') {
        this.amount = 1;
      }
      if (this.selectRate1 === 'ua') {
        this.amount = this.eur;
      }
    }
  }

  changeInputOne(change) {
    if (this.selectRate1 === 'ua') {
      this.inputTwo = +(change / this.amount).toFixed(2);
    } else {
      this.inputTwo = +(change*this.amount).toFixed(2);
    }
  }
  changeInputTwo(change) {
    if (this.selectRate2 === 'ua') {
      this.inputOne = +(change / this.amount).toFixed(2);
    } else {
      this.inputOne = +(change*this.amount).toFixed(2);
    }
  }
}
