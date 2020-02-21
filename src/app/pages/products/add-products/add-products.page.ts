import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {
  startDay = '2019-12';
  endDay = "2019-12-08";

  constructor() { }

  ngOnInit() {
  }

}
