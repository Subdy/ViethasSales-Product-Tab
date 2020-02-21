import { FirebaseAuth, FirebaseQuery } from './../../../database/firebase.database';
import { Component, OnInit } from '@angular/core';

import { Router, RouterModule, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-product-import-cart',
  templateUrl: './product-import-cart.page.html',
  styleUrls: ['./product-import-cart.page.scss'],
})
export class ProductImportCartPage implements OnInit {
  list_product: Array<any>; /* =[
    {
      id:1,
      name:'Áo Khoát Chống Tia Uv',
      money:'250,000',
      total:'500,000'
    }
  ] */
  supplier;
  show = false;
  constructor( private router: Router,
    private storage: Storage,
    private barcode: BarcodeScanner,
    private firebaseQuery: FirebaseQuery
    ) {
    this.supplier = this.router.getCurrentNavigation().extras.state;
    console.log(this.supplier);
    this.storage.get('list_prod').then(res => {
      if (res == null ) this.storage.set('list_prod', []);
    });
  }

  ngOnInit() {
  }
  gotoCreateProduct() {
    let data: NavigationExtras = {
      state: this.supplier
    };
    this.router.navigate(['/product-import-add-product'], data);
  }

  ionViewWillEnter() {
    this.storage.get('list_prod').then(res=> {
      if (res.length > 0) {
        this.list_product = new Array();
        this.list_product = res;
        //show V
        this.show = true;
      }
    });
  }

  deleteItem(item) {
    let index = this.findIndex(item);
    this.list_product.splice(index, 1);
    if (this.list_product.length == 0) this.show = false;
  }

  increase(item) {
    let index = this.findIndex(item);
    this.list_product[index].number ++;
  }

  decrease(item) {
    let index = this.findIndex(item);
    if (this.list_product[index].number == 0) 
      return;
    else {
      this.list_product[index].number --;
    }
  }

  findIndex(i) {
    let index = this.list_product.findIndex((item)=> {
      return (item.name == i.name) && (item.id == i.id); 
    });
    return index;
  }

  gotoProductConfirm() {
    this.storage.set("list_prod", this.list_product);
    this.router.navigateByUrl('product-import-confirm');
  }


  scan() {
    this.barcode.scan().then(res => {
      this.firebaseQuery.getTasks_Field("products", "barcode", res.text, "==")
      .then(res=> {
        console.log(res);
      })
    })
  }

}
