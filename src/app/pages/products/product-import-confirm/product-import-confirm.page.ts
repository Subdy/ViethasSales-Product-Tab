import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseQuery, FirebaseAuth } from 'src/app/database/firebase.database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-import-confirm',
  templateUrl: './product-import-confirm.page.html',
  styleUrls: ['./product-import-confirm.page.scss'],
})

export class ProductImportConfirmPage implements OnInit {
  //mã đơn hàng
  bill_code;
  //Ngày nhập hàng
  bill_date;
  //thông tin nhà cung cấp
  supplier;
  supplier_name; //bind qua html
  // chứa list sản phẩm
  bill_detail: Array<any>;
  // tổng số lượng, tổng đơn giá
  num_total;
  total;
  //biến cờ save
  save_btn = false;
  //thuế
  tax = 0;
  tax_percent = 0;
  constructor(
    private storage: Storage,
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private router: Router
  ) {
    //Get Data from the storage
    this.storage.get("supplier").then(res => {
      this.supplier = res;
      this.supplier_name = res.name;
    });
    this.bill_detail = new Array();
    this.storage.get("list_prod").then(res => {
      this.bill_detail = res;
      this.getTotal();
    });
    //lấy mã đơn hàng
    this.bill_code = this.exportSoHD();
    //lấy ngày nhập hàng
    this.bill_date = new Date();
  }
  ngOnInit() {
  }
  // delete mỗi sản phẩm
  deleteItem(item) {
    let index = this.findIndex(this.bill_detail, item);
    this.bill_detail.splice(index, 1);
    this.storage.set("list_prod", this.bill_detail);
    this.taxCalculate();
  }
  // hàm tìm vị trí phần tử mảng
  findIndex(array, i) {
    let index = array.findIndex((item) => {
      return (item.name == i.name) && (item.id == i.id);
    });
    return index;
  }

  //Get Total from detail bill
  getTotal() {
    this.total = 0;
    this.num_total = 0;
    for (let item of this.bill_detail) {
      this.total += parseInt(item.price_import) * item.number;
      this.num_total += item.number;
    }
    //console.log(this.num_total, this.total);
  }

  // hàm tính thuế
  taxCalculate() {
    this.getTotal();
    this.tax = 0;
    this.tax = (this.tax_percent * this.total) / 100;
    this.total += this.tax;
  }

  back() {
    this.router.navigateByUrl('product-import-cart');
  }
  //hàm xóa hóa đơn
  deletebill() {
    console.log('Deteted');
    this.storage.remove("list_prod");
    this.storage.remove("supplier");
    this.router.navigateByUrl('product-import');
  }

  //ham tao so hoa don
  exportSoHD() {
    let date = new Date();
    const soHD =
      date
        .getFullYear()
        .toString()
        .slice(2, 4) +
      ((date.getMonth() + 1).toString().length == 1
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString()) +
      (date.getUTCDate().toString().length == 1
        ? "0" + date.getUTCDate().toString()
        : date.getUTCDate().toString()) +
      (date.getHours().toString().length == 1
        ? "0" + date.getHours().toString()
        : date.getHours().toString()) +
      (date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes().toString()
        : date.getMinutes().toString()) +
      (date.getSeconds().toString().length == 1
        ? "0" + date.getSeconds().toString()
        : date.getSeconds().toString());
    return soHD;
  }

  save() {
    //disable btn
    this.save_btn = true;
    // tạo bill mới
    this.firebaseQuery.createTask("bills", {
      id_staff: this.firebaseAuth.user.id,
      tax_value: this.tax,
      date: this.bill_date,
      bill_type: 2,
      total: this.total,
      id_supplier: this.supplier.id,
      bill_code: this.bill_code
    }).then(res => {
      //tạo detail bill
      for (let i in this.bill_detail) {
        this.firebaseQuery.createTask("bill_details", {
          name: this.bill_detail[i].name,
          id_bill: res.id,
          price: this.bill_detail[i].price_import,
          number: this.bill_detail[i].number
        }).then(res => {
          console.log(res);
        }).catch(err => {
          alert("bill_details: " + err);
        });
        if (!this.bill_detail[i].update_status) {
          //nhập kho
          this.firebaseQuery.createTask("warehouses", {
            date: this.bill_date,
            id_product: this.bill_detail[i].id,
            price: this.bill_detail[i].price_import,
            number: this.bill_detail[i].number
          }).then(res => {
            //console.log(res);
            //delete storage with condition
            if (parseInt(i) == this.bill_detail.length - 1) {
              this.storage.remove("list_prod");
              this.storage.remove("supplier");
              this.router.navigateByUrl('product-import');
            }
          }).catch(err => {
            alert("warehouses: " + err);
          });
        } else {
          //cập nhật khp
          // lấy id kho
          this.firebaseQuery.getTasks_Field("warehouses", "id_product", this.bill_detail[i].id, "==").then(res => {
            this.firebaseQuery.updateTask("warehouse", res.docs[0].id, {
              date: this.bill_date,
              id_product: this.bill_detail[i].id,
              price: this.bill_detail[i].price_import, // giá mới nếu có thay đổi
              number: this.bill_detail[i].number + res.docs[0].data().number // cập nhật lại số lượng
            }).then(res => {
              //delete storage with condition
              if (parseInt(i) == this.bill_detail.length - 1) {
                this.storage.remove("list_prod");
                this.storage.remove("supplier");
                this.router.navigateByUrl('product-import');
              }
            }).catch(err => {
              alert('update warehouse: ' + err);
            });
          });
        }
      }
    })
  }
}
