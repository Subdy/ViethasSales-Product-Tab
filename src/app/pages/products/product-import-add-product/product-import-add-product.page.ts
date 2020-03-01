import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FirebaseQuery, FirebaseImage } from 'src/app/database/firebase.database';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product-import-add-product',
  templateUrl: './product-import-add-product.page.html',
  styleUrls: ['./product-import-add-product.page.scss'],
})
export class ProductImportAddProductPage implements OnInit {
  product: FormGroup;
  supplier;
  bill_detail;
  save_btn = false;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private barcode: BarcodeScanner,
    private firebaseQuery: FirebaseQuery,
    private imagePicker: ImagePicker,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firebaseImage: FirebaseImage,
    private webview: WebView,
    private storage: Storage
  ) {
    //get list bill_detail trong storage
    this.storage.get("list_prod").then(res => {
      this.bill_detail = res;
    })
    //nha cung cap 
    this.supplier = this.router.getCurrentNavigation().extras.state;
    //khoi tao form
    this.product = this.formBuilder.group({
      img: ['/assets/imgs/add.png'],
      name: ['', Validators.required],
      barcode: ['', Validators.required],
      unit: ['', Validators.required],
      price_import: ['', Validators.required],
      price: ['', Validators.required],
      id_category: ['', Validators.required],
      id_discount: ['', Validators.required],
      id_supplier: [this.supplier.id],
      allow_sell: [true]
    });
  }

  ngOnInit() {
  }
  // hàm lấy barcode
  scan() {
    this.barcode.scan().then(data => {
      this.product.controls['barcode'].setValue(data.text);
    }).catch(err => {
      alert(err);
    })
  }
  //hàm lưu sản phẩm
  save() {
    if (this.product.value.barcode.length == 0) {
      alert('Vui lòng nhập barcode sản phẩm');
    } else {
      this.save_btn = true;
      console.log(this.product.value);
      //luu san pham chuyen di
      this.firebaseQuery.createTask('products', {
        id_category: this.product.value.id_category,
        name: this.product.value.name,
        price: this.product.value.price,
        price_import: this.product.value.price_import,
        img: this.product.value.img,
        id_discount: this.product.value.id_discount,
        unit: this.product.value.unit,
        barcode: this.product.value.barcode,
        allow_sell: this.product.value.allow_sell,
        id_supplier: this.product.value.id_supplier
      }).then(res => {
        console.log(res);
        this.bill_detail.push({
          id: res.id,
          id_category: this.product.value.id_category,
          name: this.product.value.name,
          price: this.product.value.price,
          price_import: this.product.value.price_import,
          img: this.product.value.img,
          id_discount: this.product.value.id_discount,
          unit: this.product.value.unit,
          barcode: this.product.value.barcode,
          allow_sell: this.product.value.allow_sell,
          id_supplier: this.product.value.id_supplier,
          number: 1
        });
        // set list bill detail sau khi thêm sản phẩm mới vào
        this.storage.set('list_prod', this.bill_detail);
        this.router.navigateByUrl('product-import-cart');
      }, err => {
        console.log('Error: ', err);
      }).catch(err => {
        console.log('products: ' + err);
      });
    }
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
      .then((result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  async uploadImageToFirebase(image) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseImage.uploadThumbnail(image_src, randomId, 128, 128)
      .then(photoURL => {
        this.product.controls['img'].setValue(photoURL);
        loading.dismiss();
        toast.present();
      }, err => {
        console.log(err);
      })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
