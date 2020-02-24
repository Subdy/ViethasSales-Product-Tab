import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirebaseQuery } from 'src/app/database/firebase.database';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sell-cart',
  templateUrl: './sell-cart.page.html',
  styleUrls: ['./sell-cart.page.scss'],
})
export class SellCartPage implements OnInit {
  list_product: Array<any>;
  show = false;
  show_prod;
  constructor(
    private storage: Storage,
    private router: Router,
    private barcode: BarcodeScanner,
    private firebaseQuery: FirebaseQuery,
  ) {
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
    this.router.navigateByUrl('sell');
  }

  deleteItem(item) {
    let index = this.findIndex(this.list_product, item);
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
    this.router.navigateByUrl('sell-info');
  }


  scan() {
    if (this.list_product == undefined) {
      this.list_product = new Array();
    }
    this.storage.get("bill").then(bill => {
      //console.log(bill.id);
      this.barcode.scan({
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : true, // iOS and Android
      }).then(res => {
        if (!res.cancelled) {
          this.firebaseQuery.getTasks_Field("products", "barcode", res.text, "==")
            .then(res1 => {
              if (res1.empty) {
                alert('Sản phẩm không tồn tại!');
              } else {
                //console.log(res1.docs[0].data());
                this.show_prod = true;
                this.show = true;
                //console.log(res2.docs[0].data());
                let index = this.list_product.findIndex((item) => {
                  return item.barcode == res.text;
                });
                if (index == -1) {
                  this.list_product.push({
                    name: res1.docs[0].data().name,
                    id: res1.docs[0].id,
                    //id_bill: bill.id,
                    price: res1.docs[0].data().price,
                    number: 1,
                    barcode: res1.docs[0].data().barcode
                  });
                  this.storage.set('list_prod', this.list_product);
                } else {
                  alert("Sản phẩm đã tồn tại trong danh sách!");
                }
              }
            }).catch(err => {
              alert("products: " + err);
            });
        } else {
          this.router.navigateByUrl('sell-cart');
        }
      }, error => {
        alert("Scanning failed: " + error);
      });
    }).catch(err => {
      alert(err);
    });
  }
}
