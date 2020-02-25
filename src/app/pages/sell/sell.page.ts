import { FirebaseQuery, FirebaseAuth } from './../../database/firebase.database';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  number: number;
  bills: Array<any>;
  constructor(
    private router: Router,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getData();
  }
  getData() {
    this.bills = new Array();
    this.number = 0;
    this.firebaseQuery.getTasks_Field("bills", "bill_type", 1, "==").then(res => {
      this.number = res.docs.length;
      if (res.empty) {
        console.log("empty");
      }else {
        for (let i in res.docs) {
          console.log(res.docs[i].data());
          this.bills.push(res.docs[i].data());
          this.bills[this.bills.length - 1].id = res.docs[i].id;
        }
      }
    })
  }
  gotoscan() {
    this.router.navigateByUrl('scan');
  }

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

  gotosellcart(){
    this.router.navigateByUrl('sell-cart');
    // let bill_code = this.exportSoHD();
    // let key = "bill";
    // let value = {
    //   id_staff: this.firebaseAuth.user.id,
    //   bill_type: 1,
    //   date: new Date().toString(),
    //   bill_code: bill_code,
    // };
    // this.storage.set(key, value).then(res=> {
    //   console.log(res);
      
    // });
  }
}
