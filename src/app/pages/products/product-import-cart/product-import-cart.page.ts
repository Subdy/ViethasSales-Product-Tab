import { FirebaseAuth, FirebaseQuery } from './../../../database/firebase.database';
import { Component, OnInit } from '@angular/core';

import { Router, RouterModule, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-import-cart',
  templateUrl: './product-import-cart.page.html',
  styleUrls: ['./product-import-cart.page.scss'],
})
export class ProductImportCartPage implements OnInit {
  list_product: Array<any>;
  trigger_popup = false;
  supplier;
  show = false;
  show_prod;
  constructor(private router: Router,
    private storage: Storage,
    private barcode: BarcodeScanner,
    private firebaseQuery: FirebaseQuery,
    private navCtrl: NavController
  ) {
    this.supplier = this.router.getCurrentNavigation().extras.state;
    console.log(this.supplier);
    this.storage.get('list_prod').then(res => {
      if (res == null) {
        this.show_prod = false;
        this.storage.set('list_prod', []);
      } else {
        this.show_prod = true;
      }
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
    this.storage.get('list_prod').then(res => {
      if (res != null) {
        delete this.list_product;
        this.list_product = new Array();
        this.list_product = res;
        this.show_prod = true;
        //show V
        if (res.length == 0) {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    });
  }

  back() {
    this.trigger_popup = true;
  }

  deteleBillDetail() {
    this.storage.remove("list_prod");
    this.navCtrl.pop();
  }
  cancel() {
    this.trigger_popup = false;
  }

  deleteItem(item) {
    let index = this.findIndex(this.list_product,item);
    this.list_product.splice(index, 1);
    if (this.list_product.length == 0) this.show = false;
    this.storage.set("list_prod", this.list_product);
  }

  increase(item) {
    let index = this.findIndex(this.list_product, item);
    this.list_product[index].number++;
    this.storage.set("list_prod", this.list_product);
  }

  decrease(item) {
    let index = this.findIndex(this.list_product, item);
    if (this.list_product[index].number == 0)
      return;
    else {
      this.list_product[index].number--;
      this.storage.set("list_prod", this.list_product);
    }
  }

  findIndex(array, i) {
    let index = array.findIndex((item) => {
      return (item.name == i.name) && (item.id == i.id);
    });
    return index;
  }

  gotoProductConfirm() {
    this.storage.set("list_prod", this.list_product);
    this.router.navigateByUrl('product-import-confirm');
  }


  scan() {
    if (this.list_product == undefined) {
      this.list_product = new Array();
    }
    this.storage.get("bill").then(bill => {
      //console.log(bill.id);
      this.barcode.scan().then(res => {
        if (!res.cancelled) {
          this.firebaseQuery.getTasks_Field("products", "barcode", parseInt(res.text), "==")
          .then(res1 => {
            if (res1.empty) {
              alert('Sản phẩm không tồn tại!');
            } else {
              //console.log(res1.docs[0].data());
              this.firebaseQuery.getTasks_Field("warehouses", "id_product", res1.docs[0].id, "==").then(res2 => {
                if (res2.empty) {
                  alert('Sản phẩm không chứa kho!');
                } else {
                  //show V
                  this.show_prod = true;
                  this.show = true;
                  //console.log(res2.docs[0].data());
                  let index = this.list_product.findIndex( (item) => {
                    return item.barcode == res.text;
                  });
                  if (index == -1) {
                    this.list_product.push({
                      name: res1.docs[0].data().name,
                      id: res1.docs[0].id,
                      id_bill: bill.id,
                      price: res1.docs[0].data().price,
                      price_import: res2.docs[0].data().price,
                      number: 1,
                      barcode: res1.docs[0].data().barcode
                    });
                    this.storage.set('list_prod', this.list_product);
                  } else {
                    alert ("Sản phẩm đã tồn tại trong danh sách!");
                  }
                }
              }).catch(err => {
                alert("warehouses: " + err);
              });
            }
          }).catch(err => {
            alert("products: " + err);
          });
        } else {
          this.router.navigateByUrl('product-import-cart');
        }
      }).catch(err => {
        alert(err);
      });
    });
  }

}
