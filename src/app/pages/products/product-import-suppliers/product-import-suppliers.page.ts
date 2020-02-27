import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FirebaseQuery } from '../../../database/firebase.database';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product-import-suppliers',
  templateUrl: './product-import-suppliers.page.html',
  styleUrls: ['./product-import-suppliers.page.scss'],
})
export class ProductImportSuppliersPage implements OnInit {
  list_suppliers: Array<any>;
  show_suppliers: Array<any>;
  //biến cờ
  show1: boolean = false;
  show2: boolean = false;
  constructor(
    private router: Router,
    private firebaseQuery: FirebaseQuery,
    private storage: Storage,
    private loadingController: LoadingController
  ) {
    //this.getDataSuppliers();
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getDataSuppliers();
  }
  gotoproductaddsupplier() {
    this.router.navigateByUrl('product-import-add-suppliers');
  }
  getDataSuppliers() {
    this.list_suppliers = new Array();
    this.show_suppliers = new Array();
    this.firebaseQuery.getTasks('suppliers').then(res => {
      if (!res.empty) {
        for (let i in res.docs) {
          this.list_suppliers.push(res.docs[i].data());
          this.list_suppliers[this.list_suppliers.length - 1].id = res.docs[i].id;
          if (parseInt(i) == res.docs.length - 1) {
            this.show_suppliers = this.list_suppliers;
            this.show1 = true;
            this.show2 = !this.show1;
            console.log(this.show_suppliers);
          }
        }
      } else {
        this.show2 = true;
        this.show1 = !this.show2;
      }
    });
  }
  gotoproductimportcart(item) {
    let data: NavigationExtras = {
      state: item
    }
    this.router.navigate(['/product-import-cart'], data);
    this.storage.set("supplier", item);
  }
  //searchSupplier
  searchSupplier(event) {
    this.show_suppliers = this.list_suppliers.filter(item => {
      return this.change_alias(item.name.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1 ||
        item.phone.indexOf(event.detail.value) != -1 ||
        this.change_alias(item.email.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1 ||
        this.change_alias(item.tax_number.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1;
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

