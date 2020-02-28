import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseQuery, FirebaseAuth } from 'src/app/database/firebase.database';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-sell-bill',
  templateUrl: './sell-bill.page.html',
  styleUrls: ['./sell-bill.page.scss'],
})
export class SellBillPage implements OnInit {
  bill_details: Array<any>;
  bill_date;
  staff;
  customer;
  //tổng
  num_total;
  total;
  //thuế
  tax = 0;
  tax_percent = 0;
  ship_cost = 0;
  //giảm giá
  discount_value = 0;
  discount_percent = 0;
  //tổng trả
  pay_total = 0;
  //biến cờ hàm pay
  pay_status = false;
  //biến cờ hàm lưu tạm
  temporary_status = false;
  constructor(
    private storage: Storage,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private router: Router,
    private event: Events
  ) {
    //get bill()
    this.getListBill();
    //this.getPay();
  }
  ionViewWillEnter() {
    this.bill_date = new Date();
  }
  ngOnInit() {
  }

  getListBill() {
    this.bill_details = new Array();
    //console.log(this.firebaseAuth.user);
    this.staff = this.firebaseAuth.user;
    this.storage.get('customer').then(res => {
      this.customer = res;
      this.storage.get('list_prod').then(res => {
        this.bill_details = res;
        this.getTotal();
        this.getPay();
      });
    });
  }
  // tính thuế
  taxCalculate() {
    this.pay_total = 0;
    this.tax = 0;
    this.getTotal();

    this.tax = (this.tax_percent * this.total) / 100;
    this.pay_total += this.total + this.tax + this.ship_cost - this.discount_value;
  }
  // tính giảm giá
  discountCalculate() {
    this.pay_total = 0;
    this.discount_value = 0;
    this.getTotal();
    this.discount_value = (this.discount_percent * this.total) / 100;
    this.pay_total += this.total + this.tax + this.ship_cost - this.discount_value;
  }
  discountPercentCalculate() {
    this.pay_total = 0;
    this.getTotal();
    this.discount_percent = (this.discount_value / this.total) * 100;
    this.pay_total += this.total + this.tax + this.ship_cost - this.discount_value;
  }

  getTotal() {
    this.total = 0;
    this.num_total = 0;
    for (let item of this.bill_details) {
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
    this.pay_total += this.total + this.tax + this.ship_cost - this.discount_value;
  }
  //thanh toán
  save() {
    this.pay_status = !this.pay_status;
    this.firebaseQuery.createTask("bills", {
      id_customer: this.customer.id,
      id_staff: this.staff.id,
      discount_value: this.discount_value,
      tax_value: this.tax,
      date: this.bill_date,
      bill_type: 1,
      total: this.pay_total,
      fee: this.ship_cost,
      bill_code: this.exportSoHD(),
      id_payment: ""
    }).then(res => {
      //console.log(res);
      this.bill_details.forEach(item => {
        this.firebaseQuery.createTask("bill_details", {
          name: item.name,
          price: item.price,
          id_bill: res.id,
          number: item.number
        }).then(res => {
          //console.log(res);
        }).catch(err => {
          alert("bill_details: " + err);
        })
      });
      //cập nhật ngày mua hàng gần nhầt với thành viên
      if (this.customer.id != 'id_retail') {
        let data = { ...this.customer };
        delete data.id;
        data.near_date = this.bill_date;
        console.log(data);
        this.firebaseQuery.updateTask('customers', this.customer.id, data)
          .then(res => {

          }).catch(err => {
            alert('customer: ' + err);
          });
      }
      //xóa storage
      this.storage.remove('customer');
      this.storage.remove('list_prod');
      //biến cờ reload 
      this.event.publish('back', true);
      this.router.navigateByUrl('tabs/sell');
    }).catch(err => {
      alert(err);
    });
  }
  //Lưu tạm 
  temporaryBill() {
    this.temporary_status = !this.temporary_status;
    this.firebaseQuery.createTask("bills", {
      id_customer: this.customer.id,
      id_staff: this.firebaseAuth.user.id,
      discount_value: this.discount_value,
      tax_value: this.tax,
      date: this.bill_date,
      bill_type: 5,
      total: this.pay_total,
      fee: this.ship_cost,
      bill_code: this.exportSoHD(),
      id_payment: ""
    }).then(res => {
      console.log(res);
      this.bill_details.forEach(item => {
        this.firebaseQuery.createTask("bill_details", {
          name: item.name,
          price: item.price,
          id_bill: res.id,
          number: item.number
        }).then(res => {
          //console.log(res);
        }).catch(err => {
          alert("bill_details: " + err);
        })
      });
      //xóa storage
      this.storage.remove('customer');
      this.storage.remove('list_prod');
      //biến cờ reload 
      this.event.publish('back', true);
      this.router.navigateByUrl('tabs/sell');
    }).catch(err => {
      alert("bills: " + err);
    });
  }

}
