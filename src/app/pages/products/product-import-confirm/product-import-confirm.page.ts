import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseQuery } from 'src/app/database/firebase.database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-import-confirm',
  templateUrl: './product-import-confirm.page.html',
  styleUrls: ['./product-import-confirm.page.scss'],
})

export class ProductImportConfirmPage implements OnInit {
  bill_code;
  supplier_id;
  bill;
  supplier_name;
  bill_detail;
  startDay = new Date();
  list_bill:Array<any>;
  num_total = 0;
  total = 0;
  constructor(
    private storage: Storage,
    private firebaseQuery: FirebaseQuery,
    private router: Router
  ) {
    //Get Data from the storage
    this.storage.get("soHD").then(res=> {
      this.bill_code = res;
    });
    this.storage.get("list_prod").then(res=> {
      this.bill_detail = res;
    });
    this.storage.get("supplier").then(res=> {
      this.supplier_id = res.id;
      this.supplier_name = res.name;
    });
    this.storage.get("bill").then(res=>{
      this.bill = res;
      this.bill.id_supplier = this.supplier_id;
    })
    this.list_bill = new Array();
    
    this.storage.get("list_prod").then(res=> {
      this.list_bill = res;
      this.getTotal();
    });
   }

  ngOnInit() {
  }
  //Get Total from detail bill
  getTotal() {
    for (let item of this.list_bill) {
      this.total += parseInt(item.price) * item.number;
      this.num_total += item.number;
    }
    console.log(this.num_total, this.total);
  }

  save(){
    let data = {...this.bill};
    data.total = this.total;
    delete data.id;
    console.log(data);
    console.log(this.bill_detail);
    console.log
    this.firebaseQuery.updateTask("bills", this.bill.id, data)
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    for (let item of this.bill_detail) {
      this.firebaseQuery.createTask("bill_details", {
        name: item.id,
        id_bill: this.bill.id,
        price: item.price,
        number: item.number
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
      
      this.firebaseQuery.createTask("warehouses", {
        date: new Date(),
        id_product: item.id,
        price: item.price_import,
        number: item.number
      }).then(res=>{
        console.log(res);
        //delete storage
        this.storage.remove("bill");
        this.storage.remove("soHD");
        this.storage.remove("list_prod");
        this.storage.remove("supplier");
        this.router.navigateByUrl('product-import');
      })
    }
  }
}
