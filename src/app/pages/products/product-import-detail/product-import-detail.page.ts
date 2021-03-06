import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseQuery } from './../../../database/firebase.database';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-product-import-detail',
  templateUrl: './product-import-detail.page.html',
  styleUrls: ['./product-import-detail.page.scss'],
})

export class ProductImportDetailPage implements OnInit {
  bill;
  list_bill: Array<any>;
  num_total = 0;
  show = false;
  constructor(
    private router: Router,
    private firebaseQuery: FirebaseQuery,
    private loadingController: LoadingController
  ) {
    this.presentLoading();
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.list_bill = new Array();
    this.bill = this.router.getCurrentNavigation().extras.state;
    console.log(this.bill)
    this.firebaseQuery.getTasks_Field(
      "bill_details",
      "id_bill",
      this.bill.id,
      "==")
      .then(res => {
        if (res.empty) {
          console.log('empty');
          this.dismissLoading();
          this.show = true;
        } else {
          console.log(res)
          for (let i in res.docs) {
            console.log(res.docs[i].data());
            this.list_bill.push(res.docs[i].data());
            this.list_bill[this.list_bill.length - 1].id = res.docs[i].id;
            this.num_total += res.docs[i].data().number;
            //Show
            if (parseInt(i) == res.docs.length - 1) {
              this.dismissLoading();
              this.show = true;
            }
          }
        }
      }).catch(err => {
        this.dismissLoading();
      });
  }
  deletebill() {
    this.firebaseQuery.deleteTask("bills", this.bill.id).then(res => {
      console.log('Removed');
      this.router.navigateByUrl('product-import');
    }).catch(err => {
      console.log(err);
    });
  }

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
