import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-info',
  templateUrl: './sell-info.page.html',
  styleUrls: ['./sell-info.page.scss'],
})
export class SellInfoPage implements OnInit {
  show:boolean = true;
  items = [
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },{
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    }
  ];
  total = 4039500;
  constructor() { }

  ngOnInit() {
  }

}
