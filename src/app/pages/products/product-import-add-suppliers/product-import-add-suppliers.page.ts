import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseQuery } from '../../../database/firebase.database';
@Component({
  selector: 'app-product-import-add-suppliers',
  templateUrl: './product-import-add-suppliers.page.html',
  styleUrls: ['./product-import-add-suppliers.page.scss'],
})
export class ProductImportAddSuppliersPage implements OnInit {
  addSupplier: FormGroup;
  supplier_status: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery
  ) {
    this.addSupplier = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [null, Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      tax_number: ['', Validators.required],
      policy: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  createSupplier() {
    this.supplier_status = true;
    //chuyển đổi phone number -> string
    let data = this.addSupplier.value;
    data.phone = this.addSupplier.value.phone.toString();
    this.firebaseQuery.createTask('suppliers', data)
      .then(res => {
        //console.log(res);
        this.router.navigateByUrl('product-import-suppliers');
      }, err => {
        console.log('Error: ', err);
      }).catch(err => {
        console.log(err);
      });
  }
}
