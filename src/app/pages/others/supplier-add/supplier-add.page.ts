import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseQuery } from '../../../database/firebase.database';
import { NavController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.page.html',
  styleUrls: ['./supplier-add.page.scss'],
})
export class SupplierAddPage implements OnInit {
  addSupplier: FormGroup;
  constructor( private router: Router,
    private formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery,
    public toastController: ToastController,
    private navCtrl: NavController) {
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
      this.navCtrl.pop();
    }, err => {
      console.log('Error: ', err);
    }).catch(err => {
      console.log(err);
    });
  }
  async showToast(notice) {
    const toast = await this.toastController.create({
      message: notice,
      duration: 2000
    });
    toast.present();
  }

}