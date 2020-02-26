import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseQuery, FirebaseAuth } from 'src/app/database/firebase.database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-info',
  templateUrl: './sell-info.page.html',
  styleUrls: ['./sell-info.page.scss'],
})
export class SellInfoPage implements OnInit {
  // biến nhận biết khách lẻ(false) và thành viên(true)
  show: boolean;
  //lưu trữ list sản phẩm của bill
  bill_details: Array<any>;
  //tổng giá và tổng số lượng
  num_total;
  total;
  //biến cho phép thanh toán
  save_btn = false;
  tax = 0;
  tax_percent = 0;
  customer: FormGroup;
  create_status: boolean;
  show_searchbar: boolean = false;
  list_customers: Array<any>;
  guess;
  customer_show;
  temporary_status = false;
  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private router: Router
  ) {
    /* this.storage.get("bill").then(res => {
      this.bill = res;
      console.log(this.bill);
    }) */
    this.bill_details = new Array();

    this.storage.get("list_prod").then(res => {
      this.bill_details = res;
      //console.log(this.bill_details);
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
        if (res.docs[i].id == 'id_retail') {
          this.guess = res.docs[i].data();
          this.guess.id = res.docs[i].id;
        } else {
          this.list_customers.push(res.docs[i].data());
          this.list_customers[this.list_customers.length - 1].id = res.docs[i].id;
          this.list_customers[this.list_customers.length - 1].index = this.list_customers.length - 1;
        }
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
    //console.log(this.customer.value.born_date);
  }
  change($event) {
    // Nếu là khách lẻ
    if ($event.detail.value == 'guess') {
      this.show = false;
      //Lưu thông tin khách hàng là khách lẻ vào storage
      this.storage.set("customer", this.guess);
    }
    else {
      this.show = true;
    }
  }
  // hàm xóa từng sp
  deleteItem(item) {
    let index = this.findIndex(this.bill_details, item);
    this.bill_details.splice(index, 1);
    this.storage.set("list_prod", this.bill_details);
    //this.taxCalculate();
  }
  //tìm vị trí i trong array
  findIndex(array, i) {
    let index = array.findIndex((item) => {
      return (item.name == i.name) && (item.id == i.id);
    });
    return index;
  }
  // tìm kiếm khách hàng bắng sđt
  searchPhone() {
    if (this.customer.value.phone != null) {
      console.log(this.list_customers);
      this.customer_show = this.list_customers.filter(item => {
        return item.phone.indexOf(this.customer.value.phone) != -1;
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

  disableSearchBar() {
    this.show_searchbar = false;
  }
  // Chọn thành viên đã tồn tại
  select(item) {
    //console.log(item);
    //Lưu thông tin thành viên vào storage
    this.storage.set("customer", item);
    //Đổ dữ liệu vào form
    this.customer.controls['address'].setValue(item.address);
    this.customer.controls['code'].setValue(item.code);
    this.customer.controls['name'].setValue(item.name);
    this.customer.controls['phone'].setValue(parseInt(item.phone));
    this.customer.controls['sex'].setValue(item.sex);
    this.customer.controls['email'].setValue(item.email);
    this.customer.controls['born_date'].setValue(item.born_date);
    //
    this.create_status = false; //Don't create customer
    this.disableSearchBar();
  }
  //Get Total from detail bill
  getTotal() {
    this.total = 0;
    this.num_total = 0;
    for (let item of this.bill_details) {
      this.total += parseInt(item.price) * item.number;
      this.num_total += item.number;
    }
    //console.log(this.num_total, this.total);
  }

  save() {

  }
  // Di chuyển qua bill
  gotoSellBill() {
    if (!this.show) {
      // là khách lẻ
      this.storage.set("customer", this.guess).then(res => {
        this.router.navigateByUrl('sell-bill');
      });
    } else {
      if (this.create_status) { // tạo thành viên mới
        // chuyển phone -> string
        let customer = this.customer.value;
        customer.phone = "0" + this.customer.value.phone.toString();
        this.firebaseQuery.createTask("customers", customer).then(res => {
          //console.log(res.id);
          customer.id = res.id;
          this.create_status = !this.create_status;
          this.storage.set("customer", customer).then(res => {
            this.router.navigateByUrl('sell-bill');
          });
        }).catch(err => {
          alert(err);
        });
      } else {
        this.router.navigateByUrl('sell-bill');
      }
    }
  }
  //tạo số HD
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

  //Thêm sản phẩm vào bill
  addProduct() {
    this.router.navigateByUrl('sell-cart');
  }

  /* taxCalculate() {
    this.getTotal();
    this.tax = 0;
    this.tax = (this.tax_percent * this.total) / 100;
    this.total += this.tax;
  } */


}
