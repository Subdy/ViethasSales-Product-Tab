import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-bill',
  templateUrl: './sell-bill.page.html',
  styleUrls: ['./sell-bill.page.scss'],
})
export class SellBillPage implements OnInit {
  date= new Date;
  items = [
    {
      name: 'Đầm xòe tay lỡ',
      quantity: 12,
      cost: 201000,
    },
    {
      name: 'Đầm xòe tay lỡ',
      quantity: 12,
      cost: 201000,
    },
    {
      name: 'Đầm xòe tay lỡ',
      quantity: 12,
      cost: 201000,
    },
    {
      name: 'Đầm xòe tay lỡ',
      quantity: 12,
      cost: 201000,
    },
    {
      name: 'Đầm xòe tay lỡ',
      quantity: 12,
      cost: 201000,
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
