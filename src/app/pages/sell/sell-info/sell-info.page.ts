import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseQuery } from 'src/app/database/firebase.database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-info',
  templateUrl: './sell-info.page.html',
  styleUrls: ['./sell-info.page.scss'],
})
export class SellInfoPage implements OnInit {
  show: boolean;
  bill;
  bill_date;
  list_bill: Array<any>;
  num_total;
  total;
  save_btn = false;
  tax = 0;
  tax_percent = 0;
  customer: FormGroup;
  create_status: boolean;
  show_searchbar: boolean = false;
  list_customers: Array<any>;
  customer_show;
  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery,
    private router: Router
  ) {
    this.storage.get("bill").then(res => {
      this.bill = res;
      console.log(this.bill);
    })
    this.list_bill = new Array();

    this.storage.get("list_prod").then(res => {
      this.list_bill = res;
      console.log(this.list_bill);
      this.getTotal();
    });
    //
    this.initForm();
    //
    this.getDataCustomer();
  }

  ngOnInit() {
  }
  //Lay du lieu khach hang
  getDataCustomer() {
    this.list_customers = new Array();
    this.firebaseQuery.getTasks('customers').then(res => {
      for (let i in res.docs) {
        this.list_customers.push(res.docs[i].data());
        this.list_customers[this.list_customers.length - 1].id = res.docs[i].id;
        this.list_customers[this.list_customers.length - 1].index = this.list_customers.length - 1;
      }
      this.customer_show = new Array();
    });
  }
  //khoi tao form
  initForm() {
    this.customer = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [null, Validators.required],
      code: ['', Validators.required],
      sex: [''],
      email: [''],
      address: [''],
      district: [''],
      province: [''],
      id_discount: [''],
      born_date: ['']
    });
  }

  setDate(event) {
    this.customer.controls['born_date'].setValue(event.detail.value);
    console.log(this.customer.value.born_date);
  }
  change($event) {
    if ($event.detail.value == 'guess') this.show = false;
    else {
      this.show = true;
    }
  }

  deleteItem(item) {
    let index = this.findIndex(this.list_bill, item);
    this.list_bill.splice(index, 1);
    this.storage.set("list_prod", this.list_bill);
    //this.taxCalculate();
  }

  findIndex(array, i) {
    let index = array.findIndex((item) => {
      return (item.name == i.name) && (item.id == i.id);
    });
    return index;
  }

  searchPhone() {
    if (this.customer.value.phone != null) {
      this.customer_show = this.list_customers.filter(item => {
        return item.phone.toString().indexOf(this.customer.value.phone.toString()) != -1;
      });
      this.show_searchbar = true;
      if (this.customer_show.length == 0) {
        this.create_status = true;
      }
    } else {
      this.customer_show = new Array();
      this.show_searchbar = false;
    }
  }

  select(item) {
    console.log(item);
    this.storage.set("customer", item);
    //Đổ dữ liệu vào form
    this.customer.controls['address'].setValue(item.address);
    this.customer.controls['code'].setValue(item.code);
    this.customer.controls['name'].setValue(item.name);
    this.customer.controls['phone'].setValue(parseInt(item.phone));
    this.customer.controls['address'].setValue(item.address);
    //
    this.show_searchbar = false;
    this.create_status = false;
  }
  //Get Total from detail bill
  getTotal() {
    this.total = 0;
    this.num_total = 0;
    for (let item of this.list_bill) {
      this.total += parseInt(item.price) * item.number;
      this.num_total += item.number;
    }
    //console.log(this.num_total, this.total);
  }

  save() {

  }

  gotoSellBill() {
    if (this.create_status && this.show) {
      this.firebaseQuery.createTask("customers", this.customer.value).then(res => {
        console.log(res.id);
        let customer = this.customer.value;
        customer.id = res.id;
        this.create_status = !this.create_status;
        this.storage.set("customer", customer).then(res => {
          this.router.navigateByUrl('sell-bill');
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.router.navigateByUrl('sell-bill');
    }
  }

  /* taxCalculate() {
    this.getTotal();
    this.tax = 0;
    this.tax = (this.tax_percent * this.total) / 100;
    this.total += this.tax;
  } */

}
