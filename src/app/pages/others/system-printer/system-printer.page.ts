import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController,AlertController  } from '@ionic/angular';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";
import { FirebaseQuery } from "./../../../database/firebase.database";

@Component({
  selector: "app-system-printer",
  templateUrl: "./system-printer.page.html",
  styleUrls: ["./system-printer.page.scss"]
})
export class SystemPrinterPage implements OnInit {
  printer_form: FormGroup;
  items: Array<any>;
  trigger_popup: boolean = false;
  id: any;
  isUpdate: boolean = false;

  validations_form: FormGroup;
  errorMessage: string = "";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.printer_form = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      ip: new FormControl("", Validators.required)
    });
    this.getData();
  }

   checkIp(value){
    this.firebaseQuery.getTasks_Field("printer_settings", "ip", value.ip ,"==")
    .then(res=>{
      if(res.empty==true){
        this.createPrinter(value);
      }
      else{
        this.showToast("trùng ip");
      }
    },
    err => {
      console.log(err);
    }
    )
    .catch(err => {
    console.log(err);
    });
  }

  createPrinter(value) {
    this.printer_form.reset();
    console.log(value);
    this.firebaseQuery
      .createTask("printer_settings", value)
      .then(
        res => {
          this.showToast("thêm thành công");
          this.getData();
        },
        err => {
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      });
  }
  getData() {
    this.items = new Array();
    this.firebaseQuery
      .getTasks("printer_settings")
      .then(
        res => {
          for (let i in res.docs) {
            this.items.push(res.docs[i].data());
            this.items[this.items.length - 1].id = res.docs[i].id;
          }
        },
        err => {
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      });
    console.log(this.items);
  }


  deleteItem() {
    this.printer_form.reset();
    this.isUpdate = false;
    this.firebaseQuery
      .deleteTask("printer_settings", this.id)
      .then(
        res => {
          console.log("item deleted");
          this.getData();
        },
        err => {
          console.log(err);
        }
      )
      .catch(error => {
        console.log(error);
      });
      this.trigger_popup=!this.trigger_popup;
  }

  //select item need update
  selectItem(id, value) {
    this.printer_form = this.formBuilder.group({
      name: new FormControl(value.name, Validators.required),
      ip: new FormControl(value.ip, Validators.required)
    });
    this.id = id;
    this.isUpdate = true;
  }

  //update item selected
  updateItem(value) {
    this.printer_form.reset();
    this.firebaseQuery
      .updateTask("printer_settings", this.id, value)
      .then(
        res => {
          this.showToast("cập nhật thành công");
          this.getData();
        },
        err => {
          console.log(err);
        }
      )
      .catch(error => {
        console.log(error);
      });
    this.isUpdate = false;
  }

  async showToast(notice) {
    const toast = await this.toastController.create({
      message: notice,
      duration: 2000
    });
    toast.present();
  }


  triggerPopup(){
    this.trigger_popup=!this.trigger_popup;
  }

  cancel(){
    this.trigger_popup=!this.trigger_popup;
    console.log("cancel clicked");
  }

}
