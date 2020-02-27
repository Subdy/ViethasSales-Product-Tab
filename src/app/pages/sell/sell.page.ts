import { FirebaseQuery, FirebaseAuth } from './../../database/firebase.database';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  //Tính tổng số bill
  number: number;
  // list chứa bill
  bills: Array<any>;
  //Hôm nay 0h- 23h59
  startDateTime = new Date();
  endDateTime = new Date();
  //biến cờ show
  show1;
  show2;
  constructor(
    private router: Router,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private storage: Storage,
    private loadingController: LoadingController
  ) {

  }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    //khởi tạo biến cờ
    this.show1 = false;
    this.show2 = false;
    this.presentLoading();
    this.getData();
  }
  getData() {
    this.startDateTime.setUTCHours(0, 0, 0);
    this.endDateTime.setUTCHours(23, 59, 59);
    this.bills = new Array();
    this.number = 0;
    this.firebaseQuery.getTasks_2Field("bills", "date", this.startDateTime, ">=", "date", this.endDateTime, "<=").then(res => {
      if (res.empty) {
        this.show1 = true;
        this.dismissLoading();
        console.log("empty");
      } else {
        for (let i in res.docs) {
          if (res.docs[i].data().bill_type != 2 &&
            res.docs[i].data().bill_type != 6 &&
            res.docs[i].data().bill_type != 7 &&
            res.docs[i].data().bill_type != 8) {
            this.number++;
            //thêm loại khách hàng
            this.firebaseQuery.getTask_byID('customers', res.docs[i].data().id_customer).then(res2 => {
              this.bills.push(res.docs[i].data());
              this.bills[this.bills.length - 1].id = res.docs[i].id;
              //kiểm tra loại hóa đơn
              switch (res.docs[i].data().bill_type) {
                //ban hang
                case 1: {
                  this.bills[this.bills.length - 1].status_bill = 'Đã bán';
                  break;
                }
                //tra hang
                case 3: {
                  this.bills[this.bills.length - 1].status_bill = 'Trả hàng';
                  break;
                }
                //huy bill
                case 4: {
                  this.bills[this.bills.length - 1].status_bill = 'Đã hủy';
                  break;
                }
                //luu tam
                case 5: {
                  this.bills[this.bills.length - 1].status_bill = 'Lưu tạm';
                  break;
                }
              }
              //console.log(res2.id);
              //console.log(res2.data());
              //Kiểm tra khách lẻ hoặc thành viên
              res2.id == "id_retail" ?
                this.bills[this.bills.length - 1].customer_type = "Khách lẻ" :
                this.bills[this.bills.length - 1].customer_type = "Thành viên";
            }).catch(err1 => {
              alert('customers: ' + err1)
              this.dismissLoading();
            })
          }
          // kết thúc show kết quả
          if (parseInt(i) == res.docs.length - 1) { }
        }
        console.log(this.bills);
      }
    }).catch(err2 => {
      alert("bills: " + err2);
      this.dismissLoading();
    }).finally(() => {
      if (this.number == 0) {
        this.show1 = true;
        this.dismissLoading();
      } else {
        this.show2 = true;
        this.dismissLoading();
      }
    })
  }

  gotosellcart() {
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
