import { Component, OnInit } from '@angular/core';
import { RouterModule, Router} from '@angular/router'
@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  number = 0;
  bills = [
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },{
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },{
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },{
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },{
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    },
    {
      id_bill: "HD01",
      cost: "2934793274",
      customer: "VIP",
      status: "Đã bán",
      date: new Date()
    }
  ]
  constructor( private router: Router) {}

  ngOnInit() {
  }
  gotoscan() {
    this.router.navigateByUrl('scan');
  }
  
}
