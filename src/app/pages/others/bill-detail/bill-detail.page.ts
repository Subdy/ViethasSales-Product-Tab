import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.page.html',
  styleUrls: ['./bill-detail.page.scss'],
})
export class BillDetailPage implements OnInit {
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
