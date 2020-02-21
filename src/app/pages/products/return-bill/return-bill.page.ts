import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-bill',
  templateUrl: './return-bill.page.html',
  styleUrls: ['./return-bill.page.scss'],
})
export class ReturnBillPage implements OnInit {
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
