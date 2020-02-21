import { Component, OnInit } from '@angular/core';
import { FirebaseQuery } from './../../../database/firebase.database';
import { Router, ActivatedRoute } from "@angular/router";
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.page.html',
  styleUrls: ['./supplier-detail.page.scss'],
})
export class SupplierDetailPage implements OnInit {
  updateSupplier: FormGroup;
  item: any;
  trigger_popup: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery,
    private navCtrl: NavController,
    private router: Router,
    public toastController: ToastController,
    ) { }

  ngOnInit() {

    this.item = this.router.getCurrentNavigation().extras.state.item;

    this.updateSupplier = this.formBuilder.group({
      name: [this.item.name, Validators.required],
      phone: [this.item.phone, Validators.required],
      address: [this.item.address, Validators.required],
      email: [this.item.email, Validators.required],
      tax_number: [this.item.tax_number, Validators.required],
      policy: [this.item.policy, Validators.required]
    });
  }

  cancel(){
    this.trigger_popup=!this.trigger_popup;
    console.log("cancel clicked");
  }

  deteleSupplier(){
    this.firebaseQuery
      .deleteTask("suppliers", this.item.id)
      .then(
        res => {
          console.log("item deleted");
          this.navCtrl.pop();
        },
        err => {
          console.log(err);
        }
      )
      .catch(error => {
        console.log(error);
      });
      this.showToast("Xóa Thành công");
      this.trigger_popup =! this.trigger_popup;
  }

  triggerPopup() {
    this.trigger_popup =! this.trigger_popup;
  }

  updateItem(value) {
    delete value.id;
    this.firebaseQuery
      .updateTask('suppliers', this.item.id, value)
      .then(
        () => {
          this.showToast("Cập nhật thành công");
          this.navCtrl.pop();
        },
        err => {
          this.showToast("Cập nhật thất bại");
        }
      )
      .catch(err => {
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
