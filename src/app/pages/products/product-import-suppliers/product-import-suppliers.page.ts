import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FirebaseQuery } from '../../../database/firebase.database';
import { AlertController, NavController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController
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
  delete_bill() {
    // this.alertCtrl.create({
    //   header: 'Thoát',
    //   message: 'Hành động sẽ xóa',
    //   buttons: [{
    //     text : 'Cancel',
    //     handler: () => {
    //       this.storage.get("id_bill").then(res => {
    //         this.firebaseQuery.deleteTask("bills", res).then(res => {
    //           console.log(res);
    //         }, err => {
    //           console.log(err);
    //         }).catch(err=> {
    //           console.log(err);
    //         })
    //       })
          
    //     }
    //   }]
    // });
    //console.log("ssss")
    this.trigger_popup = true;
  }
  deteleSupplier() {
    this.storage.get("bill").then(res => {
    this.firebaseQuery.deleteTask("bills", res.id).then(res => {
        console.log(res);
        this.storage.remove("bill");
        this.storage.remove("soHD");
        this.storage.remove("list_prod");
        this.storage.remove("supplier");
        this.navCtrl.pop();
      }, err => {
        console.log(err);
      }).catch(err=> {
        console.log(err);
      })
  });
  }
  cancel(){
    this.trigger_popup = false;
  }

}
