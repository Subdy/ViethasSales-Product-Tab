import { FirebaseQuery, FirebaseAuth } from './../../database/firebase.database';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { LoadingController, Events } from '@ionic/angular';
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
  show_bills: Array<any>;
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
    private loadingController: LoadingController,
    private event: Events
  ) {
    //bắt sự kiện load lại bill
    this.event.subscribe("back", res => {
      console.log(res);
      res == true ? this.getData() : null;
    });
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getData();
  }
  ngOnDestroy() {
    //hủy sự kiện
    this.event.unsubscribe("back");
  }
  getData() {
    //khởi tạo biến cờ  
    this.show1 = false;
    this.show2 = false;
    this.presentLoading();
    //settime today
    this.startDateTime.setUTCHours(0, 0, 0);
    this.endDateTime.setUTCHours(23, 59, 59);
    //khỏi tạo
    this.bills = new Array();
    this.show_bills = new Array();
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
              // Xử lí dữ liệu
              if (parseInt(i) == res.docs.length - 1) {
                //console.log(this.bills);
                //SẮP XẾP MỚI NHẤT -> CŨ NHẤT
                this.bills = this.bills.sort((a, b) => {
                  return b.date.seconds - a.date.seconds;
                });

                this.show_bills = this.bills;
                // biến cờ
                if (this.number == 0) {
                  this.show1 = true;
                  this.dismissLoading();
                } else {
                  this.show2 = true;
                  this.dismissLoading();
                }
              }
            }).catch(err1 => {
              alert('customers: ' + err1)
              this.dismissLoading();
            });
          }
        }
        //console.log(this.bills);
      }
    }).catch(err2 => {
      alert("bills: " + err2);
      this.dismissLoading();
    });
  }

  //searchbill
  searchBill(event) {
    this.show_bills = this.bills.filter(item => {
      return this.change_alias(item.bill_code.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1 ||
        this.change_alias(item.customer_type.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1 ||
        this.change_alias(item.status_bill.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1
    });
  }

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

  gotosellcart() {
    this.router.navigateByUrl('sell-cart');
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
