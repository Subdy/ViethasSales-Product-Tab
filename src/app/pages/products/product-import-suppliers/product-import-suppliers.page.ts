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
  show = false;
  trigger_popup = false;
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
    this.firebaseQuery.getTasks('suppliers').then(res => {
      if (!res.empty){
        for (let i in res.docs) {
          this.list_suppliers.push(res.docs[i].data());
          this.list_suppliers[this.list_suppliers.length - 1].id = res.docs[i].id;
          if (this.list_suppliers.length > 0) this.show = true;
        }
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

