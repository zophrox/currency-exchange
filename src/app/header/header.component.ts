import { Component, OnInit } from '@angular/core';
import { RateService } from '../rate.service';
import { DatePipe } from '@angular/common';

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

  constructor(private rateService: RateService, public datePipe: DatePipe) {
    this.date = this.datePipe.transform(this.date, 'MM-dd-yyyy');
  }

  ngOnInit() {
    this.rateService.getRate();
    this.rateService.usdEmit.subscribe((usd) => {
      this.usd = usd;
    });
    this.rateService.eurEmit.subscribe((eur) => {
      this.eur = eur;
    });
    
  }
}
