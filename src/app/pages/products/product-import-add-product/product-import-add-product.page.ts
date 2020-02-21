import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FirebaseQuery, FirebaseImage } from './../../../database/firebase.database';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, RouterModule, NavigationExtras} from '@angular/router';
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
  id_bill;
  thumbnail = "/assets/imgs/add.png";
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
      //get id_bill
      this.storage.get('id_bill').then(res => {
        this.id_bill = res;
      })
      //get list bill_detail 
      this.storage.get("list_prod").then(res => {
        this.bill_detail = res;
      })
      //nha cung cap 
      this.supplier = this.router.getCurrentNavigation().extras.state;
      
      //khoi tao form
      this.product = this.formBuilder.group({
        name: ['', Validators.required],
        id_category: ['', Validators.required],
        size: ['', Validators.required],
        price: ['', Validators.required],
        id_discount: ['', Validators.required],
        SKU: ['', Validators.required],
        unit: ['', Validators.required],
        color: ['', Validators.required],
        barcode: ['', Validators.compose([Validators.minLength(10), Validators.required])],
        price_import: ['', Validators.required],
        id_supplier: [this.supplier.name],
        allow_sell: [true]
      });
    }

  ngOnInit() {
  }
  scan () {
    this.barcode.scan().then(data => {
      this.product.setValue({barcode: data.text});
    }).catch(err => {
      alert(err);
    })
  }
  save() {
    if (this.product.value.barcode == '') {
      alert('Vui lòng nhập barcode sản phẩm');
    } else {
      console.log(this.product.value);
      //luu san pham chuyen di
      this.firebaseQuery.createTask('products', {
        id_category: this.product.value.id_category,
        name: this.product.value.name,
        size: this.product.value.size,
        price: this.product.value.price,
        img: this.thumbnail,
        id_discount: this.product.value.id_discount,
        SKU: this.product.value.SKU,
        color: this.product.value.color,
        unit: this.product.value.unit,
        barcode: this.product.value.barcode,
        allow_sell: this.product.value.allow_sell
      }).then(res => {
        console.log(res);
        this.bill_detail.push({
          name: this.product.value.name,
          id: res.id,
          id_bill: this.id_bill,
          price: this.product.value.price,
          price_import: this.product.value.price_import,
          number: 1
        });
        this.storage.set('list_prod', this.bill_detail);
        this.router.navigateByUrl('product-import-cart');
      }, err => {
        console.log('Error: ', err);
      }).catch(err => {
        console.log(err);
      });
      }
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
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

  async uploadImageToFirebase(image){
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
      this.thumbnail = photoURL;
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  
}
