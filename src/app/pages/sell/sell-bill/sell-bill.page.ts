import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseQuery, FirebaseAuth } from 'src/app/database/firebase.database';

@Component({
  selector: 'app-sell-bill',
  templateUrl: './sell-bill.page.html',
  styleUrls: ['./sell-bill.page.scss'],
})
export class SellBillPage implements OnInit {
  date = new Date;
  list_bill: Array<any>;
  staff;
  customer;
  total;
  tax;
  num_total;
  tax_percent;
  ship_cost = 0;
  discount_value = 0;
  pay_total = 0;
  constructor(
    private storage: Storage,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth
  ) {
    //get bill()
    this.getListBill();
    //this.getPay();
  }

  ngOnInit() {
  }

  getListBill() {
    this.list_bill = new Array();
    console.log(this.firebaseAuth.user);
    this.staff = this.firebaseAuth.user;
    this.storage.get('customer').then(res => {
      this.customer = res;
      this.storage.get('list_prod').then(res => {
        this.list_bill = res;
        this.getTotal();
      });
    });
  }

  taxCalculate() {
    this.getTotal();
    this.tax = 0;
    this.tax = (this.tax_percent * this.total) / 100;
    this.total += this.tax;
  }

  getTotal() {
    this.total = 0;
    this.num_total = 0;
    for (let item of this.list_bill) {
      this.total += item.price * item.number;
      this.num_total += item.number;
    }
    //console.log(this.num_total, this.total);
  }
  //So HD
  exportSoHD() {
    let date = new Date();
    const soHD =
      date
        .getFullYear()
        .toString()
        .slice(2, 4) +
      ((date.getMonth() + 1).toString().length == 1
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString()) +
      (date.getUTCDate().toString().length == 1
        ? "0" + date.getUTCDate().toString()
        : date.getUTCDate().toString()) +
      (date.getHours().toString().length == 1
        ? "0" + date.getHours().toString()
        : date.getHours().toString()) +
      (date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes().toString()
        : date.getMinutes().toString()) +
      (date.getSeconds().toString().length == 1
        ? "0" + date.getSeconds().toString()
        : date.getSeconds().toString());
    return soHD;
  }
  getPay() {
    this.pay_total = 0;
    this.pay_total = this.total + this.ship_cost;
  }
  save() {
    this.firebaseQuery.createTask("bills", {
      id_customer: this.customer.id,
      id_staff: this.staff.id,
      discount_value: this.discount_value,
      tax_value: this.tax,
      date: this.date,
      bill_type: 1,
      total: this.pay_total,
      fee: this.ship_cost,
      bill_cost: this.exportSoHD,
      id_payment: ""
    }).then(res => {
      console.log(res);
    }).catch(err => {
      alert(err);
    });
  }

}
