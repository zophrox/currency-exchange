import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  currencyName: string;
  response: any;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((response) => {
        this.response = response;
        console.log(this.response);
      });
  }
}
