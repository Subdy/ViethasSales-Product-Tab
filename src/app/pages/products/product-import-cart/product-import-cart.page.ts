import { FirebaseAuth, FirebaseQuery } from './../../../database/firebase.database';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, RouterModule, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController, IonSearchbar, Platform } from '@ionic/angular';

@Component({
  selector: 'app-product-import-cart',
  templateUrl: './product-import-cart.page.html',
  styleUrls: ['./product-import-cart.page.scss'],
})
export class ProductImportCartPage implements OnInit {
  // document searchbar
  @ViewChild('searchInput', { static: false }) searchInput: IonSearchbar;
  //măng chứa tất cả thông tin sản phẩm
  search_product: Array<any>;
  products: Array<any>;
  //mảng chứa list sản phẩm được thêm vào
  list_product: Array<any>;
  //biến cờ popup
  trigger_popup = false;
  //thông tin nhà cung cấp
  supplier;
  //show button V (xác nhận)
  show = false;
  // biến cờ show prod
  show_prod;
  //biến cờ searchbar
  opacity: boolean = false;
  show_searchbar: boolean = false;
  backButtonSub;

  constructor(private router: Router,
    private storage: Storage,
    private barcode: BarcodeScanner,
    private firebaseQuery: FirebaseQuery,
    private navCtrl: NavController,
    private platform: Platform,
  ) {
    this.supplier = this.router.getCurrentNavigation().extras.state;
    // kiểm tra list sản phẩm
    this.storage.get('list_prod').then(res => {
      if (res == null) {
        this.show_prod = false;
        this.storage.set('list_prod', []);
      } else {
        this.show_prod = true;
      }
    });
    /* this.platform.backButton.subscribeWithPriority(1, () => {
      if (this.router.url.includes("product-import-cart")) {
        console.log('x');
        //this.goBack();
      } else {
        console.log('y');
        //this.navCtrl.pop();
      }
    }); */
    console.log(this.router.url)
    if (this.platform.platforms().includes('android')) {
      console.log('x');
      this.platform.backButton.subscribeWithPriority(9999999999999, () => {
        if (this.router.url.includes("/product-import-cart")) {
          console.log('z');
          this.goBack();
        } else {
          console.log('y');
          this.navCtrl.back();
        }
      });
    }
  }

  ngOnInit() {
  }

  /* ionViewDidEnter() {
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(
      10000,
      () => this.goBack()
    );
  }

  ionViewWillLeave() {
    this.backButtonSub.unsubscribe();
  } */

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
        //show V
        if (res.length == 0) {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    });
  }

  //get DataProducts
  getDataProducts() {
    this.products = new Array();
    this.firebaseQuery.getTasks('products').then(res => {
      for (let i in res.docs) {
        this.products.push(res.docs[i].data());
        this.products[this.products.length - 1].id = res.docs[i].id;
      }
      console.log(this.products);
    });
  }
  // hàm thêm sản phẩm
  gotoCreateProduct() {
    let data: NavigationExtras = {
      state: this.supplier
    };
    this.router.navigate(['/product-import-add-product'], data);
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
  //hàm focus searchbar
  focusButton() {
    setTimeout(() => {
      this.searchInput.setFocus();
    }, 400);
  }
  // hàm kích hoạt search sản phẩm 
  searchProd() { //kích hoạt thanh search
    this.show_searchbar = true;
    this.focusButton();
    this.opacity = true;
    this.show = !this.show_searchbar;
  }
  dismissSearchProd() { // hủy kích hoạt thanh search
    delete this.search_product;
    this.show_searchbar = false;
    this.list_product.length > 0 ? this.show = true : this.show = false;
    console.log('dismiss');
  }
  // hàm search product
  searchProduct(event) {
    if (event.detail.value == "") {
      this.opacity = true;
      delete this.search_product;
    } else {
      this.search_product = new Array();
      this.search_product = this.products.filter((item) => {
        return this.change_alias(item.name.toLowerCase()).indexOf(this.change_alias(event.detail.value.toLowerCase())) != -1 ||
          item.price_import.toString().indexOf(event.detail.value.toLowerCase()) != -1 ||
          this.change_alias(item.barcode.toLowerCase()).indexOf(this.change_alias(event.detail.value.toLowerCase())) != -1
      });
      this.search_product.length > 0 ? this.opacity = false : this.opacity = true;
    }
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
      // sản phẩm không tồn tại trong list
      let data = { ...item };
      data.old_price_import = item.price_import;
      data.number = 1;
      this.list_product.push(data);
      this.setValueProduct();
    } else {
      //sản phẩm đã tồn tại trong list
      this.list_product[index].number += 1;
      this.setValueProduct();
    }
  }

  // Xử lí popup
  goBack() {
    this.trigger_popup = true;
  }
  //Đồng ý xóa hết bill trong storage
  deteleBillDetail() {
    this.storage.remove("list_prod");
    this.navCtrl.pop();
  }
  //Hủy popup
  cancel() {
    this.trigger_popup = false;
  }
  //xóa từng phần tử được thêm vào
  deleteItem(item) {
    let index = this.findIndex(this.list_product, item);
    this.list_product.splice(index, 1);
    if (this.list_product.length == 0) this.show = false;
    this.setValueProduct();
  }
  //tăng số lượng
  increase(item) {
    let index = this.findIndex(this.list_product, item);
    this.list_product[index].number++;
    this.setValueProduct();
  }
  //giảm số lượng
  decrease(item) {
    let index = this.findIndex(this.list_product, item);
    if (this.list_product[index].number == 0)
      return;
    else {
      this.list_product[index].number--;
      this.setValueProduct();
    }
  }
  //cập nhật giá mới
  //tìm vị trí i trong mảng array
  findIndex(array, i) {
    let index = array.findIndex((item) => {
      return (item.name == i.name) && (item.id == i.id);
    });
    return index;
  }
  //hàm set lại list product(storage);
  setValueProduct() {
    this.storage.set("list_prod", this.list_product);
  }
  // hàm xác nhận chuyển qua bill
  gotoProductConfirm() {
    this.setValueProduct();
    this.router.navigateByUrl('product-import-confirm');
  }
  //hàm scan sản phẩm
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
        let res1 = this.products.filter(item => item.barcode.indexOf(res.text) == 0)
        if (res1.length == 0) {
          alert('Sản phẩm không tồn tại!');
        } else {
          //console.log(res1.docs[0].data());
          this.show_prod = true;
          this.show = true;
          //console.log(res2.docs[0].data());
          let index = this.list_product.findIndex((item) => {
            return item.barcode.localeCompare(res.text) == 0;
          });
          //chưa có sản phẩm trong list
          if (index == -1) {
            let data = { ...res1[0] };
            data.old_price_import = res1[0].price_import;
            data.number = 1;
            this.list_product.push(data);
            this.setValueProduct();
          } else {
            //sp đã tồn tại trong list sản phẩm
            this.list_product[index].number += 1;
            this.setValueProduct();
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
