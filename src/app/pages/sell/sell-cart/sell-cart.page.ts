import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirebaseQuery } from 'src/app/database/firebase.database';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Events, IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-sell-cart',
  templateUrl: './sell-cart.page.html',
  styleUrls: ['./sell-cart.page.scss'],
})
export class SellCartPage implements OnInit {
  @ViewChild('autofocus', { static: false }) searchbar: IonSearchbar;
  //măng chứa tất cả thông tin sản phẩm
  search_product: Array<any>;
  products: Array<any>;
  list_product: Array<any>;
  show = false;
  //biến cờ ẩn list sản phẩm
  show_prod;
  //biến cờ searchbar
  show_searchbar: boolean = false;
  constructor(
    private storage: Storage,
    private router: Router,
    private barcode: BarcodeScanner,
    private firebaseQuery: FirebaseQuery,
    private event: Events
  ) {
    // kiểm tra danh sách sản phẩm lưu trong storage
    this.storage.get('list_prod').then(res => {
      if (res == null) {
        this.show_prod = false;
        //khởi tạo là mảng rỗng
        this.list_product = new Array();
        this.storage.set('list_prod', this.list_product);
      } else {
        this.show_prod = true;
      }
    });
  }

  ngOnInit() {
  }
  //get DataProducts
  getDataProducts() {
    this.products = new Array();
    this.firebaseQuery.getTasks_Field('products', "allow_sell", true, "==").then(res => {
      for (let i in res.docs) {
        this.products.push(res.docs[i].data());
        this.products[this.products.length - 1].id = res.docs[i].id;
      }
      console.log(this.products);
    });
  }
  // hàm search sản phẩm 
  searchProd() { //kích hoạt thanh search
    this.show_searchbar = true;
  }
  dismissSearchProd() { // hủy kích hoạt thanh search
    delete this.search_product;
    this.show_searchbar = false;
    console.log('dismiss')
  }
  searchProduct(event) {
    this.search_product = new Array();
    this.search_product = this.products.filter((item) => {
      return this.change_alias(item.name.toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1 ||
        this.change_alias(item.price.toString().toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1 ||
        this.change_alias(item.barcode.toString().toLowerCase()).indexOf(event.detail.value.toLowerCase()) != -1
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
  //ham chon san pham bang search
  selectProduct(item) {
    //khoi tao
    if (this.list_product == undefined) {
      this.list_product = new Array();
    }
    //Cho phep hien thi list danh sach
    this.show_prod = true;
    this.show = true;
    //console.log(res2.docs[0].data());
    let index = this.list_product.findIndex((x) => {
      return x.id == item.id;
    });
    if (index == -1) {
      this.list_product.push({
        name: item.name,
        id: item.id,
        price: item.price,
        number: 1,
        barcode: item.barcode
      });
      this.storage.set('list_prod', this.list_product);
    } else {
      this.list_product[index].number += 1;
      this.storage.set('list_prod', this.list_product);
    }
  }
  goBack() {
    this.event.publish("back", true);
  }
  ionViewWillEnter() {
    //lấy toàn bộ thông tin sản phẩm
    this.getDataProducts();
    // lấy danh sách sp trong storage
    this.storage.get('list_prod').then(res => {
      if (res != null) {
        delete this.list_product;
        this.list_product = new Array();
        this.list_product = res;
        this.show_prod = true;
        //hiển thị dấu V xác nhận
        if (res.length == 0) {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    });
  }
  //hàm xóa từng sp
  deleteItem(item) {
    let index = this.findIndex(this.list_product, item);
    this.list_product.splice(index, 1);
    if (this.list_product.length == 0) this.show = false;
    this.storage.set("list_prod", this.list_product);
  }
  // tăng số lượng sp
  increase(item) {
    let index = this.findIndex(this.list_product, item);
    this.list_product[index].number++;
    this.storage.set("list_prod", this.list_product);
  }
  // giảm số lượng sp
  decrease(item) {
    let index = this.findIndex(this.list_product, item);
    if (this.list_product[index].number == 0)
      return;
    else {
      this.list_product[index].number--;
      this.storage.set("list_prod", this.list_product);
    }
  }
  //tìm vị trí i trong array
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

  //hàm scan sản phẩm
  scan() {
    if (this.list_product == undefined) {
      this.list_product = new Array();
    }
    //console.log(bill.id);
    this.barcode.scan({
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
    }).then(res => {
      if (!res.cancelled) {
        //tim san pham theo barcode
        let res1 = this.products.filter(item => item.barcode == parseInt(res.text))
        if (res1.length == 0) {
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
              name: res1[0].name,
              id: res1[0].id,
              price: res1[0].price,
              number: 1,
              barcode: res1[0].barcode
            });
            this.storage.set('list_prod', this.list_product);
          } else {
            this.list_product[index].number += 1;
            this.storage.set('list_prod', this.list_product);
          }
        }
      } else {
        this.router.navigateByUrl('sell-cart');
      }
    }, error => {
      alert("Scanning failed: " + error);
    }).catch(err => {
      alert(err);
    });
  }
}
