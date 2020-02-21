import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {FirebaseAuth, FirebaseQuery,  FirebaseStorage, FirebaseImage  } from '../../../database/firebase.database'
import { Router, ActivatedRoute } from "@angular/router";

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.page.html',
  styleUrls: ['./staff-detail.page.scss'],
})
export class StaffDetailPage implements OnInit {

  public isSeeReport: boolean;
  public isChangeReport: boolean;
  public isIncome: boolean;
  public isChangeIcome: boolean;
  public isEnter: boolean;
  item: any;
  edit_item_form: FormGroup;
  collection: string
  public modalName: string = "hhhhhhh";
  successMessage = "erroooooo";
  public date: any;
  variable: string = "Name";
  img: any;

  validations_form: FormGroup;
  errorMessage: string = "";

  validation_messages = {
    name: [
      { type: "required", message: "Name is required." },
      {
        type: "minlength",
        message: "Name must be at least 5 characters long."
      }
    ],
    id_staff: [
      { type: "required", message: "code is required." },
      {
        type: "minlength",
        message: "code must be at least 5 characters long."
      }
    ],
    email: [
      { type: "required", message: "address is required." },
      {
        type: "minlength",
        message: "address must be at least 5 characters long."
      }
    ],
    password: [
      { type: "required", message: "number phone is required." },
      {
        type: "minlength",
        message: "number phone must be at least 5 characters long."
      }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private loadingCtrl: LoadingController,
    private toastCtrl:ToastController,
    private webview: WebView,
    private firebaseAuth:FirebaseAuth,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseQuery: FirebaseQuery,
    public navCtr: NavController,
    private firebaseImage: FirebaseImage
  ) {
    this.isSeeReport= false;
    this.isChangeReport= false;
    this.isIncome= false;
    this.isChangeIcome= false;
    this.isEnter= false;
    this.img='';
    this.collection = "employees";
    this.date = new Date().toISOString();
  }


  ngOnInit() {
    this.item = this.router.getCurrentNavigation().extras.state.item;
    this.edit_item_form = this.formBuilder.group({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description, Validators.required)
    });
    console.log(this.item);

    this.isSeeReport = this.item.isSeeReport;
    this.isChangeReport = this.item.isChangeReport;
    this.isIncome = this.item.isIncome;
    this.isChangeIcome = this.item.isChangeIcome;
    this.isEnter = this.item.isEnter;

    this.validations_form = this.formBuilder.group({
    
      name: new FormControl(
        this.item.name,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      id_staff: new FormControl(
        this.item.code_staff,
        Validators.compose([
          Validators.compose([Validators.minLength(5), Validators.required])
        ])
      ),
      email: new FormControl(
        this.item.email,
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
      password: new FormControl(
        this.item.password,
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
      address: new FormControl(
        this.item.address,
        
      ),
      revenue: new FormControl(
        this.item.revenue,
       
      ),
      phone: new FormControl(
        this.item.phone,
        Validators.compose([Validators.minLength(9), Validators.required])
      ),
      date: new FormControl(
        this.item.date,
        Validators.compose([Validators.minLength(9), Validators.required])
      ),
    });
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){        
        this.imagePicker.requestReadPermission();
        console.log("1111111111111111");
      }
      else if(result == true){
        console.log("2222222222222222222222")
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
      this.img = photoURL;
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }


createEmployee(value){
  console.log(value);
 
}
  

changeSeeRepor(){
    this.isSeeReport = !this.isSeeReport;
    console.log(this.isSeeReport);
  }
changeChangeReport(){
  this.isChangeReport = !this.isChangeReport;
  console.log(this.isChangeReport);
}
changeIncome(){
  this.isIncome = !this.isIncome;
  console.log(this.isIncome);
}
changeChangeIcome(){
  this.isChangeIcome = !this.isChangeIcome;
  console.log(this.isChangeIcome);
}
changeEnter(){
  this.isEnter = !this.isEnter;
  console.log(this.isEnter);
}

updateMyDate($event) {
  console.log($event); // --> wil contains $event.day.value, $event.month.value and $event.year.value
  this.date = $event;
}

  updateStaff(value){
    
    let data = {
      name: value.name,
      phone: value.phone,
      email: value.email,
      password: value.password,
      id_staff: value.id_staff,
      address: value.address,
      revenue: value.revenue,
      isSeeReport: this.isSeeReport,
      isChangeReport: this.isChangeReport,
      isIncome: this.isIncome,
      isChangeIcome: this.isChangeIcome,
      isEnter: this.isEnter,
      date: this.date,
      img: this.img
    };
    console.log(data);
    this.firebaseQuery.updateTask(this.collection, this.item.id, data)
    .then(res => {
      console.log("success", res);
      this.navCtr.pop();
    }, err => {
      console.log("erroooo", err);
      this.errorMessage = err.message;
      this.successMessage = "";
    }).catch(error=>{
      console.log(error)
    })
    // let data = {...item};
    // data.new = val;
    // delete data.id;
    // this.firebaseQuery.updateTask(collection, id, data)
    // .then(res=>{
    //   ----------------
    // },
    // err=>{
    //   ----------------
    // })
    // .catch(error=>{
    //   ----------------
    // })
    
  }
}
