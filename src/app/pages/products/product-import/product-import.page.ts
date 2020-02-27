import { Component, OnInit } from "@angular/core";
import { Router, RouterModule, NavigationExtras } from "@angular/router";
import { FirebaseQuery, FirebaseAuth } from "../../../database/firebase.database";
import { Storage } from "@ionic/storage";
import { LoadingController } from "@ionic/angular";
@Component({
  selector: "app-product-import",
  templateUrl: "./product-import.page.html",
  styleUrls: ["./product-import.page.scss"]
})
export class ProductImportPage implements OnInit {
  startDay = new Date()
  endDay = new Date()
  // trạng thái show1 (chưa có bill), show2 (có bill)
  show1;
  show2;
  bills: Array<any>;
  //bill sẽ show
  show_bills: Array<any>;
  //biến cờ startTime endTIme
  timestart = false;
  timeend = false;
  constructor(
    private router: Router,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private storage: Storage,
    private loadingController: LoadingController
  ) {
    // this.firebaseQuery.getTasks("warehouses").then(res => {
    //   for (let item of res.docs) {
    //     this.firebaseQuery.deleteTask('warehouses', item.id);
    //     console.log(item.data());
    //   }
    // });
    // this.firebaseQuery.getTasks("bill_details").then(res => {
    //   for (let item of res.docs) {
    //     this.firebaseQuery.deleteTask('bill_details', item.id);
    //     console.log(item.data());
    //   }
    // });
    // this.firebaseQuery.getTasks("products").then(res => {
    //   console.log(res);
    //   for (let item of res.docs) {
    //     this.firebaseQuery.deleteTask('products', item.id);
    //     console.log(item.data());
    //   }
    // });
    // this.firebaseQuery.getTasks("bills").then(res => {
    //   for (let item of res.docs) {
    //     this.firebaseQuery.deleteTask('bills', item.id);
    //     console.log(item.data());
    //   }
    // });
    // this.firebaseQuery.getTasks("customers").then(res => {
    //   for (let item of res.docs) {
    //     if (item.id != "id_retail") {
    //       this.firebaseQuery.deleteTask('customers', item.id);
    //     }
    //     console.log(item.data());
    //   }
    // });
    // this.firebaseQuery.getTasks("suppliers").then(res => {
    //   for (let item of res.docs) {
    //     this.firebaseQuery.deleteTask('suppliers', item.id);
    //     console.log(item.data());
    //   }
    // });
    // this.firebaseQuery.createTask('customers', {
    //   id_discount : '',
    //   name: 'Khách lẻ',
    //   phone: '',
    //   address: '',
    //   code: 'KL'
    // });
  }

  ionViewWillEnter() {
    //set 7 days from startDate to endDate 
    this.startDay.setFullYear(this.endDay.getFullYear(), this.endDay.getMonth(), this.endDay.getDate() - 7);
    this.presentLoading();
    this.getBill(null);
  }

  getBill(item) {
    console.log('abc');
    delete this.bills;
    this.bills = new Array();
    delete this.show_bills;
    this.show_bills = new Array();
    this.firebaseQuery
      .getTasks_3Field("bills", "bill_type", 2, "==", "date", this.startDay, ">=", "date", this.endDay, "<=")
      .then(res => {
        for (let i in res.docs) {
          this.bills.push(res.docs[i].data());
          this.bills[this.bills.length - 1].id = res.docs[i].id;
          this.firebaseQuery
            .getTask_byID("suppliers", res.docs[i].data().id_supplier)
            .then(res1 => {
              this.bills[i].supplier_name = res1.data().name;
              if (this.bills.length == res.docs.length) {
                this.dismissLoading();
                this.show2 = true;
                this.show1 = !this.show2;
              }
            }).catch(err => {
              this.dismissLoading();
              this.show2 = true;
              this.show1 = !this.show2;
            });
        }
        if (this.bills.length == 0 && item == null) {
          this.show1 = true;
          this.show2 = !this.show1;
          this.dismissLoading();
        }
        this.show_bills = this.bills;
        //console.log(this.bills);
      })
      .catch(err => {
        console.log(err);
        this.dismissLoading();
      });
  }

  ngOnInit() { }

  //searchbill 
  searchBill(event) {
    this.show_bills = this.bills.filter(item => {
      return this.change_alias(item.supplier_name.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1 ||
        this.change_alias(item.bill_code.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1;
    });
  }
  // sort 
  sort($event) {
    ($event.detail.value == 0) ? this.sortAZ() : this.sortZA();
  }
  sortAZ() {
    this.bills.sort((prev, next) => {
      return prev.date.seconds - next.date.seconds;
    });
  }
  sortZA() {
    this.bills.sort((prev, next) => {
      return next.date.seconds - prev.date.seconds;
    });
  }
  //set StartDate()
  setStartTime(event) {
    //biến cờ
    this.timestart = true;
    this.startDay = new Date(event.detail.value);
    if (((this.endDay.getTime() - this.startDay.getTime()) / (7 * 24 * 60 * 60)) <= 1) {
      if (this.endDay.getTime() - this.startDay.getTime() < 0) {
        alert('Ngày cuối phải lớn hơn ngày đầu!');
      } else {
        this.getBill(1);
      }
    } else {
      alert('Khoảng thời gian không được quá 7 ngày!')
    }
  }
  //set EndDate()
  /* setEndTime(event) {
    delete this.show_bills;
    this.endDay = new Date(event.detail.value);
    if (((this.endDay.getTime() - this.startDay.getTime()) / (7 * 24 * 60 * 60)) <= 1) {
      if (this.endDay.getTime() - this.startDay.getTime() < 0) {
        alert('Ngày cuối phải lớn hơn ngày đầu!');
      } else {
        this.getBill(1);
      }
    } else {
      alert('Khoảng thời gian không được quá 7 ngày!');
    }
  } */
  //hàm chuyển tiếng việt thành tiếng anh
  change_alias(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  }
  // 

  gotoproductsupplier() {
    this.show1 = this.show2 = false;
    //let bill_code = this.exportSoHD();
    //this.storage.set("soHD", bill_code);
    /* this.firebaseQuery
      .createTask("bills", {
        id_staff: this.firebaseAuth.user.id,
        bill_type: 2,
        date: new Date(),
        bill_code: bill_code
      })
      .then(
        res => {
          let key = "bill";
          let value = {
            id_staff: this.firebaseAuth.user.id,
            bill_type: 2,
            date: new Date(),
            bill_code: bill_code,
            id: res.id
          };
          this.storage.set(key, value);
        },
        err => {
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      }); */
    this.router.navigateByUrl("product-import-suppliers");
  }
  //xem chi tiet bill
  gotodetail(bill) {
    //console.log(bill);
    this.show1 = this.show2 = false;
    let data: NavigationExtras = {
      state: bill
    }
    this.router.navigateByUrl('product-import-detail', data);
  }
  //ham loading
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Please wait..."
    });
    await loading.present();
    await loading.onDidDismiss();
    console.log("Loading dismissed!");
  }
  //ham dismiss loading
  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}