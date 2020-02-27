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
  startDay = "2019-12-07";
  endDay = "2019-12-08";
  // trạng thái show1 (chưa có bill), show2 (có bill)
  show1;
  show2;
  bills: Array<any>;
  constructor(
    private router: Router,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private storage: Storage,
    private loadingController: LoadingController
  ) {
    this.firebaseQuery.getTasks("warehouses").then(res => {
      for (let item of res.docs) {
        this.firebaseQuery.deleteTask('warehouses', item.id);
        console.log(item.data());
      }
    });
    this.firebaseQuery.getTasks("bill_details").then(res => {
      for (let item of res.docs) {
        this.firebaseQuery.deleteTask('bill_details', item.id);
        console.log(item.data());
      }
    });
    this.firebaseQuery.getTasks("products").then(res => {
      console.log(res);
      for (let item of res.docs) {
        this.firebaseQuery.deleteTask('products', item.id);
        console.log(item.data());
      }
    });
    this.firebaseQuery.getTasks("bills").then(res => {
      for (let item of res.docs) {
        this.firebaseQuery.deleteTask('bills', item.id);
        console.log(item.data());
      }
    });
    this.firebaseQuery.getTasks("customers").then(res => {
      for (let item of res.docs) {
        if (item.id != "id_retail") {
          this.firebaseQuery.deleteTask('customers', item.id);
        }
        console.log(item.data());
      }
    });
    this.firebaseQuery.getTasks("suppliers").then(res => {
      for (let item of res.docs) {
        this.firebaseQuery.deleteTask('suppliers', item.id);
        console.log(item.data());
      }
    });
    // this.firebaseQuery.createTask('customers', {
    //   id_discount : '',
    //   name: 'Khách lẻ',
    //   phone: '',
    //   address: '',
    //   code: 'KL'
    // });
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.getBill();
  }

  getBill() {
    delete this.bills;
    this.bills = new Array();
    this.firebaseQuery
      .getTasks_Field("bills", "bill_type", 2, "==")
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
        if (this.bills.length == 0) {
          this.show1 = true;
          this.show2 = !this.show1;
          this.dismissLoading();
        }
        //console.log(this.bills);
      })
      .catch(err => {
        console.log(err);
        this.dismissLoading();
      });
  }

  ngOnInit() { }
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