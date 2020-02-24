import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder
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
    this.initForm();
  }

  ngOnInit() {
  }
  //khoi tao form
  initForm() {
    this.customer = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      code: ['', Validators.required],
      sex: [''],
      email: [''],
      address: [''],
      district: [''],
      province: ['']
    });
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

  save() { }

  /* taxCalculate() {
    this.getTotal();
    this.tax = 0;
    this.tax = (this.tax_percent * this.total) / 100;
    this.total += this.tax;
  } */

}
