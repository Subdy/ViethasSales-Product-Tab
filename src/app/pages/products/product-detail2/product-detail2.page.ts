import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail2',
  templateUrl: './product-detail2.page.html',
  styleUrls: ['./product-detail2.page.scss'],
})
export class ProductDetail2Page implements OnInit {
  startDay = '2019-12';
  endDay = "2019-12-08";

  constructor() { }

  ngOnInit() {
  }

}
