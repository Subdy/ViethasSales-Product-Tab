import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseQuery } from '../../../database/firebase.database';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-product-import-add-suppliers',
  templateUrl: './product-import-add-suppliers.page.html',
  styleUrls: ['./product-import-add-suppliers.page.scss'],
})
export class ProductImportAddSuppliersPage implements OnInit {
  addSupplier: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery,
    private navCtrl: NavController
    ) {
      this.addSupplier = this.formBuilder.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', Validators.required],
        tax_number: ['', Validators.required],
        policy: ['', Validators.required]
      });
    }

  ngOnInit() {
  }
  createSupplier() {
    this.firebaseQuery.createTask('suppliers', this.addSupplier.value)
    .then(res => {
      //console.log(res);
      this.navCtrl.pop();
    }, err => {
      console.log('Error: ', err);
    }).catch(err => {
      console.log(err);
    });
  }
}
